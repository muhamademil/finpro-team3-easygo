// import { NowRequest, NowResponse } from '@vercel/node';
// import { createServer } from 'http';
// import { parse } from 'url';
// import App from '../src/app';

// const appInstance = new App();
// const expressApp = appInstance.expressApp;

// export default function handler(req: NowRequest, res: NowResponse) {
//   const parsedUrl = parse(req.url ?? '/', true);
//   req.url = parsedUrl.path || '/'

//   const server = createServer((req2, res2) => {
//     expressApp(req2, res2);
//   });

//   server.emit('request', req, res);
// }
import 'module-alias/register';
import app from './index';
// require('module-alias/register');

export default app;
