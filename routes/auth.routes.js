const express = require("express");
const router = express.Router();

module.exports = () => {
    // POST /auth/login
    router.post('/login', (req, res) => {
        const { username, password } = req.body;

        if (username !== process.env.LOGIN_USER || password !== process.env.LOGIN_PASS) {
            console.log("Invalid credentials");
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Initialize session
        req.session.user = { username: username };
        res.json({ message: 'Login successful', user: req.session.user });
    });

    // GET /auth/profile
    router.get('/profile', (req, res) => {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.json({ message: 'Profile accessed', user: req.session.user });
    });

    // POST /auth/logout
    router.post('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) return res.status(500).json({ message: 'Logout failed' });
            res.clearCookie('connect.sid');
            res.json({ message: 'Logout successful' });
        });
    });

    return router;
};