
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const sendEmail = async (email, password) => {
    try {
        // ✅ Create Transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Use env variable
                pass: process.env.EMAIL_PASS, // Use env variable
            }
        });

        // ✅ Define Email Options
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verification Mail - eAuction',
            html: `
                <h1>Welcome to eAuction</h1>
                <p>You have successfully registered on our application. Your login credentials are below:</p>
                <h3>Username: ${email}</h3>
                <h3>Password: ${password}</h3>
                <h2>Click the link below to verify your account:</h2>
                <a href="${process.env.FRONTEND_URL}/verifyuser/${email}">
                    Verify Account
                </a>
            `
        };

        // ✅ Send Email
        let info = await transporter.sendMail(mailOptions);
        console.log('✅ Email Sent:', info.response);

    } catch (error) {
        console.error('❌ Email Sending Failed:', error);
    }
};

export default sendEmail;
