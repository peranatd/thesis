-- ---
-- Globals
-- ---

DROP DATABASE IF EXISTS speakmirror;

CREATE DATABASE speakmirror;

USE speakmirror;

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table user
--
-- ---

DROP TABLE IF EXISTS user;

CREATE TABLE user (
  id INTEGER AUTO_INCREMENT,
  username VARCHAR(30) DEFAULT NULL,
  UNIQUE (username),
  PRIMARY KEY (id)
);

-- ---
-- Table session
--
-- ---

DROP TABLE IF EXISTS session;

CREATE TABLE session (
  id INTEGER AUTO_INCREMENT,
  session_timestamp TIMESTAMP,
  user_id INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Table microsoft
--
-- ---

DROP TABLE IF EXISTS microsoft;

CREATE TABLE microsoft (
  id INTEGER AUTO_INCREMENT,
  ms_datapoint VARCHAR(300) NULL DEFAULT NULL,
  ms_timestamp TIMESTAMP,
  session_id INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Table bv
--
-- ---

DROP TABLE IF EXISTS bv;

CREATE TABLE bv (
  id INTEGER AUTO_INCREMENT,
  bv_summary VARCHAR(300) NULL DEFAULT NULL,
  bv_mood VARCHAR(300) NULL DEFAULT NULL,
  session_id INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Table watson
--
-- ---

DROP TABLE IF EXISTS watson;

CREATE TABLE watson (
  id INTEGER AUTO_INCREMENT,
  wn_emotion VARCHAR(250) NULL DEFAULT NULL,
  wn_language VARCHAR(250) NULL DEFAULT NULL,
  wn_social VARCHAR(250) NULL DEFAULT NULL,
  wn_transcription MEDIUMTEXT NULL DEFAULT NULL,
  session_id INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE session ADD FOREIGN KEY (user_id) REFERENCES user (id);
ALTER TABLE microsoft ADD FOREIGN KEY (session_id) REFERENCES session (id);
ALTER TABLE bv ADD FOREIGN KEY (session_id) REFERENCES session (id);
ALTER TABLE watson ADD FOREIGN KEY (session_id) REFERENCES session (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE user ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE session ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE microsoft ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE bv ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE watson ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO user (username) VALUES
-- ('');
-- INSERT INTO session (user_id) VALUES
-- (,,);
-- INSERT INTO microsoft (id,ms_datapoint,ms_timestamp,session_id) VALUES
-- (,,,);
-- INSERT INTO bv (id,bv_summary,bv_mood,session_id) VALUES
-- (,,,);
-- INSERT INTO watson (id,wn_emotion,wn_language,wn_social,wn_transcription,session_id) VALUES
-- (,,,,,);