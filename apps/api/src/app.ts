import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import CONFIG from './config';
import { AuthRouter } from './routers/auth.router';
import { BookingRouter } from './routers/booking.router';
import { RoomRouter } from './routers/room.router';
import { PaymentRouter } from './routers/payment.router';
// import passport from 'passport';
// import session from 'express-session';
// import { configurePassport } from './lib/config/passport.config';
import { PropertyRouter } from './routers/property.router';
import { ResponseError } from './error/response.error';
import { FacilityRouter } from './routers/facility.router';
import { UploadRouter } from './routers/upload.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));

    // this.app.use(
    //   session({
    //     secret: 'your-session-secret', // sebaiknya pindah ke .env juga
    //     resave: false,
    //     saveUninitialized: false,
    //   }),
    // );

    // this.app.use(passport.initialize());
    // this.app.use(passport.session());

    // configurePassport();
  }

  private handleError(): void {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);

          if (err instanceof ResponseError) {
            return res.status(err.status).json({
              status: 'error',
              message: err.message,
            });
          }

          return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
          });
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const authRouter = new AuthRouter();
    const propertyRouter = new PropertyRouter();
    const facilityRouter = new FacilityRouter();
    const uploadRouter = new UploadRouter();
    const paymentRouter = new PaymentRouter();
    const bookingRouter = new BookingRouter();
    const roomRouter = new RoomRouter();

    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/properties', propertyRouter.getRouter());
    this.app.use('/api/facilities', facilityRouter.getRouter());
    this.app.use('/api/uploads', uploadRouter.getRouter());
    this.app.use('/api', bookingRouter.getRouter());
    this.app.use('/api', roomRouter.getRouter());
    this.app.use('/api', paymentRouter.getRouter());
  }

  public start(): void {
    this.app.listen(CONFIG.PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${CONFIG.PORT}/`);
    });
  }
}
