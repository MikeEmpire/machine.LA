export default function sendEmail(req, res) {
  const nodemailer = require('nodemailer');
  /* eslint-disable no-console */
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.content}</p>
   `;

  console.log(output);

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: 'themachinemailersender@gmail.com', // generated ethereal user
      pass: 'TheMachine', // generated ethereal password
    }
  });

    // setup email data with unicode symbols
  const mailOptions = {
    from: '"Node Mailer Contact" <samplesender.machine@gmail.com>', // sender address
    to: 'themachinemailersender@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Mail', // plain text body
    html: output, // html body
  };

    // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return res.render('index');
  });
};
