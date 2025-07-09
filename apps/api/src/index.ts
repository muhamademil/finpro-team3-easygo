import dotenv from 'dotenv';
dotenv.config();

import App from './app';
// const app = new App();
// app.start();
const appInstance = new App();

export default appInstance.expressApp;