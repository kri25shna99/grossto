const express = require("express");
const csrf = require("csurf");
const nodemailer = require("nodemailer");
const router = express.Router();
const {
  userContactUsValidationRules,
  validateContactUs,
} = require("../config/validator");
const csrfProtection = csrf();
router.use(csrfProtection);


router.get("/about-us", (req, res) => {
  res.render("pages/about-us", {
    pageName: "About Us",
  });
});


router.get("/shipping-policy", (req, res) => {
  res.render("pages/shipping-policy", {
    pageName: "Shipping Policy",
  });
});


router.get("/careers", (req, res) => {
  res.render("pages/careers", {
    pageName: "Careers",
  });
});


router.get("/contact-us", (req, res) => {
  const successMsg = req.flash("success")[0];
  const errorMsg = req.flash("error");
  res.render("pages/contact-us", {
    pageName: "Contact Us",
    csrfToken: req.csrfToken(),
    successMsg,
    errorMsg,
  });
});


router.post(
  "/contact-us",
  [userContactUsValidationRules(), validateContactUs],
  (req, res) => {

    const smtpTrans = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {

        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });


    const mailOpts = {
      from: req.body.email,
      to: process.env.GMAIL_EMAIL,
      subject: `Enquiry from ${req.body.name}`,
      html: `
      <div>
      <h2 style="color: #478ba2; text-align:center;">Client's name: ${req.body.name}</h2>
      <h3 style="color: #478ba2;">Client's email: (${req.body.email})<h3>
      </div>
      <h3 style="color: #478ba2;">Client's message: </h3>
      <div style="font-size: 30;">
      ${req.body.message}
      </div>
      `,
    };


    smtpTrans.sendMail(mailOpts, (error, response) => {
      if (error) {
        req.flash(
          "error",
          "An error occured... Please check your internet connection and try again later"
        );
        return res.redirect("/pages/contact-us");
      } else {
        req.flash(
          "success",
          "Email sent successfully! Thanks for your inquiry."
        );
        return res.redirect("/pages/contact-us");
      }
    });
  }
);

module.exports = router;
