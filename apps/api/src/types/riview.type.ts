export interface CreateReviewInput {
  bookingId: string;
  userId: string;
  propertyId: string;
  rating: number;
  comment: string;
}