const express = require("express");
const path = require("path");

const router = express.Router();

module.exports = (baseDir) => {

  router.get("/", (req,res) => {
    res.sendFile(path.join(baseDir, "index.html"));
  });

  return router;
};
