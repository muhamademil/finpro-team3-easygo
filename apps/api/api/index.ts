import { register } from 'tsconfig-paths';
import { join } from 'path';
import { VercelRequest, VercelResponse } from '@vercel/node';
import App from '../src/app';

// Manual config path
const tsconfigPath = join(__dirname, '../tsconfig.json');
register({
  baseUrl: join(__dirname, '../'), // pointing to apps/api
  paths: {
    "@/*": ["src/*"]
  }
});

const expressApp = new App().expressApp;

export default function handler(req: VercelRequest, res: VercelResponse) {
  return expressApp(req, res);
}
