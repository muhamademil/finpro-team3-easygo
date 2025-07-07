import { prisma } from '@/prisma/client';
import { Review } from '@prisma/client';
import { CreateReviewInput } from '@/types/riview.type';

export class ReviewService {
  public async createReview(data: CreateReviewInput): Promise<Review> {
    const booking = await prisma.booking.findUnique({
      where: { id: data.bookingId },
    });

    if (!booking) throw new Error('Booking not found');
    if (booking.user_id !== data.userId) throw new Error('Unauthorized');
    if (booking.status !== 'COMPLETED')
      throw new Error('Booking not completed');
    const existingReview = await prisma.review.findUnique({
      where: { booking_id: data.bookingId },
    });
    if (existingReview) throw new Error('Review already exists');

    return prisma.review.create({
      data: {
        booking_id: data.bookingId,
        user_id: data.userId,
        property_id: data.propertyId,
        rating: data.rating,
        comment: data.comment,
      },
    });
  }

  public async getReviewByBookingId(bookingId: string) {
    return prisma.review.findUnique({
      where: { booking_id: bookingId },
    });
  }

  public async getReviewsByPropertyId(propertyId: string) {
    return prisma.review.findMany({
      where: { property_id: propertyId },
      include: {
        user: {
          select: {
            name: true,
            photo_url: true,
          },
        },
      },
    });
  }

  public async deleteReviews(id: string) {
    return await prisma.review.delete({ where: { id } });
  }
}
