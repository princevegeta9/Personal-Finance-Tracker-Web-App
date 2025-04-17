const express = require("express");
const router = express.Router();
const db = require("../db");

function isAuthenticated(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    next();
}

router.get('/', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    const q = "SELECT * FROM transactions WHERE user_id = ?";
    db.query(q, [userId], (err, results) => {
        if (err) throw err;
        res.render('index.ejs', { transactions: results });
    });
});

router.post('/add', isAuthenticated, (req, res) => {
    const userId = req.session.userId;
    const { title, amount, date } = req.body;
    db.query(
        "INSERT INTO transactions (title, amount, date, user_id) VALUES (?, ?, ?, ?)",
        [title, amount, date, userId],
        (err) => {
            if (err) throw err;
            res.redirect("/");
        }
    );
});

router.post("/delete/:id", isAuthenticated, (req, res) => {
    const { id } = req.params;
    const userId = req.session.userId;

    db.query(
        `DELETE FROM transactions WHERE id = ? AND user_id = ?`,
        [id, userId],
        (err) => {
            if (err) throw err;
            res.redirect('/');
        }
    );
});

router.get('/add-transaction', isAuthenticated, (req, res) => {
    res.render('add-transaction');
});

module.exports = router;