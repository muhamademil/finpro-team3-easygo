import { render } from '@react-email/render';
import { transporter } from './config/nodemailer.config';
import { ReactElement } from 'react';

// Jadikan lebih generik
export async function sendMail(
  to: string,
  subject: string,
  body: ReactElement,
) {
  const html = await render(body); // Render komponen yang diterima

  await transporter.sendMail({
    from: '"Easygo" <noreply@easygo.com>',
    to,
    subject,
    html,
  });
}
