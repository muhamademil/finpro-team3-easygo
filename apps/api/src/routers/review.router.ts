// src/routers/review.router.ts
import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { tenantMiddleware } from '../middleware/tenant.middleware';

export class ReviewRouter {
  private router = Router();
  private controller = new ReviewController();

  constructor() {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.post(
      '/reviews',
      authMiddleware,
      this.controller.createReview.bind(this.controller),
    );
    this.router.get(
      '/reviews/booking/:bookingId',
      authMiddleware,
      this.controller.getReviewByBookingId.bind(this.controller),
    );
    this.router.get(
      '/reviews/property/:propertyId',
      authMiddleware,
      this.controller.getReviewsByPropertyId.bind(this.controller),
    );
    this.router.delete(
      '/reviews/:id',
      authMiddleware,
      tenantMiddleware,
      this.controller.deleteReviews.bind(this.controller),
    );
    // this.router.put('/reviews/:reviewId/reply', this.controller.replyToReview.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
