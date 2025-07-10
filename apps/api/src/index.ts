import dotenv from 'dotenv';
dotenv.config();

import App from './app';
// const app = new App();
// app.start();
const appInstance = new App();
appInstance.start();

export default appInstance.expressApp;