DROP TABLE users;
CREATE TABLE users (
  username VARCHAR(32) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(32),
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(username, email, password, full_name, avatar)
VALUES('obama', 'obama@us.gov', 'jdh83hf83gf', 'Barrack Obama', 'obama.jpg');

INSERT INTO users(username, email, password, full_name, avatar)
VALUES('usa', 'us@us.gov', 'jddff3hf83gf', 'United States', 'flag.jpg');

CREATE TABLE tweets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(32) NOT NULL,
  content TEXT,
  picture VARCHAR(255),
  web_link VARCHAR(255),
  parent_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

INSERT INTO tweets(username, content, picture) VALUES('obama', 'Let''s make America great again', 'flag.jpg');

INSERT INTO tweets(username, content, picture) VALUES('usa', 'Make me great again', 'obama.jpg');


CREATE TABLE followers (
  follower_username VARCHAR(32) NOT NULL,
  following_username VARCHAR(32) NOT NULL,
  PRIMARY KEY (follower_username, following_username),
  FOREIGN KEY (follower_username) REFERENCES users(username) ON DELETE CASCADE,
  FOREIGN KEY (following_username) REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE retweets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(32) NOT NULL,
  tweet_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
  FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE
);

CREATE TABLE likes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(32) NOT NULL,
  tweet_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
  FOREIGN KEY (tweet_id) REFERENCES tweets(id) ON DELETE CASCADE
);
