export interface InitiateRegistrationInput {
  email: string;
  role: 'TRAVELLER' | 'TENANT';
}

export interface CompleteRegistrationInput {
  token: string;
  name: string;
  password: string;
  phone: string;
  photo_url?: string | null;
  city?: string;
  bank_account?: string;
  bank_account_name?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
}
