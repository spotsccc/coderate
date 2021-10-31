CREATE TABLE IF NOT EXISTS refresh_tokens (
    token VARCHAR(255) NOT NULL,
	id INTEGER NOT NULL,
	expires TIMESTAMP NOT NULL,
	primary key (token),
	FOREIGN KEY (id) REFERENCES users(id)
);

#DOWN

DROP TABLE refresh_tokens;