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


