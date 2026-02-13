const express = require("express");
const path = require("path");

const router = express.Router();

module.exports = (baseDir) => {

  router.get("/", (req,res) => {
    if(req.session.user){
      res.sendFile(path.join(baseDir, "index.html"));
    }else{
      res.sendFile(path.join(baseDir,"login.html"));
    }
  });

  return router;
};
