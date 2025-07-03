import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';

export class ReviewController {
  private reviewService = new ReviewService();

  public createReview = async (req: Request, res: Response) => {
    try {
      const newReview = await this.reviewService.createReview(req.body);
      res.status(201).json(newReview);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create review', error: err });
    }
  };

  public getReviewByBookingId = async (req: Request, res: Response) => {
    try {
      const review = await this.reviewService.getReviewByBookingId(req.params.booking_id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
      res.json(review);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch review', error: err });
    }
  };

  public getReviewsByPropertyId = async (req: Request, res: Response) => {
    try {
      const reviews = await this.reviewService.getReviewsByPropertyId(req.params.property_id);
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch reviews', error: err });
    }
  };

  public replyToReview = async (req: Request, res: Response) => {
    try {
      const { review_id } = req.params;
      const { tenant_reply } = req.body;

      const updated = await this.reviewService.replyToReview(review_id, tenant_reply);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Failed to reply to review', error: err });
    }
  };
}
