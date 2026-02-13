const express = require("express");
const path = require("path");

const router = express.Router();

module.exports = (viewDir) => {
    router.get("/", (req, res) => {
        if (req.session.user) {
            res.sendFile(path.join(viewDir, "index.html"));
        } else {
            res.sendFile(path.join(viewDir, "login.html"));
        }
    });
    return router;
};
