import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PORT } from './config';
import { PropertyRouter } from './routers/property.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.setMiddleware();
    this.setRoutes();
    this.setErrorHandlers();
  }

  private setMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setRoutes(): void {
    // Root check
    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    // Feature routes
    const propertyRouter = new PropertyRouter();
    this.app.use('/api/properties', propertyRouter.getRouter());
  }

  private setErrorHandlers(): void {
    // 404 Not Found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'Route not found' });
      }
      next();
    });

    // General Error Handler
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (req.path.startsWith('/api')) {
        console.error('Server Error:', err.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      next();
    });
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Server ready at: http://localhost:${PORT}/api`);
    });
  }
}