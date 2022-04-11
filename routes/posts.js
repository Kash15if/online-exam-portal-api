const express = require("express");
const router = express.Router();

let jwt = require("jsonwebtoken"); //import jwt
//importing db-pool for query
const pool = require("../models/dbCon");

router.get("/abc", async (req, res) => {
  //   let token = req.headers["x-access-token"];
  const jwttoken = req.headers["x-access-token"];
  //   const TokenArray = jwttoken.split(" ");
  //   const token = TokenArray[1];

  if (!jwttoken)
    return res
      .status(401)
      .send({ auth: false, message: "Authentication required." });

  const TokenArray = jwttoken.split(" ");
  const token = TokenArray[1];

  try {
    const verified = await jwt.verify(token, "greenwaveauthapiforonlineexams");

    const users = jwt.decode(token);
    res.send(users);
  } catch {
    return res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
});

// router.post("/updateanswer", async (req, res) => {
//   const jwttoken = req.headers["x-access-token"];

//   const TokenArray = jwttoken.split(" ");
//   const token = TokenArray[1];

//   console.log(token);
//   const verified = await jwt.verify(token, "greenwaveauthapiforonlineexams");

//   console.log(token);
//   const users = jwt.decode(token);

//   console.log(users);

//   const data = req.body;
//   const answers = data.answers;
//   console.log(answers);
//   const user = users.user;

//   res.send(users);
// });

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

module.exports = router;
