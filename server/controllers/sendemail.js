const asyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");

//@route POST /user/sendemail
//@desc send an email
exports.sendemail = asyncHandler(async (req, res, next) => {
  const { to, from, subject, text, html } = req.body;
  const msg = {
    to: to,

    // This email address(from) must be a verified sender in sendgrid.com
    // The sender who send the invitation should be shown in html or text in msg.
    from: from,
    subject: subject,
    text: text,
    html: html,
  };
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  sgMail
    .send(msg)
    .then(() => {
      res.json({
        status: "success",
        message: "Email sent successfully",
      });
    })
    .catch((error) => {
      console.log(new Date(), error);
      res.json({
        status: 500,
        message: error,
      });
    });
});
