--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  email TEXT,
  username TEXT NOT NULL,
  image TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  onboard INTEGER NOT NULL DEFAULT 0,
  email_verified INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  UNIQUE(username),
  UNIQUE(email),
  CONSTRAINT accounts_ck_plan CHECK (plan IN ("free", "premium")),
  CONSTRAINT accounts_ck_status CHECK (status IN ('trialing', 'active', 'past_due', 'canceled', 'unpaid')),
  CONSTRAINT accounts_ck_onboard CHECK (onboard IN (0, 1)),
  CONSTRAINT accounts_ck_email_verified CHECK (email_verified IN (0, 1))
);

CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  title TEXT NOT NULL,
  kind TEXT NOT NULL,
  link TEXT,
  body TEXT,
  num_votes INTEGER NOT NULL DEFAULT 0,
  num_comments INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  CONSTRAINT posts_fk_user_id FOREIGN KEY (user_id) REFERENCES accounts (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT posts_ck_kind CHECK (kind IN ("link", "self"))
);

CREATE TABLE comments (
  id INTEGER PRIMARY KEY,
  post_id INTEGER NOT NULL,
  username TEXT NOT NULL,
  body TEXT NOT NULL,
  num_votes INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  CONSTRAINT comments_fk_post_id FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE stats (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  posts_made INTEGER DEFAULT 0,
  upvotes_received INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  CONSTRAINT stats_fk_user_id FOREIGN KEY (user_id) REFERENCES accounts (id) ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE(user_id)
);

CREATE INDEX accounts_idx_username ON accounts (username);
CREATE INDEX accounts_idx_email ON accounts (email);

CREATE TRIGGER tg_accounts_updated_at
  AFTER UPDATE
  ON accounts
  FOR EACH ROW
  WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE accounts SET updated_at = strftime('%s', 'now') WHERE id = OLD.id;
END;

CREATE TRIGGER tg_accounts_create_stats
  AFTER INSERT
  ON accounts
BEGIN
  INSERT INTO stats(user_id) VALUES (NEW.id);
END;

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP INDEX accounts_idx_email;

DROP INDEX accounts_idx_username;

DROP TABLE stats;

DROP TABLE comments;

DROP TABLE posts;

DROP TABLE accounts;
