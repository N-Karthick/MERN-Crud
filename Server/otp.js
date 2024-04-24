const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const path = require('path');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smpt.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "sender_gmail.com",
    pass: "password",
  },
});

async function generateOTP(email) {
  const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  const hashedOTP = await bcrypt.hash(otp, 10);
  const mailOptions = {
    from: { name: 'NODE OTP', address: "sender_gmail.com" },
    to: "receiver.com",
    subject: 'OTP Verification',
    text: `Your OTP for login is ${otp}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  return { otp, hashedOTP };
}

module.exports = generateOTP;
