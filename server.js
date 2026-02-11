const express = require("express");
const { exec } = require("child_process");
const path = require("path"); 

const app = express();
app.use(require("cors")());
app.use(express.static(__dirname));

// Helper function to run Termux commands
function run(cmd) {
  return new Promise(resolve => {
    exec(cmd, (err, stdout) => resolve(stdout.trim()));
  });
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/stats", async (req, res) => {
  try {
    
    // 1. Get Battery (JSON)
    const { percentage } = JSON.parse(await run("termux-battery-status"));

    // 2. Get Memory (Text Table)
    const memoryInfo = await run("free -h");
    // Regex logic: Find the line starting with "Mem:", then grab the 1st and 2nd values
    const memMatch = memoryInfo.match(/Mem:\s+([^\s]+)\s+([^\s]+)/);
    const memTotal = memMatch ? memMatch[1] : "N/A";
    const memUsed = memMatch ? memMatch[2] : "N/A";
    const memPercentage = Math.round(100*memUsed/memTotal);


    // 3. Get Storage (Text Table)
    const storageInfo = await run("df -h /data");
    // Regex logic: Split by lines, take the last line, and split by whitespace
    const storageLines = storageInfo.trim().split('\n');
    const storageFields = storageLines[storageLines.length - 1].split(/\s+/);
    
    // In 'df -h', usually: index 3 is Avail, index 4 is Use%
    const storageSize = storageFields[0] || "N/A";
    const storageFree = storageFields[3] || "N/A";
    const storageUsedPercent = storageFields[4] || "N/A";

    res.json({
      battery: {
        percent: percentage,
        display:`${percentage}%`
      }, 
      storage: {
        percent: storageUsedPercent,
        display: `${storageFree} / ${storageSize}`
      },

      memory: {
        percent: `${memPercentage}%`,
        display: `${memUsed} / ${memTotal}`
      }
    });


  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats. Is Termux:API installed?" });
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://localhost:3000 (Phone)");
  console.log("To access from laptop, use your phone's IP address on port 3000");
  
});