const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const config = require('../config');

const dbDir = path.dirname(config.dbName);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(config.dbName);
db.pragma('journal_mode = WAL');
db.pragma('busyTimeout = 5000');

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
db.exec(schema);

// Seed default admin if not exists
const admin = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!admin) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (username, password, display_name, role_id) VALUES (?, ?, ?, ?)')
    .run('admin', hashedPassword, '系统管理员', 1);

  // Seed default role
  db.prepare('INSERT INTO roles (role_name, role_description) VALUES (?, ?)')
    .run('超级管理员', '拥有系统所有权限');
  db.prepare('INSERT INTO roles (role_name, role_description) VALUES (?, ?)')
    .run('运营人员', '负责日常运营操作');
}

module.exports = db;
