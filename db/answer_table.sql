DROP TABLE IF EXISTS answers;

CREATE TABLE "public".answers (
    id SERIAL PRIMARY KEY,
    question_id INT NOT NULL REFERENCES questions(id),
    answer  NOT NULL
)