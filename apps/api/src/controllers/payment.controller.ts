import { Request,Response } from "express";
import { MidtransService } from "@/services/midtrans.service";


export class PaymentController {
    private service: MidtransService;

    constructor() {
        this.service = new MidtransService();
    }

    createSnapTransaction = async (req: Request, res: Response): Promise<void> => {
        try {
            const redirectUrl = await this.service.createSnapTransaction(req.body);
            res.status(201).json({ redirectUrl });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message, detail: error });
        }

        
    };

    chargeWithCore = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.service.chargeWithCore(req.body);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    };
}