import { VercelRequest, VercelResponse } from '@vercel/node';
import App from './app';

const app = new App();
const server = app.expressApp;

export default function handler(req: VercelRequest, res: VercelResponse) {
  return server(req, res);
}

// import 'module-alias/register';
// import App from './app';

// const app = new App();
// export default app.expressApp;
