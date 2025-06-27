// import express, {
//   json,
//   urlencoded,
//   Express,
//   Request,
//   Response,
//   NextFunction,
//   Router,
// } from 'express';
// import cors from 'cors';
// import CONFIG from './config';
// import { AuthRouter } from './routers/auth.router';
// import passport from 'passport';
// import session from 'express-session';
// import { PropertyRouter } from './routers/property.router';
// // import { configurePassport } from './lib/config/passport.config';

// export default class App {
//   private app: Express;

//   constructor() {
//     this.app = express();
//     this.configure();
//     this.routes();
//     this.handleError();
//   }

//   private configure(): void {
//     this.app.use(cors());
//     this.app.use(json());
//     this.app.use(urlencoded({ extended: true }));

//     // this.app.use(
//     //   session({
//     //     secret: 'your-session-secret', // sebaiknya pindah ke .env juga
//     //     resave: false,
//     //     saveUninitialized: false,
//     //   }),
//     // );

//     // this.app.use(passport.initialize());
//     // this.app.use(passport.session());

//     // configurePassport();
//   }

//   private handleError(): void {
//     // not found
//     this.app.use((req: Request, res: Response, next: NextFunction) => {
//       if (req.path.includes('/api/')) {
//         res.status(404).send('Not found !');
//       } else {
//         next();
//       }
//     });

//     // error
//     this.app.use(
//       (err: Error, req: Request, res: Response, next: NextFunction) => {
//         if (req.path.includes('/api/')) {
//           console.error('Error : ', err.stack);
//           res.status(500).send('Error !');
//         } else {
//           next();
//         }
//       },
//     );
//   }

//   private routes(): void {
//     const authRouter = new AuthRouter();
//     const propertyRouter = new PropertyRouter();

//     this.app.use('/api/auth', authRouter.getRouter());
//     this.app.use('/api/properties', propertyRouter.getRouter());
//     this.app.use('/api/uploads', uploadRouter.getRouter());
//   }

//   public start(): void {
//     this.app.listen(CONFIG.PORT, () => {
//       console.log(`  ➜  [API] Local:   http://localhost:${CONFIG.PORT}/`);
//     });
//   }
// }
