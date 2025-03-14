import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {
        //hash token 
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        //forgotpassword token
        if(emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        //verify Token
        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        }
        


        //create transporter for nodemailer
        // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.SEND_EMAIL_USER,
      pass: process.env.SEND_EMAIL_PASS
    }
  });

  if (emailType === "VERIFY") {
    const mailOptions = {
        from: "N5o9O@example.com",
        to: email,
        subject: "Verify your email",
        html: `<p className="text-blue-700">To verify your account</p>
        <p>
        First login to your account. Then Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> </p>
        <p>Or follow this link: ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>

        `
      };
    
  const mailResponse = await transport.sendMail(mailOptions);
  return mailResponse;
  }

  if (emailType === "RESET") {
    const mailOptions = {
        from: "N5o9O@example.com",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/resetPass?token=${hashedToken}">here</a> to reset your password</p>
        <p>Or follow this link: ${process.env.DOMAIN}/resetPass?token=${hashedToken}</p>
        `
      };
    
  const mailResponse = await transport.sendMail(mailOptions);
  return mailResponse;
  }


//   const mailOptions = {
//     from: "N5o9O@example.com",
//     to: email,
//     subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
//     html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"
//       } or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
//   `
// };





    } catch (error: any) {
        throw new Error(error.message);
    }
}
