const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const file = require("./celebrities.json");

const app = express();
const jsonParser = bodyParser.json();
app.use(cors());

// hello router
app.get("/", jsonParser, (req, res) => {
  res.status(200).json({ hello: "Hello World" });
});

// sending users data
app.get("/users", (req, res) => {
  fs.readFile("./celebrities.json", "utf-8", (err, jsonString) => {
    if (err) {
      console.log("File read failed: ", err);
      return;
    }
    res.json(JSON.parse(jsonString));
  });
});

// updating user data
app.post("/update", jsonParser, (req, res) => {
  const { id, first, last, dob, gender, email, picture, country, description } =
    req.body;
  file.forEach((user) => {
    if (user.id === id) {
      user.first = first;
      user.last = last;
      user.dob = dob;
      user.gender = gender;
      user.email = email;
      user.picture = picture;
      user.country = country;
      user.description = description;
    }
  });
  fs.writeFileSync(
    "./celebrities.json",
    JSON.stringify(file, null, 2),
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
  res.status(200).json({ updated: "Success" });
});

// deleting user data from record
app.delete("/delete/:id", jsonParser, (req, res) => {
  const id = req.params.id;
  file.forEach((user, index) => {
    if (user.id === parseInt(id)) {
      file.splice(index, 1);
    }
  });
  fs.writeFileSync(
    "./celebrities.json",
    JSON.stringify(file, null, 2),
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
  res.status(202).send({ updated: "Success" });
});

app.listen((port = 3001), () => {
  console.log(`Listening on port: ${port}`);
});
