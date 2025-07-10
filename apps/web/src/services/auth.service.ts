import api from '../lib/axios';
import {
  CompleteRegistrationInput,
  ForgotPasswordInput,
  LoginInput,
  ResetPasswordInput,
} from '../models/user.model';

export const initiateRegistrationAPI = (data: {
  email: string;
  role: 'TRAVELLER' | 'TENANT';
}) => {
  return api.post('/auth/register/initiate', data);
};

export const completeRegistrationAPI = (data: CompleteRegistrationInput) => {
  return api.post('auth/register/complete', data);
};

export const loginAPI = (credentials: LoginInput) => {
  return api.post('/auth/login', credentials);
};

export const forgotPasswordAPI = (data: ForgotPasswordInput) => {
  return api.post('/auth/forgot-password', data);
};

export const resetPasswordAPI = (data: ResetPasswordInput) => {
  return api.post('/auth/reset-password', data);
};

export const googleLoginAPI = (accessToken: string) => {
  return api.post('/auth/google/login', { accessToken });
};
