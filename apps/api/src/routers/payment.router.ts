import { Router } from "express";
import { PaymentController } from "@/controllers/payment.controller";

const router = Router();
const controller = new PaymentController();

router.post('/payment/snap', controller.createSnapTransaction);
router.post('/payment/core', controller.chargeWithCore);

export default router;  