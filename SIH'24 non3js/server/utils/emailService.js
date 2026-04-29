const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendVerificationEmail = async (email, username, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'FarmConnect - Verify Your Email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2E8B57;">Welcome to FarmConnect!</h2>
        <p>Hi ${username},</p>
        <p>Thank you for registering with FarmConnect. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #2E8B57; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, please ignore this email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #999; font-size: 12px;">FarmConnect - Assured Contract Farming System</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

const sendContractEmail = async (email, contractDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'FarmConnect - New Contract Created',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2E8B57;">Contract Created Successfully!</h2>
        <p>A new farming contract has been created with the following details:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Company:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${contractDetails.companyName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Farmer:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${contractDetails.farmerName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Product:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${contractDetails.product}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Quantity:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${contractDetails.quantity} units</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Amount:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">$${contractDetails.totalAmount}</td>
          </tr>
        </table>
        <p>Please log in to your account to view the complete contract details.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #999; font-size: 12px;">FarmConnect - Assured Contract Farming System</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail, sendContractEmail };
