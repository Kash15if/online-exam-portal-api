const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//importing db-connection query
// const pool = require("./models/dbCon");
// pool.connect().then((row) => {
//   console.log("db is connected :", row._connected);
// });

//for cors error
const cors = require("cors");
const corsOptions = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));

const AllGetROutes = require("./routes/gets");
// const AllPostRoutes = require("./routes/posts");
// const AuthRoutes = require("./routes/auth");
app.use("/get", AllGetROutes);
// app.use("/post", AllPostRoutes);
// app.use("/auth", AuthRoutes);

app.listen(3000);
