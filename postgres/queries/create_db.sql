CREATE TABLE "user_auth" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT
);

CREATE TABLE "user_profile" (
  "id" SERIAL PRIMARY KEY,
  "email" TEXT UNIQUE NOT NULL,
  "first_name" TEXT,
  "last_name" TEXT,
  "role" TEXT
);

CREATE TABLE "file" (
  "id" SERIAL PRIMARY KEY,
  "url" TEXT NOT NULL,
  "name" TEXT,
  "created_at" TIMESTAMP NOT NULL,
  "length" INT,
  "size" INT,
  "encoding" TEXT,
  "mime_type" TEXT
);

CREATE TABLE "project" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "created_at" TIMESTAMP NOT NULL,
  "edited_at" TIMESTAMP
);

CREATE TABLE "project_user" (
  "id" SERIAL PRIMARY KEY,
  "user_profile_id" INT NOT NULL,
  "project_id" INT NOT NULL
);

CREATE TABLE "project_file" (
  "id" SERIAL PRIMARY KEY,
  "file_id" INT NOT NULL,
  "project_id" INT NOT NULL
);

ALTER TABLE "user_profile" ADD FOREIGN KEY ("email") REFERENCES "user_auth" ("email");

ALTER TABLE "project_user" ADD FOREIGN KEY ("user_profile_id") REFERENCES "user_profile" ("id");

ALTER TABLE "project_user" ADD FOREIGN KEY ("project_id") REFERENCES "project" ("id");

ALTER TABLE "project_file" ADD FOREIGN KEY ("file_id") REFERENCES "file" ("id");

ALTER TABLE "project_file" ADD FOREIGN KEY ("project_id") REFERENCES "project" ("id");

-- MOCK DATA:


INSERT INTO "user_auth" (email, password) VALUES ('test@test.com', 'test');

INSERT INTO "user_profile" (email, first_name, last_name)
VALUES ('test@test.com', 'test first name', 'test last name');

INSERT INTO "file" (url, created_at, length, size)
VALUES ('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', CURRENT_TIMESTAMP, 10243432, 131549223);

INSERT INTO "project" (title, description, created_at, edited_at)
VALUES ('Test Project', 'Test Project Description', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "project_user" (user_profile_id, project_id)
VALUES ((SELECT id FROM user_profile WHERE email = 'test@test.com'),( SELECT id FROM project WHERE title = 'Test Project'));

INSERT INTO "project_file" (file_id, project_id)
VALUES ((SELECT id FROM file WHERE url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'), (SELECT id FROM project WHERE title = 'Test Project'));