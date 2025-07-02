import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CONFIG from '@/config';
import { ResponseError } from '@/error/response.error';

// Definisi untuk payload yang kita simpan di JWT
interface TokenPayload {
  id: string;
  role: string;
  is_verified: boolean;
}

// Menambahkan properti 'user' ke tipe Request dari Express
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const tenantMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ResponseError(401, 'Unauthorized: Token tidak tersedia'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as TokenPayload;
    req.user = decoded; // Tempelkan data user ke request
    next(); // Lanjutkan ke middleware atau controller berikutnya
  } catch (error) {
    return next(
      new ResponseError(
        401,
        'Unauthorized: Token tidak valid atau kedaluwarsa',
      ),
    );
  }
};
