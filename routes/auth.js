const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
    res.render("login.ejs");
});

router.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.send("Username already taken.");
            }
            throw err;
        }
        res.redirect("/login");
    });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.send("Username or password is incorrect.");
        }

        const match = await bcrypt.compare(password, results[0].password);
        if (match) {
            req.session.userId = results[0].id;
            res.redirect("/");
        } else {
            res.send("Incorrect password.");
        }
    });
});

// Logout route
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send("Error logging out.");
        }
        res.redirect("/login");
    });
});

module.exports = router;