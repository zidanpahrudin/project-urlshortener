// const express = require("express");
// const router = express.Router();
// const shortid = require("shortid");
// const url = require("../models/insert-model");
// const utils = require("../utils/utils");
// require("dotenv").config();

// router.post("/api/shorturl", async (req, res) => {
//   const { oriUrl } = req.body;
//   const base = process.env.PORT;
//   const urlId = shortid.generate();
//   if (utils.validateUrl(oriUrl)) {
//     try {
//       let url = await Url.findOne({ oriUrl });
//       if (url) {
//         res.json(url);
//       } else {
//         const shortUrl = `${base}/${urlId}`;

//         url = new url({
//           oriUrl,
//           shortUrl,
//           urlId,
//           date: new Date(),
//         });
//         await url.save();
//         res.json(url);
//       }
//     } catch (err) {}
//   }
// });
