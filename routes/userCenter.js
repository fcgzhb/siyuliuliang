const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const user = db.prepare('SELECT id, username, display_name, created_at FROM users WHERE id = ?')
    .get(req.session.userId);
  if (!user) {
    return res.redirect('/login');
  }
  const role = db.prepare('SELECT role_name FROM roles WHERE id = ?').get(user.role_id);

  res.render('layout', {
    view: 'user-center',
    title: '用户中心',
    activeMenu: 'user-center',
    user,
    role,
    currentUser: { display_name: req.session.displayName },
  });
});

router.post('/', (req, res) => {
  const { display_name, old_password, new_password } = req.body;

  if (display_name) {
    db.prepare('UPDATE users SET display_name = ? WHERE id = ?')
      .run(display_name, req.session.userId);
    req.session.displayName = display_name;
  }

  if (old_password && new_password) {
    const user = db.prepare('SELECT password FROM users WHERE id = ?').get(req.session.userId);
    if (bcrypt.compareSync(old_password, user.password)) {
      db.prepare('UPDATE users SET password = ? WHERE id = ?')
        .run(bcrypt.hashSync(new_password, 10), req.session.userId);
    }
  }

  res.redirect('/user-center');
});

module.exports = router;
