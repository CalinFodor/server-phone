const express = require("express");
const router = express.Router();
const hardware = require("../services/hardware.service");

module.exports = (baseDir) => {

  router.post("/:action", async (req,res) => {
    const action = req.params.action;

    if(!req.session.user){
      return;
    }

    try{
      if(action === "flashlight-on"){

        await hardware.flashlightOn();
      }
      else if(action === "flashlight-off"){
        await hardware.flashlightOff();
      }
      else if(action === "vibrate"){
        await hardware.vibrate();
      }
      else if(action === "take-photo"){
        const fileName = await hardware.takePhoto(baseDir);

        return res.json({
          photoUrl: `/photos/${fileName}`
        });
      }else if(action === "get-location"){
        const locInfo = await hardware.getLocation();
        const locJson = JSON.parse(locInfo);

        return res.json({
          latitude:locJson.latitude,
          longtiude:locJson.longtiude
        });

      }

      res.send("Command ok");

    }catch(err){
      res.status(500).send("Command failed");
    }
  });

  return router;
};
