function sendMail(req, res, email, token) {
  function deliver(options, cb) {
    console.log('>>>');
    console.log(options);
    cb();
  }
  return new Promise((r) => {
    const mailOptions = {
      to: email,
      from: 'passwordreset@demo.com',
      subject: 'Express.js Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset 
      of the password for your account. Please click on the following link, or paste this 
      into your browser to complete the process: http:// ${req.headers.host}/reset/${token}
      If you did not request this, please ignore this email and your password will remain unchanged.`
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
