const express = require("express");
const mongoose = require("mongoose");
const apiService = require("./routes/apiService");
const authService = require("./routes/authService");
const bodyParser = require("body-parser");
const cors = require('cors');
const port = 3001;
const app = express();

mongoose.connect("mongodb://localhost/todoApp", { useNewUrlParser: true } , (err) => {
  if(err)
    console.log(err);

    console.log("Successfully connected");
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/api", apiService);
app.use("/auth", authService);

app.listen(port, (err) => {
  if(err)
    console.log("Server Down");

    console.log("Port running");
});
