// export interface TransactionDetails {
//     order_id: string;
//     gross_amount: number;
// }

// export interface CustomerDetails {
//     first_name: string;
//     email: string;
//     phone: string;
// }

// export interface ItemDetails {
//     id: string;
//     price: number;
//     quantity: number;
//     name: string;
// }

// export interface SnapRequest {
//     transaction_details: TransactionDetails;
//     customer_details?: CustomerDetails;
//     item_details?: ItemDetails[];
// }

export interface MidtransCallback {
    order_id: string;
    status_code: string;
    gross_amount: string;
    signature_key: string;
}

export interface CoreChargeRequest {
  payment_type: string;
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details?: {
    first_name: string;
    email: string;
  };
  bank_transfer?: {
    bank: 'bca' | 'bni' | 'bri' | 'permata';
    va_number?: string;
  };
  gopay?: object;
  qris?: object;
}