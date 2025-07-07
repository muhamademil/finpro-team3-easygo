import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';

export class ReviewController {
  private service = new ReviewService();

  public createReview = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id; // jika sudah ada middleware auth
      // const userId = req.body.userId; // Atau ambil dari token JWT
      const { bookingId, propertyId, rating, comment } = req.body;

      if (!userId || !bookingId || !propertyId || !rating || !comment) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const review = await this.service.createReview({
        bookingId,
        userId,
        propertyId,
        rating,
        comment,
      });

      res.status(201).json({ message: 'Review created', data: review });
    } catch (err) {
      res.status(500).json({ message: 'Failed to create review', error: err });
    }
  };

  public getReviewByBookingId = async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.params;
      const review = await this.service.getReviewByBookingId(bookingId);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.json(review);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Failed to get review by booking id', error: err });
    }
  };

  public getReviewsByPropertyId = async (req: Request, res: Response) => {
    try {
      const { propertyId } = req.params;
      const reviews = await this.service.getReviewsByPropertyId(propertyId);
      res.json(reviews);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Failed to get review by property id', error: err });
    }
  };

  public async deleteReviews(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.service.deleteReviews(id);

      res.json({ message: 'Review deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete review', error: err });
    }
  }
}
