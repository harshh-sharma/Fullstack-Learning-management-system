import nodemailer from "nodemailer";


const sendMail = async (email,subject,message) => {  
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "maddison53@ethereal.email",
      pass: "jn7jnAPss4f63QBp6D",
    },
  });
  const res = await transporter.sendMail({
    from: '"Harsh sharma" <2210harshsharma@gmail.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: message, // html body
  });
  console.log(res);
}

export default sendMail;

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = 

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);
