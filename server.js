const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(require("cors")());

function run(cmd) {
  return new Promise(resolve => {
    exec(cmd, (err, stdout) => resolve(stdout.trim()));
  });
}

app.get("/stats", async (req, res) => {
  const battery = await run("termux-battery-status");
  const mem = await run("cat /proc/meminfo");
  const storage = await run("df -h /data");

  res.json({
    battery: JSON.parse(battery),
    memory: mem,
    storage
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
