import midtransClient from 'midtrans-client';

const snap = new midtransClient.Snap({
  isProduction: false, // Ubah ke true saat production
  serverKey: process.env.MIDTRANS_SERVER_KEY as string,
  clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
});

export default snap;
