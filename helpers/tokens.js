const sendRefreshToken = (res, token) => {
  const date = new Date().setDate(new Date().getDate() + 2 * 7);
  res.cookie('jrt', token, {
    httpOnly: true,
    path: '/',
    expires: new Date(date),
  });
};

module.exports = {
  sendRefreshToken,
};
