const express = require('express');
const auth = require('../middleware/auth');
const db = require('../db');

const router = express.Router();

// Public routes
router.use('/', require('./auth'));

// Protected routes - all require login
router.use(auth);

// Dashboard
router.use('/dashboard', require('./dashboard'));

// CRUD modules
router.use('/user-profiles', require('./userProfiles'));
router.use('/interactions', require('./interactions'));
router.use('/churn-warnings', require('./churnWarnings'));
router.use('/content-push', require('./contentPush'));
router.use('/marketing-strategy', require('./marketingStrategy'));
router.use('/activity-effect', require('./activityEffect'));
router.use('/feedback', require('./feedback'));

// User center
router.use('/user-center', require('./userCenter'));

// Permissions
router.use('/permissions', require('./permissions'));

// Root redirect
router.get('/', (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router;
