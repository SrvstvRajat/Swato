"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail=async function sendMail(str,data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "rajatk24srivastava@gmail.com", // generated ethereal user
      pass: "fegsfikkiiwzlfah", // generated ethereal password
    },
  });
  var Osubject,Otext,Ohtml;
  if(str==="signup")
    {
        Osubject=`Thank you for signing ${data.name}`;
        Ohtml=`<h1>Welcome To FoodApp.com</h1>
        Hope you have a good time !
        Here are your details -
        Name - ${data.name}
        Email - ${data.email}
        `
    }
else if(str==="resetPassword")
{
    Osubject=`Reset Password`;
    Ohtml=`
    <h1>foodApp.com</h1>
    Here is your link to reset your password :
    ${data.resetPasswordLink};
    `
}
  let info = await transporter.sendMail({
    from: '"FoodApp 👻" <rajatk24srivastava@gmail.com>', // sender address
    to: data.email,// list of receivers
    subject: Osubject,
    html:Ohtml,
  });

  console.log("Message sent: %s", info.messageId);
}