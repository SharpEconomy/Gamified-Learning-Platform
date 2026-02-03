import nodemailer from "nodemailer";

const ADMIN_EMAIL = "shivta6200@gmail.com";

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  } as nodemailer.TransportOptions);
};

// Send thank you email to user when they sign in
export async function sendThankYouEmail(
  userEmail: string,
  userName: string,
  userId: string,
) {
  const transporter = createTransporter();

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.EMAIL_FROM || `"CodeQuest" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Thank you for choosing CodeQuest! 🚀",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #9333ea 0%, #4f46e5 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .logo { font-size: 28px; font-weight: bold; color: #facc15; }
          .content { background: #1f2937; padding: 30px; border-radius: 0 0 10px 10px 0; }
          .thank-you-text { color: #f3f4f6; font-size: 20px; margin-bottom: 20px; }
          .details { background: #374151; padding: 15px; border-radius: 5px; margin: 20px 0 0; }
          .details p { color: #d1d5db; margin: 8px 0; }
          .label { font-weight: bold; color: #6b7280; }
          .value { color: #111827; }
          .cta { background: #facc15; color: #7c3aed; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin-top: 20px; }
          .footer { text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🎮 CodeQuest</div>
          </div>
          <div class="content">
            <h1 class="thank-you-text">Thank you for Choosing CodeQuest! 🎉</h1>
            <p style="color: #d1d5db;">We're excited to have you on board! Let's start your coding journey together.</p>
            
            <div class="details">
              <p><span class="label">Name:</span> <span class="value">${userName}</span></p>
              <p><span class="label">Email:</span> <span class="value">${userEmail}</span></p>
              <p><span class="label">User ID:</span> <span class="value">${userId}</span></p>
            </div>
            
            <p style="color: #d1d5db;">What's next?</p>
            <ul style="color: #d1d5db; margin: 15px 0;">
              <li>📚 Explore our courses</li>
              <li>🏆 Earn XP and level up</li>
              <li>🎖️ Unlock achievements and badges</li>
              <li>📜 Get certificates</li>
            </ul>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/courses" class="cta">Start Learning</a>
            </div>
            
            <div class="footer">
              <p>This is an automated email. Please do not reply.</p>
              <p>&copy; ${new Date().getFullYear()} CodeQuest. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent to:", userEmail);
    return { success: true };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error };
  }
}

// Send notification email to admin about user sign-in
export async function sendAdminSignInNotification(
  userName: string,
  userEmail: string,
  userId: string,
) {
  const transporter = createTransporter();

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.EMAIL_FROM || `"CodeQuest" <${process.env.EMAIL_USER}>`,
    to: ADMIN_EMAIL,
    subject: `🔔 User Sign In: ${userName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #9333ea 0%, #4f46e5 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .logo { font-size: 24px; font-weight: bold; color: #facc15; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px 0; }
          .alert { background: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
          .details { background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0 0; }
          .details p { margin: 8px 0; }
          .label { font-weight: bold; color: #6b7280; }
          .value { color: #111827; }
          .timestamp { color: #6b7280; font-size: 11px; }
          .footer { text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🎮 CodeQuest Admin</div>
          </div>
          <div class="content">
            <h2 style="color: #111827; margin-top: 0;">🔔 User Sign In</h2>
            
            <div class="alert">
              <strong>A user just signed in to CodeQuest!</strong>
            </div>
            
            <div class="details">
              <p><span class="label">User Name:</span> <span class="value">${userName}</span></p>
              <p><span class="label">Email:</span> <span class="value">${userEmail}</span></p>
              <p><span class="label">User ID:</span> <span class="value">${userId}</span></p>
              <p><span class="label">Signed In At:</span> <span class="timestamp">${new Date().toLocaleString()}</span></p>
            </div>
            
            <p style="color: #6b7280;">You can track this user's activity from admin panel.</p>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin" style="background: #9333ea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Go to Admin Panel
              </a>
            </div>
            
            <div class="footer">
              <p>This is an automated notification from CodeQuest.</p>
              <p class="timestamp">${new Date().toISOString()}</p>
              <p>&copy; ${new Date().getFullYear()} CodeQuest. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Admin sign-in notification sent to:", ADMIN_EMAIL);
    return { success: true };
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return { success: false, error };
  }
}
