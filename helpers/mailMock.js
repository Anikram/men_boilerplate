require('dotenv').config();

function sendMail(req, res, email, text) {
  function deliver(options, cb) {
    console.log('>>>');
    console.log(options);
    cb();
  }
  return new Promise((r) => {
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_RESET_SENDER,
      subject: 'Password Reset',
      text,
    };

    deliver(mailOptions, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Successfully sent!');
      }
    });
    r('done');
  });
}

module.exports = {
  sendMail,
};
