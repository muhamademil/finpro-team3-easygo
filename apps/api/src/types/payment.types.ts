export interface CreatePaymentInput {
  booking_id: string;
  amount: number;
  payment_proof_url?: string;
  paid_at: Date;
}