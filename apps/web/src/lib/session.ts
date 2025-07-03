'use server';
import 'server-only';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

interface SessionPayload {
  id: string;
  name: string | null;
  role: 'TRAVELLER' | 'TENANT';
  is_verified: boolean;
}

export const getServerSideSession =
  async (): Promise<SessionPayload | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return null;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET!) as SessionPayload;
      return decoded;
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };
