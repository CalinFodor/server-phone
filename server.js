const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(require("cors")());
app.use(express.static(__dirname));

/**
 * Helper: Runs a shell command and returns a promise
 */
function run(cmd) {
  return new Promise(resolve => {
    exec(cmd, (err, stdout) => resolve(stdout.trim()));
  });
}

/**
 * Data Parsers
 */
async function getBattery() {
  const status = JSON.parse(await run("termux-battery-status"));
  return {
    percent: status.percentage,
    display: `${status.percentage}%`
  };
}

async function getStorage() {
  const info = await run("df -h /data");
  const lines = info.split('\n');
  const fields = lines[lines.length - 1].split(/\s+/);
  
  return {
    percent: fields[4] || "0%",
    display: `${fields[2] || "N/A"} / ${fields[1] || "N/A"}`
  };
}

async function getMemory() {
  const info = await run("free -h");
  const match = info.match(/Mem:\s+([^\s]+)\s+([^\s]+)/);
  if (!match) return { percent: "0%", display: "N/A" };

  const [_, totalRaw, usedRaw] = match;

  // Convert Gi/Mi to a standard number for math
  const toMb = (str) => {
    let val = parseFloat(str);
    return str.includes("Gi") ? val * 1024 : val;
  };

  const total = toMb(totalRaw);
  const used = toMb(usedRaw);
  const percent = Math.round((used / total) * 100);

  return {
    percent: `${percent}%`,
    display: `${usedRaw} / ${totalRaw}`
  };
}

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/stats", async (req, res) => {
  try {
    // Run all three requests in parallel for better performance
    const [battery, storage, memory] = await Promise.all([
      getBattery(),
      getStorage(),
      getMemory()
    ]);

    res.json({ battery, storage, memory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stats." });
  }
});

app.post("/control/:action",async (req,res) => {
  const action = req.params.action;

  let photoPath = "";

  try{
    if(action === "flashlight-on"){
      await run("termux-torch on");
    }else if(action === "flashlight-off"){
      await run("termux-torch off");
    }else if(action === "vibrate"){
      await run("termux-vibrate -d 1000");
    }else if(action === "take-photo"){
      const dStr = Date.now(); 
      const fileName = `${dStr}.jpeg`;
      
      const fullPath = path.join(__dirname, "photos", fileName);
      
      await run(`termux-camera-photo ${fullPath}`);
      
      res.json({ photoUrl: `./photos/${fileName}` });

    }

    res.status(200).send("Command ok");

  }catch(error){
    res.status(500).send("Command failed");
  }

});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running: http://localhost:3000");
});