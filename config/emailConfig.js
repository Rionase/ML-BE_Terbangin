const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async ({ to, subject, html, attachments = [] }) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
        attachments, // Menambahkan attachments pada opsi mail
    };
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
