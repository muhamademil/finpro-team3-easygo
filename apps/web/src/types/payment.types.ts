export interface CreateManualPaymentInput {
  booking_id: string;
  amount: number;
  payment_proof_url?: string;
}

