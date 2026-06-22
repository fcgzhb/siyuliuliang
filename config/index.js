const path = require('path');

module.exports = {
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET || 'siyuliuliang-secret-key-2024',
  dbName: path.join(__dirname, '..', 'data', 'data.db'),
  uploadDir: path.join(__dirname, '..', 'public', 'uploads'),
  pageSize: 15,
};
