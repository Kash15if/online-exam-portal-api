const express = require("express");
const router = express.Router();

let jwt = require("jsonwebtoken");

//importing db-pool for query
// const pool = require("../models/dbCon");

// router.get("/answers", async (req, res) => {
//   //     var token = req.headers['x-access-token'];
//   //     if (!token) return res.status(401).send({ auth: false, message: 'Authentication required.' });

//   //   jwt.verify(token, config.secret, function(err, decoded) {
//   //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

//   const out = await pool.query(
//     'SELECT "user", answers, "time" FROM public.answers where "user" = $1;',
//     [uid]
//   );
//   res.send(out.rows);
// });

// router.get("/timeleft", async (req, res) => {
//   const out = await pool.query(
//     'SELECT "user", timeleft FROM public.usertimeer where "user" = $1;',
//     [uid]
//   );
//   res.send(out.rows);
// });

//testing jwt
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

module.exports = router;
