const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  // Key metrics
  const totalUsers = db.prepare('SELECT COUNT(*) as count FROM user_profiles').get().count;
  const totalInteractions = db.prepare('SELECT COUNT(*) as count FROM interactions').get().count;
  const churnPending = db.prepare("SELECT COUNT(*) as count FROM churn_warnings WHERE status = 'pending'").get().count;
  const avgConversion = db.prepare('SELECT AVG(conversionRate) as avg FROM activity_effects').get().avg || 0;
  const totalFeedback = db.prepare("SELECT COUNT(*) as count FROM feedback WHERE status = 'pending'").get().count;
  const activeStrategies = db.prepare("SELECT COUNT(*) as count FROM marketing_strategies WHERE status = 'active'").get().count;

  // Recent interactions
  const recentInteractions = db.prepare(
    'SELECT * FROM interactions ORDER BY dataId DESC LIMIT 8'
  ).all();

  // Top users by value score
  const topUsers = db.prepare(
    'SELECT * FROM user_profiles ORDER BY userValueScore DESC LIMIT 5'
  ).all();

  // Churn distribution
  const churnByLevel = db.prepare(
    "SELECT risk_level, COUNT(*) as count FROM churn_warnings GROUP BY risk_level"
  ).all();

  // Recent feedback
  const recentFeedback = db.prepare(
    'SELECT * FROM feedback ORDER BY id DESC LIMIT 5'
  ).all();

  res.render('layout', {
    view: 'dashboard',
    title: '控制台',
    activeMenu: 'dashboard',
    metrics: { totalUsers, totalInteractions, churnPending, avgConversion, totalFeedback, activeStrategies },
    recentInteractions,
    topUsers,
    churnByLevel,
    recentFeedback,
    currentUser: { display_name: req.session.displayName },
  });
});

module.exports = router;
