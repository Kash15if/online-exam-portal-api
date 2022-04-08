// const express = require("express");
// const router = express.Router();

// //importing db-pool for query
// const pool = require("../models/dbCon");

// router.post("/update-answer", async (req, res) => {
//   const data = req.body;
//   const answers = data.answers;
//   const uid = data.uid;

//   // console.log(answers);
//   //answer is an array of string or character here
//   const out = await pool.query(
//     'update public.answers  set "answers" =ARRAY $1, "time" = Now() where "user" = $2',
//     [answers, uid]
//   );

//   res.send(out);
// });

// router.post("/update-timer", async (req, res) => {
//   const data = req.body;
//   const timeleft = data.timeleft;
//   const uid = data.uid;

//   // console.log(subTasks);
//   const out = await pool.query(
//     'update public.usertimeer  set timeleft = $1 where "user" = $2',
//     [timeleft, uid]
//   );

//   res.send(out);
// });

// module.exports = router;
