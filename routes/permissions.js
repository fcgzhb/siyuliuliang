const express = require('express');
const db = require('../db');

const router = express.Router();

// List roles
router.get('/', (req, res) => {
  const roles = db.prepare('SELECT * FROM roles ORDER BY id DESC').all();
  const allUsers = db.prepare('SELECT id, username, display_name FROM users WHERE status = 1').all();

  // Get members per role
  const roleMembers = {};
  for (const role of roles) {
    roleMembers[role.id] = db.prepare(
      'SELECT u.id, u.username, u.display_name FROM role_members rm JOIN users u ON rm.user_id = u.id WHERE rm.role_id = ?'
    ).all(role.id);
  }

  res.render('layout', {
    view: 'permissions/index',
    title: '权限分配',
    activeMenu: 'permissions',
    roles,
    allUsers,
    roleMembers,
    currentUser: { display_name: req.session.displayName },
  });
});

// Create role
router.post('/', (req, res) => {
  const { role_name, role_description } = req.body;
  if (role_name) {
    db.prepare('INSERT INTO roles (role_name, role_description) VALUES (?, ?)')
      .run(role_name, role_description || '');
  }
  res.redirect('/permissions');
});

// Update role
router.post('/:id', (req, res) => {
  const { role_name, role_description, status } = req.body;
  db.prepare('UPDATE roles SET role_name = ?, role_description = ?, status = ? WHERE id = ?')
    .run(role_name, role_description || '', status === undefined ? 1 : parseInt(status), req.params.id);
  res.redirect('/permissions');
});

// Delete role
router.post('/:id/delete', (req, res) => {
  db.prepare('DELETE FROM role_members WHERE role_id = ?').run(req.params.id);
  db.prepare('DELETE FROM roles WHERE id = ?').run(req.params.id);
  res.redirect('/permissions');
});

// Add member to role
router.post('/:id/members', (req, res) => {
  const { user_id } = req.body;
  if (user_id) {
    try {
      db.prepare('INSERT INTO role_members (role_id, user_id) VALUES (?, ?)')
        .run(req.params.id, user_id);
    } catch (e) {
      // Already exists
    }
  }
  res.redirect('/permissions');
});

// Remove member from role
router.post('/:id/members/:userId/remove', (req, res) => {
  db.prepare('DELETE FROM role_members WHERE role_id = ? AND user_id = ?')
    .run(req.params.id, req.params.userId);
  res.redirect('/permissions');
});

module.exports = router;
