import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

interface SessionPayload {
  id: string;
  name: string | null;
  role: 'TRAVELLER' | 'TENANT';
  is_verified: boolean;
}

export const getClientSession = (): SessionPayload | null => {
  if (typeof window === 'undefined') return null;

  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('auth-token='))
    ?.split('=')[1];

  if (!token) return null;

  try {
    const decoded = jwt.decode(token) as SessionPayload;
    return decoded;
  } catch (error) {
    console.error('Client session decode error:', error);
    return null;
  }
};
