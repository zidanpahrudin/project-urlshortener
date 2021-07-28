require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
const urlparser = require("url");
const cors = require("cors");
const bodyParser = require("body-parser");
const { url } = require("inspector");

const app = express();

const db = process.env.DB_URI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(mongoose.connection.readyState);

const URLSchema = new mongoose.Schema({ url: "String" });
const Url = mongoose.model("Url", URLSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Basic Configuration
const port = process.env.PORT || 3000;

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.post("/api/shorturl", function (req, res) {
  const bodyurl = req.body.url;
  const CheckURL = dns.lookup(
    urlparser.parse(bodyurl).hostname,
    (err, address) => {
      if (!address) {
        res.json({ error: "Invalid URL" });
      } else {
        const url = new Url({ url: bodyurl });
        url.save((err, data) => {
          res.json({
            original_url: data.url,
            short_url: data.id,
          });
        });
      }
    }
  );
});

app.get("/api/shorturl/:id", (req, res) => {
  const id = req.params.id;
  Url.findById(id, (err, data) => {
    if (!data) {
      res.json({ error: "invalid URL" });
    } else {
      res.redirect(data.url);
    }
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
