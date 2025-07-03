import { Validation } from '@/validation/validation';
import { UserValidation } from '@/validation/user-validation';
import { sendMail } from '@/lib/mail';
import { prisma, PrismaTx } from '@/lib/prisma';
import { RegistrationEmail } from '@/lib/utils/templates/RegistrationEmail';
import { ForgotPasswordEmail } from '@/lib/utils/templates/ForgotPasswordEmail';
import {
  CompleteRegistrationInput,
  InitiateRegistrationInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from '@/models/user.model';
import { ResponseError } from '@/error/response.error';
import {
  comparePassword,
  hashPassword,
} from '@/lib/utils/helper/password-hash.helper';

import jwt from 'jsonwebtoken';
import CONFIG from '@/config';
import crypto from 'crypto';
import React from 'react';

export class AuthService {
  // Fungsi ini menerima data, bukan req/res
  public async initiateRegistration(request: InitiateRegistrationInput) {
    // 1. Validasi input menggunakan Zod (langkah selanjutnya).
    const InitiateRegisterRequest = Validation.validate(
      UserValidation.REGISTER,
      request,
    );

    // 2. Cek apakah email sudah ada di database menggunakan Prisma.
    const existingUser = await prisma.user.findUnique({
      where: { email: InitiateRegisterRequest.email },
    });

    if (existingUser) {
      if (existingUser.is_verified) {
        // 2a. Jika sudah terverifikasi, lempar error 409
        throw new ResponseError(409, 'Email sudah terdaftar dan terverifikasi');
      } else {
        // 2b. Jika belum terverifikasi, hapus user & token lama
        await prisma.$transaction(async (tx: PrismaTx) => {
          await tx.registrationToken.deleteMany({
            where: { user_id: existingUser.id },
          });
          await tx.user.delete({
            where: { id: existingUser.id },
          });
        });
      }
    }
    const newUser = await prisma.user.create({
      data: {
        email: InitiateRegisterRequest.email,
        role: InitiateRegisterRequest.role,
        is_verified: false,
      },
    });

    // 3. Buat token unik.
    const token = crypto.randomBytes(32).toString('hex');

    // 4. Simpan token, email, dan role ke tabel `RegistrationToken`.
    await prisma.registrationToken.create({
      data: {
        user_id: newUser.id,
        token: token,
        expires_at: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    // 5. Kirim email ke pengguna (menggunakan library seperti Nodemailer).
    const completeLink = `${CONFIG.FRONTEND_URL}/register/complete/${InitiateRegisterRequest.role.toLowerCase()}?token=${token}`;

    await sendMail(
      InitiateRegisterRequest.email,
      'Selesaikan Pendaftaran Easygo Anda',
      React.createElement(RegistrationEmail, { completeUrl: completeLink }),
    );

    const payload = {
      id: newUser.id,
      role: newUser.role,
      is_verified: newUser.is_verified, // Sertakan status verifikasi
    };
    const tokenJwt = jwt.sign(payload, CONFIG.JWT_SECRET, { expiresIn: '1d' });

    // 6. Kembalikan sebuah nilai jika perlu, atau cukup selesaikan tanpa error.
    return {
      message: `Proses untuk ${InitiateRegisterRequest.email} sebagai ${InitiateRegisterRequest.role} telah dimulai.`,
      token: tokenJwt,
    };
  }

  public async completeRegistration(request: CompleteRegistrationInput) {
    const completeRegisterRequest = Validation.validate(
      UserValidation.COMPLETE_REGISTER,
      request,
    );

    const tokenData = await prisma.registrationToken.findUnique({
      where: { token: completeRegisterRequest.token },
      include: {
        user: true, // Ini akan membuat tokenData.user tersedia
      },
    });
    if (!tokenData || !tokenData.user) {
      // Pastikan token dan user ada
      throw new ResponseError(
        400,
        'Token registrasi tidak valid atau tidak ditemukan.',
      );
    }
    if (tokenData.expires_at < new Date()) {
      await prisma.registrationToken.delete({ where: { id: tokenData.id } });
      throw new ResponseError(
        400,
        'Token registrasi kamu sudah kedaluwarsa. Silakan daftar ulang.',
      );
    }

    if (tokenData.user.role === 'TENANT') {
      if (
        !completeRegisterRequest.city ||
        !completeRegisterRequest.bank_account ||
        !completeRegisterRequest.bank_account_name
      ) {
        throw new ResponseError(
          400,
          'Kota dan detail rekening wajib diisi sebagai tenant.',
        );
      }
    }

    const hashedPassword = await hashPassword(completeRegisterRequest.password);

    const user = await prisma.$transaction(async (tx: PrismaTx) => {
      // 1. Buat user baru
      const updatedUser = await tx.user.update({
        where: { id: tokenData.user_id },
        data: {
          name: completeRegisterRequest.name,
          password: hashedPassword,
          phone: completeRegisterRequest.phone,
          photo_url: completeRegisterRequest.photo_url,
          is_verified: true,
        },
      });

      // 2. Buat profile tenant HANYA jika rolenya TENANT
      if (tokenData.user.role === 'TENANT') {
        await tx.tenant.create({
          data: {
            user_id: updatedUser.id,
            city: completeRegisterRequest.city!,
            bank_account: completeRegisterRequest.bank_account!,
            bank_account_name: 'Nama Bank Anda', // Anda perlu menambahkan ini di form
          },
        });
      }

      // 3. Hapus token setelah pendaftaran berhasil
      await tx.registrationToken.delete({
        where: {
          token: completeRegisterRequest.token,
        },
      });
      return updatedUser;
    });
    return user;
  }

  public async login(request: LoginInput) {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    const user = await prisma.user.findUnique({
      where: { email: loginRequest.email },
    });

    const isPasswordMatch = user
      ? await comparePassword(loginRequest.password, user.password!)
      : false;

    if (!user || !isPasswordMatch) {
      throw new ResponseError(401, 'Email atau Password Salah');
    }
    if (!user.is_verified) {
      throw new ResponseError(
        403,
        'Akun Anda belum diverifikasi. Silahkan cek email Anda untuk melengkapi pendaftaran',
      );
    }

    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
      is_verified: user.is_verified,
    };

    const secret = CONFIG.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });
    const { password: _, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword,
    };
  }

  public async forgotPassword(request: ForgotPasswordInput) {
    const forgotPasswordRequest = Validation.validate(
      UserValidation.FORGOT_PASSWORD,
      request,
    );

    const user = await prisma.user.findUnique({
      where: { email: forgotPasswordRequest.email },
    });

    if (user && user.password) {
      const token = crypto.randomBytes(32).toString('hex');

      await prisma.passwordResetToken.create({
        data: {
          user_id: user.id,
          token: token,
          expires_at: new Date(Date.now() + 15 * 60 * 1000),
        },
      });

      const completeLink = `${CONFIG.FRONTEND_URL}/reset-password?token=${token}`;

      await sendMail(
        forgotPasswordRequest.email,
        'Permintaan Reset Password Easygo!',
        React.createElement(ForgotPasswordEmail, { completeUrl: completeLink }),
      );
    }
    return {
      message: `Jika email Anda terdaftar dan valid, link reset password telah dikirimkan.`,
    };
  }

  public async resetPassword(request: ResetPasswordInput) {
    const resetPasswordRequest = Validation.validate(
      UserValidation.RESET_PASSWORD,
      request,
    );

    const tokenData = await prisma.passwordResetToken.findUnique({
      where: { token: resetPasswordRequest.token },
    });

    if (!tokenData || tokenData.expires_at < new Date()) {
      throw new ResponseError(400, 'Token tidak valid atau sudah kedaluwarsa.');
    }

    const hashedPassword = await hashPassword(resetPasswordRequest.newPassword);

    await prisma.$transaction(async (tx: PrismaTx) => {
      await tx.user.update({
        where: { id: tokenData.user_id },
        data: {
          password: hashedPassword,
        },
      });

      await tx.passwordResetToken.delete({
        where: {
          id: tokenData.id,
        },
      });
    });
    return;
  }
}
