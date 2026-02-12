const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");

const setupStatsSocket = require("./websocket/stats.socket");

const controlRoutes = require("./routes/control.routes");
const pageRoutes = require("./routes/page.routes");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.static(__dirname));
app.use("/photos", express.static("photos"));

app.use("/", pageRoutes(__dirname));
app.use("/control", controlRoutes(__dirname));

setupStatsSocket(server);

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
