module.exports = (host, passwordToken) => `You are receiving this because you (or someone else) 
  have requested the reset of the password for your account. Please click on the following link, or paste this 
  into your browser to complete the process: http:// ${host}/reset/${passwordToken}
  
  If you did not request this, please ignore this email and your password will remain unchanged.`;
