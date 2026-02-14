const path = require("path");
const run = require("../utils/run");

async function flashlightOn(){
  return run("termux-torch on");
}

async function flashlightOff(){
  return run("termux-torch off");
}

async function vibrate(){
  return run("termux-vibrate -d 1000");
}

async function getLocation(){
  return run("termux-location -p network")
}

async function takePhoto(baseDir){
  const fileName = `${Date.now()}.jpeg`;
  const fullPath = path.join(baseDir, "photos", fileName);

  await run(`termux-camera-photo ${fullPath}`);

  return fileName;
}

module.exports = {
  flashlightOn,
  flashlightOff,
  vibrate,
  takePhoto,
  getLocation
};
