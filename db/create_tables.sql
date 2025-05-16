CREATE TABLE "public".questions (
    id SERIAL PRIMARY KEY,
    questions TEXT NOT null
);


CREATE TABLE "public".answers (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL REFERENCES questions(id),
    answer TEXT NOT NULL
);

