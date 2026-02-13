const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000}

}));

app.post('/login',(req,res) => {
    const { username, password } = req.body;
 
    if (username!=process.env.LOGIN_USER || password!=process.env.LOGIN_PASS) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    // Store user information in session (excluding password)
    req.session.user = {
      username: username
    };
  
    res.json({ message: 'Login successful', user: req.session.user });

})

app.get('/profile', (req, res) => {
  // Check if user is logged in
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
 
  res.json({ message: 'Profile accessed', user: req.session.user });
});

// Logout route
app.post('/logout', (req, res) => {
  // Destroy session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logout successful' });
  });
});


app.use("/", pageRoutes(__dirname));
app.use("/control", controlRoutes(__dirname));

setupStatsSocket(server);

let PORT = 3000;
if (process.env.PORT){
    PORT = process.env.PORT;
}

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
