--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  email TEXT,
  username TEXT NOT NULL,
  image TEXT NOT NULL,
  plan TEXT NOT NULL,
  paid INTEGER NOT NULL DEFAULT 0,
  onboard INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER(4) DEFAULT (strftime('%s', 'now')),
  UNIQUE(username),
  CONSTRAINT accounts_ck_plan CHECK (plan IN ("free", "premium")),
  CONSTRAINT accounts_ck_paid CHECK (paid IN (0, 1)),
  CONSTRAINT accounts_ck_onboard CHECK (onboard IN (0, 1))
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
  created_at INTEGER(4) DEFAULT (strftime('%s', 'now')),
  CONSTRAINT posts_fk_user_id FOREIGN KEY (user_id) REFERENCES accounts (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT posts_ck_kind CHECK (kind IN ("link", "self"))
);

CREATE TABLE comments (
  id INTEGER PRIMARY KEY,
  post_id INTEGER NOT NULL,
  username TEXT NOT NULL,
  body TEXT NOT NULL,
  num_votes INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER(4) DEFAULT (strftime('%s', 'now')),
  CONSTRAINT comments_fk_post_id FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE stats (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  posts_made INTEGER DEFAULT 0,
  upvotes_received INTEGER DEFAULT 0,
  created_at INTEGER(4) DEFAULT (strftime('%s', 'now')),
  CONSTRAINT stats_fk_user_id FOREIGN KEY (user_id) REFERENCES accounts (id) ON UPDATE CASCADE ON DELETE CASCADE,
  UNIQUE(user_id)
);

CREATE INDEX Accounts_idx_username ON accounts (username);
CREATE INDEX Accounts_idx_email ON accounts (email);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP INDEX Accounts_idx_email;

DROP INDEX Accounts_idx_username;

DROP TABLE Stats;

DROP TABLE Comments;

DROP TABLE Posts;

DROP TABLE Accounts;
