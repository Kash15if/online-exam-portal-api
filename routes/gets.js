const express = require("express");
const router = express.Router();

let jwt = require("jsonwebtoken"); //import jwt
const pool = require("../models/dbCon"); //importing db-pool for query

//api for answers
router.get("/answers", async (req, res) => {
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

    // console.log(users.user);

    const out = await pool.query(
      'SELECT "user", answers, "time" FROM public.answers where "user" = $1;',
      [users.user]
    );
    res.send(out.rows);
  } catch {
    return res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
});

//get api for timeleft
router.get("/timeleft", async (req, res) => {
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

    const out = await pool.query(
      'SELECT "user", timeleft FROM public.usertimeer where "user" = $1;',
      [users.user]
    );
    res.send(out.rows);
  } catch {
    return res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
});

//testing jwt
router.get("/abc", async (req, res) => {
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
    res.send(users);
  } catch {
    return res
      .status(500)
      .send({ auth: false, message: "Failed to authenticate token." });
  }
});

//code for checking authentication
// const jwttoken = req.headers["x-access-token"];

//   if (!jwttoken)
//     return res
//       .status(401)
//       .send({ auth: false, message: "Authentication required." });

//   const TokenArray = jwttoken.split(" ");
//   const token = TokenArray[1];

//   try {
//     const verified = await jwt.verify(token, "greenwaveauthapiforonlineexams");

//     const users = jwt.decode(token);

//     // console.log(users.user);

//     const out = await pool.query(
//       'SELECT "user", answers, "time" FROM public.answers where "user" = $1;',
//       [users.user]
//     );
//     res.send(out.rows);
//   } catch {
//     return res
//       .status(500)
//       .send({ auth: false, message: "Failed to authenticate token." });
//   }

module.exports = router;
