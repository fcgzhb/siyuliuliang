PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  display_name TEXT NOT NULL DEFAULT '',
  role_id INTEGER DEFAULT 1,
  status INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now','localtime')),
  updated_at TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_name TEXT NOT NULL UNIQUE,
  role_description TEXT DEFAULT '',
  status INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS role_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(role_id, user_id)
);

CREATE TABLE IF NOT EXISTS user_profiles (
  dataId INTEGER PRIMARY KEY AUTOINCREMENT,
  userId TEXT NOT NULL,
  userName TEXT NOT NULL,
  email TEXT DEFAULT '',
  gender TEXT DEFAULT '',
  interests TEXT DEFAULT '',
  registrationDate TEXT DEFAULT '',
  userBio TEXT DEFAULT '',
  purchaseHistory TEXT DEFAULT '',
  userValueScore REAL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now','localtime')),
  updated_at TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS interactions (
  dataId INTEGER PRIMARY KEY AUTOINCREMENT,
  interactionId TEXT NOT NULL UNIQUE,
  userName TEXT NOT NULL,
  interactionType TEXT DEFAULT '',
  comments TEXT DEFAULT '',
  interactionOutcome TEXT DEFAULT '',
  userInterests TEXT DEFAULT '',
  interactionDate TEXT DEFAULT '',
  additionalNotes TEXT DEFAULT '',
  interactionScreenshot TEXT DEFAULT '',
  userEngagementScore REAL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now','localtime')),
  updated_at TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS churn_warnings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId TEXT NOT NULL,
  userName TEXT NOT NULL,
  risk_level TEXT DEFAULT 'medium',
  last_active_date TEXT DEFAULT '',
  risk_score REAL DEFAULT 0,
  reason TEXT DEFAULT '',
  status TEXT DEFAULT 'pending',
  handle_notes TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now','localtime')),
  updated_at TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS content_push (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT DEFAULT '',
  push_type TEXT DEFAULT '',
  target_audience TEXT DEFAULT '',
  push_date TEXT DEFAULT '',
  push_status TEXT DEFAULT 'draft',
  read_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now','localtime')),
  updated_at TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS marketing_strategies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  strategy_name TEXT NOT NULL,
  description TEXT DEFAULT '',
  strategy_type TEXT DEFAULT '',
  target_group TEXT DEFAULT '',
  start_date TEXT DEFAULT '',
  end_date TEXT DEFAULT '',
  budget REAL DEFAULT 0,
  expected_roi REAL DEFAULT 0,
  actual_roi REAL DEFAULT 0,
  status TEXT DEFAULT 'draft',
  created_at TEXT DEFAULT (datetime('now','localtime')),
  updated_at TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS activity_effects (
  dataId INTEGER PRIMARY KEY AUTOINCREMENT,
  activityName TEXT NOT NULL,
  activityType TEXT DEFAULT '',
  participantCount INTEGER DEFAULT 0,
  conversionRate REAL DEFAULT 0,
  userFeedback TEXT DEFAULT '',
  successFactors TEXT DEFAULT '',
  startDate TEXT DEFAULT '',
  activityDescription TEXT DEFAULT '',
  reportFile TEXT DEFAULT '',
  activityEffectScore REAL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now','localtime')),
  updated_at TEXT DEFAULT (datetime('now','localtime'))
);

CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId TEXT NOT NULL,
  userName TEXT NOT NULL,
  feedback_type TEXT DEFAULT '',
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 3,
  status TEXT DEFAULT 'pending',
  resolution TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now','localtime')),
  updated_at TEXT DEFAULT (datetime('now','localtime'))
);
