function errorHandler(err, req, res, next) {
  console.error(`[Error] ${new Date().toISOString()} - ${err.message}`);
  console.error(err.stack);
  res.status(500).render('error', {
    title: '系统错误',
    message: process.env.NODE_ENV === 'production'
      ? '服务器内部错误，请联系管理员'
      : err.message,
  });
}

module.exports = errorHandler;
