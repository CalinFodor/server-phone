const run = require("../utils/run");

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

async function getAllStats(){
  const [battery, storage, memory] = await Promise.all([
    getBattery(),
    getStorage(),
    getMemory()
  ]);

  return { battery, storage, memory };
}

module.exports = {
  getBattery,
  getStorage,
  getMemory,
  getAllStats
};
