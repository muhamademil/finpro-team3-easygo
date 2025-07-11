import { NowRequest, NowResponse } from '@vercel/node';
import { createServer } from 'http';
import { parse } from 'url';
import App from '../src/app';

const appInstance = new App();
const expressApp = appInstance.expressApp;

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    console.log('[DEBUG] Handler is invoked.');
    
    const parsedUrl = parse(req.url ?? '/', true);
    req.url = parsedUrl.path || '/';

    const server = createServer((req2, res2) => {
      expressApp(req2, res2);
    });

    server.emit('request', req, res);
  } catch (err) {
    console.error('❌ [ERROR in handler]', err);
    res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
}
