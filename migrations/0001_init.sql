-- Migration number: 0001 	 2026-11-11T04:24:43.067Z--

CREATE TABLE youtube_profiles (
  code    TEXT PRIMARY KEY,
  ext_id  TEXT NOT NULL UNIQUE,
  name    TEXT NOT NULL
);

CREATE TABLE youtube_videos (
  id           INTEGER PRIMARY KEY,
  ext_id       TEXT NOT NULL UNIQUE,
  author       TEXT NOT NULL REFERENCES youtube_profiles(code),
  title        TEXT NOT NULL,
  description  TEXT,
  is_public    INTEGER NOT NULL DEFAULT 0 CHECK (is_public IN (0, 1))
);
