const express = require("express");
const router = express.Router();

let jwt = require("jsonwebtoken"); //import jwt
const pool = require("../models/dbCon"); //importing db-pool for query

//update answer api
router.post("/updateanswer", async (req, res) => {
  const jwttoken = req.headers["x-access-token"];

  if (!jwttoken)
    return res
      .status(401)
      .send({ auth: false, message: "Authentication required." });

  const TokenArray = jwttoken.split(" ");
  const token = TokenArray[1];

  try {
    const verified = await jwt.verify(token, "greenwaveauthapiforonlineexams");

    const users = jwt.decode(token);

    const data = req.body;
    const answers = data.answers;
    const user = users.user;

    // answer is an array of string or character here
    // update public.answers  set "answers" =ARRAY [ 'A', 'B', 'C', 'D' ] ::text[], "time" = Now() where "user" =  '1234567890'
    // in query , this is working update public.answers  set "answers" =[ 'A', 'B', 'C', 'D' ] ::text[], "time" = Now() where "user" =  '1234567890'
    //     'INSERT INTO test (test_name, test_question, test_choice, test_answer, teacher_email, class_year_content)
    // VALUES ($1, $2, $3,$4,$5, $6) RETURNING *',
    //   [name, certificate, question, req.body.choices, answers, email, classe],
    // );
    // ['A', 'A', 'C', 'D','D', 'A', 'C', 'C','D', 'D' ]

    const out = await pool.query(
      'update public.answers  set "answers" =  $1::text[], "time" = Now() where "user" = $2',
      [answers, user]
    );

    res.status = 200;
    res.send({ res: "data updated succesfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
});

//update timer api
router.post("/updatetimer", async (req, res) => {
  const jwttoken = req.headers["x-access-token"];

  if (!jwttoken)
    return res
      .status(401)
      .send({ auth: false, message: "Authentication required." });

  const TokenArray = jwttoken.split(" ");
  const token = TokenArray[1];

  try {
    const verified = await jwt.verify(token, "greenwaveauthapiforonlineexams");

    const users = jwt.decode(token);

    const data = req.body;
    const timeleft = data.timeleft;
    const user = users.user;

    const out = await pool.query(
      'update public.usertimeer  set timeleft = $1 where "user" = $2',
      [timeleft, user]
    );

    res.status = 200;
    res.send({ result: "data updated succesfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
});

//Check answers and return result
router.post("/getresult", async (req, res) => {
  const jwttoken = req.headers["x-access-token"];

  if (!jwttoken)
    return res
      .status(401)
      .send({ auth: false, message: "Authentication required." });

  const TokenArray = jwttoken.split(" ");
  const token = TokenArray[1];

  try {
    const verified = await jwt.verify(token, "greenwaveauthapiforonlineexams");

    const users = jwt.decode(token);

    const topic = req.body.topic;

    const _userAnswers = await pool.query(
      'SELECT "user", answers FROM public.answers where "user" = $1;',
      [users.user]
    );

    const _actualAnswers = await pool.query(
      'SELECT  answer FROM public."Questions" where qtopic = $1 order by qno;',
      [topic]
    );

    const actualAnswerArray = _actualAnswers.rows.map((item) =>
      item.answer.toUpperCase()
    );

    const usersAnswerArray = _userAnswers.rows[0].answers;

    let marks = 0;
    const totalMarks = actualAnswerArray.length;

    usersAnswerArray.forEach((element, index) => {
      if (element.trim() === actualAnswerArray[index].trim()) {
        marks++;
      }
    });

    res.status(200);
    res.send({ marks: marks, user: users.user, totalMarks: totalMarks });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
});

module.exports = router;
