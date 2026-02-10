const express = require("express");
const { exec } = require("child_process");
const path = require("path"); // Required to locate your HTML file

const app = express();
app.use(require("cors")());

// Helper function to run Termux commands
function run(cmd) {
  return new Promise(resolve => {
    exec(cmd, (err, stdout) => resolve(stdout.trim()));
  });
}

// FIX: This route serves your HTML file when you visit http://IP:3000/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/stats", async (req, res) => {
  try {
    const battery = await run("termux-battery-status");
    const mem = await run("free -h | grep Mem"); // Cleaner memory output
    const storage = await run("df -h /data | tail -1"); // Cleaner storage output

    res.json({
      battery: JSON.parse(battery),
      memory: mem,
      storage: storage
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats. Is Termux:API installed?" });
  }
});

// FIX: Added '0.0.0.0' to allow connections from your laptop
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://localhost:3000 (Phone)");
  console.log("To access from laptop, use your phone's IP address on port 3000");
});