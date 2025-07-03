import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ReviewService {
  public async createReview(data: {
    booking_id: string;
    user_id: string;
    property_id: string;
    rating: number;
    comment: string;
  }) {
    return await prisma.review.create({
      data,
    });
  }

  public async getReviewByBookingId(booking_id: string) {
    return await prisma.review.findUnique({
      where: { booking_id },
    });
  }

  public async getReviewsByPropertyId(property_id: string) {
    return await prisma.review.findMany({
      where: { property_id },
      orderBy: { created_at: 'desc' },
    });
  }

  public async replyToReview(review_id: string, tenant_reply: string) {
    return await prisma.review.update({
      where: { id: review_id },
      data: { tenant_reply },
    });
  }
}
