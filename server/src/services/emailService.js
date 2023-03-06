import nodemailer from "nodemailer";
require("dotenv").config();
let senSimpleEmail = async (dataSend) => {
  // async..await is not allowed in global scope, must use a wrapper

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"BookingCare HI YOU 🤞🤖 " <anhnguyenvp154@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line

    html: getBodyHTMLEmail(dataSend), // html body
  });
};
let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
<h3>Xin chào ${dataSend.patientName}</h3>
<p>Bận nhận được Email này vì đã đặt lich khám bệnh online trên BookingCare</p>
<div><b>Thời gian: ${dataSend.time}</b></div>
<div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
<p>Nếu các thông tin trên là đúng sự thật, vui lòng nhấn vào <a href=${dataSend.redirectLink} target="_blank">Đây</a> để xác nhận và hoàn tất thủ tục khám bệnh</p>
<p>Xin cảm ơn!</p>
`;
  }
  if (dataSend.language === "en") {
    result = `
<h3>Hi ${dataSend.patientName}</h3>
<p>I received this email because I booked an online medical appointment on BookingCare</p>
<div><b>Selected time: ${dataSend.time}</b></div>
<div><b>The doctor chose: ${dataSend.doctorName}</b></div>
<p>If the above information is true, please click <a href=${dataSend.redirectLink} target="_blank">here</a> to confirm and complete the medical examination</p>
<p>Thanks you!</p>
`;
  }
  return result;
};
let sendAttachment = async (dataSend) => {
  // async..await is not allowed in global scope, must use a wrapper

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"BookingCare HI YOU 🤞🤖 " <anhnguyenvp154@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Kết quả đặt lịch khám bệnh", // Subject line

    html: getBodyHTMLEmailSendRemedy(dataSend), // html body
    attachments: [
      {
        filename: `Remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
        content: dataSend.imageBase64.split("base64,")[1],
        encoding: "base64",
      },
    ],
  });
};
let getBodyHTMLEmailSendRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
<h3>Xin chào ${dataSend.name}</h3>
<p>Bận nhận được Email này vì đã đặt lich khám bệnh online trên BookingCare</p>

<p>Thông tin đơn thuốc và hóa đơn được gửi trong file đính kèm</p>
<p>Xin cảm ơn!</p>
`;
  }
  if (dataSend.language === "en") {
    result = `
<h3>Hi ${dataSend.name}</h3>
<p>I received this email because I booked an online medical appointment on BookingCare</p>

<p>Prescription information and invoices are sent in the attached file</p>
<p>Thanks you!</p>
`;
  }
  return result;
};
module.exports = {
  senSimpleEmail,
  sendAttachment,
};
