const WebSocket = require("ws");
const statsService = require("../services/stats.service");

function setupStatsSocket(server){

  const wss = new WebSocket.Server({ server });

  async function broadcastStats(){
    const statsData = await statsService.getAllStats();

    const payload = JSON.stringify({
      type: "stats",
      data: statsData
    });

    wss.clients.forEach(client => {
      if(client.readyState === WebSocket.OPEN){
        client.send(payload);
      }
    });
  }

  setInterval(broadcastStats, 5000);

  wss.on("connection", () => {
    console.log("WS client connected");
    broadcastStats();
  });

}

module.exports = setupStatsSocket;
