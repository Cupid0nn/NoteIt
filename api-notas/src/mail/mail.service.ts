import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendNote(to: string, subject: string, content: string) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      text: content,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
