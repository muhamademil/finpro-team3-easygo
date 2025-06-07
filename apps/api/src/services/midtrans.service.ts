import axios from 'axios';
import dotenv from 'dotenv';
import { SnapRequest } from '@/types/midtrans';

dotenv.config();

dotenv.config();

export class MidtransService {
  private readonly serverKey: string;
  private readonly baseSnap: string;
  private readonly baseCore: string;

  constructor() {
    this.serverKey = process.env.MIDTRANS_SERVER_KEY as string;
    this.baseSnap = process.env.MIDTRANS_SNAP_DEVELOPMENT as string;
    this.baseCore = process.env.MIDTRANS_CORE_DEVELOPMENT as string;
  }

  private getAuthHeader(): string {
    const encoded = Buffer.from(`${this.serverKey}:`).toString('base64');
    return `Basic ${encoded}`;
  }

  async createSnapTransaction(payload: SnapRequest): Promise<string> {
    const response = await axios.post(`${this.baseSnap}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader(),
      },
    });

    return response.data.redirect_url;
  }

  async chargeWithCore(payload: object): Promise<object> {
    const response = await axios.post(`${this.baseCore}/charge`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader(),
      },
    });

    return response.data;
  }
}
