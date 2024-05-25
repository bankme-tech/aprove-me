import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '756ca2187bff5e',
    pass: '81b02c64a91084',
  },
});

export const SendEmailProvider = {
  provide: 'SEND_EMAIL_PROVIDER',
  useValue: transporter,
};
