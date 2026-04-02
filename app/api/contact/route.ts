import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Validation function
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!emailUser || !emailPassword || !adminEmail) {
      console.error("Missing email configuration");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: emailUser,
      to: adminEmail,
      subject: `AI-Native Book Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #dc2626; margin-top: 0; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>

            <div style="margin: 20px 0;">
              <p><strong style="color: #374151;">From:</strong> ${name}</p>
              <p><strong style="color: #374151;">Email:</strong> ${email}</p>
              <p><strong style="color: #374151;">Subject:</strong> ${subject}</p>
            </div>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0; font-weight: bold; color: #374151;">Message:</p>
              <p style="margin: 10px 0 0 0; color: #6b7280; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
              Sent via AI-Native Development Book Contact Form
            </div>
          </div>
        </div>
      `,
    };

    // Confirmation email to sender
    const confirmationMailOptions = {
      from: emailUser,
      to: email,
      subject: "Thank you for contacting AI-Native Development",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
          <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h1 style="color: #dc2626; margin-top: 0;">Thank You for Reaching Out!</h1>

            <p style="color: #374151; line-height: 1.6;">
              Hi ${name},
            </p>

            <p style="color: #6b7280; line-height: 1.6;">
              Thanks for contacting me about <strong>${subject}</strong>. I've received your message and I'll get back to you within 24-48 hours.
            </p>

            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>Your Message:</strong>
              </p>
              <p style="margin: 5px 0 0 0; color: #78716c; font-size: 14px; white-space: pre-wrap;">${message}</p>
            </div>

            <p style="color: #6b7280; line-height: 1.6;">
              If you have any urgent questions, feel free to reach out through the social media links on the website.
            </p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 14px;">
                Best regards,<br>
                <strong style="color: #374151;">AI-Native Development Team</strong>
              </p>
              <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 12px;">
                <a href="https://ai-native-book.dev" style="color: #dc2626; text-decoration: none;">ai-native-book.dev</a>
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! I'll get back to you soon."
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
