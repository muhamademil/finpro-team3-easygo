import { VercelRequest, VercelResponse } from '@vercel/node';
import App from '../src/app';

const expressApp = new App().expressApp;

export default function handler(req: VercelRequest, res: VercelResponse) {
  return expressApp(req, res);
}
