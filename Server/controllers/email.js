const HttpError = require("../models/http-error");
const nodemailer = require("nodemailer");

// nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.SENT_FROM_EMAIL_ACCOUNT}`,
    pass: `${process.env.SENT_FROM_EMAIL_PASSWORD}`,
  },
});

//create
const sendMeInquirerEmail = async (req, res, next) => {
  const { email, name, description } = req.body;
  const mailOptions = {
    from: `${process.env.SENT_FROM_EMAIL_ACCOUNT}`,
    to: `${process.env.SENT_FROM_EMAIL_ACCOUNT}`,
    subject: `Potential Interview with ${name}`,
    html: `<h4>${name} -- ${email}:</h4><p>${description}</p>`,
  };
  try {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent " + info);
      }
    });
  } catch (err) {
    return next(new HttpError("A problem ocurred", 503));
  }
  res.json({ message: "Email sent to Jeremy successfully" });
};

const sendConfirmEmail = async (req, res, next) => {
  const { email, name } = req.body;
  const mailOptions = {
    from: `${process.env.SENT_FROM_EMAIL_ACCOUNT}`,
    to: email,
    subject: "Potential Interview",
    html: `<p>An auto-delivered message through nodejs:</p><br/><h3>Thanks so much for your interest ${name}!</h3><p>I recieved your email and will respond as soon as I am able.</p><p>Warmest Regards,</p><p>Jeremy Leopold</p>`,
  };
  try {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent" + info.response);
      }
    });
  } catch (err) {
    return next(new HttpError("A problem ocurred", 503));
  }
  res.json({ message: "Email sent to inquirer successfully" });
};

exports.sendMeInquirerEmail = sendMeInquirerEmail;
exports.sendConfirmEmail = sendConfirmEmail;
