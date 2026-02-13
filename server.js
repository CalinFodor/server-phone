require('dotenv').config(); 
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const path = require("path");

// Import Socket Setup
const setupStatsSocket = require("./websocket/stats.socket");

// Import Route Modules
const authRoutes = require("./routes/auth.routes");
const controlRoutes = require("./routes/control.routes");
const pageRoutes = require("./routes/page.routes");

const app = express();
const server = http.createServer(app);

// --- 1. GLOBAL MIDDLEWARE ---
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- 2. SESSION CONFIGURATION ---
app.use(session({
    secret: process.env.SESSION_SECRET || 'dev_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// --- 3. AUTHENTICATION API ---
app.use("/auth", authRoutes());

// --- 4. PAGE ROUTING (The Gatekeeper) ---

app.use("/", pageRoutes(path.join(__dirname, 'views')));

// --- 5. STATIC ASSETS ---

app.use(express.static(path.join(__dirname, 'public')));
app.use("/photos", express.static(path.join(__dirname, "photos")));

// --- 6. OTHER BUSINESS LOGIC ---
app.use("/control", controlRoutes(__dirname));

// --- 7. WEBSOCKET SETUP ---
setupStatsSocket(server);

// --- 8. START SERVER ---
const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});