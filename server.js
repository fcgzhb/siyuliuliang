const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const config = require('./config');

const app = express();

// Ensure upload directory exists
const uploadDir = config.uploadDir;
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
}));

// Initialize database (creates tables and seeds data)
require('./db');

// Routes
const routes = require('./routes');
app.use('/', routes);

// Error handler
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`私域流量用户运营管理平台 running at http://localhost:${config.port}`);
});

module.exports = app;
