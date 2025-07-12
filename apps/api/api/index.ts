import { VercelRequest, VercelResponse } from '@vercel/node';
// import { createServer } from 'http';
// import { parse } from 'url';
import App from '../src/app';

// const appInstance = new App();
// const expressApp = appInstance.expressApp;

// Vercel serverless handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('[DEBUG] Handler invoked');
    console.log('[DEBUG] Handler invoked', req.method, req.url);


    // const parsedUrl = parse(req.url ?? '/', true);
    // req.url = parsedUrl.path || '/';

    // const server = createServer((req2, res2) => {
    //   expressApp(req2, res2);
    // });

    // server.emit('request', req, res);
  } catch (err: unknown) {
    console.error('❌ [Handler Error]', err);
    console.error('[ERROR]', typeof err, err instanceof Error, err);


    let message = 'Internal Server Error';
    if (err instanceof Error) message = err.message;

    res.status(500).json({
      success: false,
      message,
    });
  }
}
