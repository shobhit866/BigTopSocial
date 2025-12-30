import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// ensure this route runs in the Node runtime (nodemailer requires Node)
export const runtime = 'nodejs';

// Email validation
const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export async function POST(request: Request) {
  try {
    let body: any;
    try {
      body = await request.json();
    } catch (parseErr) {
      console.error('Invalid JSON body:', parseErr);
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    const { name, email, company, interest, message } = body;

    // Validate required fields
    if (!name || !email || !interest || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate environment configuration for sending email
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!EMAIL_USER || !EMAIL_PASSWORD || !ADMIN_EMAIL) {
      console.error('Email not configured:', { EMAIL_USER: !!EMAIL_USER, ADMIN_EMAIL: !!ADMIN_EMAIL });
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // Create transporter inside the handler to avoid runtime bundling issues
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
    });

    // Email to admin
    await transporter.sendMail({
      from: EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Interest:</strong> ${interest}</p>
        <h3>Message:</h3>
        <p>${String(message).replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    });

    // Auto-reply email to user (optional)
    try {
      await transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject: 'We Received Your Message - Social Media Agency',
        html: `
          <h2>Thank You for Reaching Out!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and we're excited to work with you!</p>
          <p>Our team will get back to you within 24 hours.</p>
          <hr>
          <p><strong>Your Submission:</strong></p>
          <p><strong>Service:</strong> ${interest}</p>
          <p><strong>Message:</strong></p>
          <p>${String(message).replace(/\n/g, '<br>')}</p>
          <hr>
          <p>Best regards,<br>Social Media Agency Team</p>
        `,
      });
    } catch (replyErr) {
      // If auto-reply fails, log but don't fail the whole request
      console.warn('Auto-reply failed:', replyErr);
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    const payload: any = { error: 'Failed to send email' };
    if (process.env.NODE_ENV !== 'production') payload.details = String(error);
    return NextResponse.json(payload, { status: 500 });
  }
}