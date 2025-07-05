// src/routers/review.router.ts
import { Router } from 'express';
import { ReviewController } from '@/controllers/review.controller';

export class ReviewRouter {
  private router = Router();
  private controller = new ReviewController();

  constructor() {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.post('/reviews', this.controller.createReview.bind(this.controller));
    this.router.get('/reviews/booking/:bookingId', this.controller.getReviewByBookingId.bind(this.controller));
    this.router.get('/reviews/property/:propertyId', this.controller.getReviewsByPropertyId.bind(this.controller));
    // this.router.put('/reviews/:reviewId/reply', this.controller.replyToReview.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
