const pool = require("../config/db");
const { check, validationResult } = require("express-validator");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// GET ALL CUSTOMERS
router.get("/", (req, res) => {
  pool.getConnection((err, con) => {
    if (err) throw err;
    console.log("DB CONNECTED");
    con.query("SELECT * FROM users", (err, rows) => {
      con.release();
      if (rows) {
        return res.status(200).json({ data: rows });
      } else {
        console.error(err);
        return res.status(500).json({ data: "SERVER ERROR" });
      }
    });
  });
});

// GET CUSTOMER/:ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`SELECT * FROM users WHERE id = ${id}`, (err, rows) => {
      con.release();
      if (rows) {
        return res.status(200).json({ data: rows });
      } else {
        console.error(err);
        return res.status(500).json({ data: "SERVER ERROR" });
      }
    });
  });
});

// EDIT CUSTOMER
router.put("/:id", (req, res) => {
  const data = req.body;
  const { id } = req.params;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`UPDATE users SET ? WHERE id = ${id}`, data, (err, rows) => {
      con.release();
      if (rows) {
        return res.status(200).json({ data: rows });
      } else {
        console.error(err);
        return res.status(500).json({ data: "SERVER ERROR" });
      }
    });
  });
});

// DELETE CUSTOMER
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`DELETE FROM users WHERE id = ${id}`, (err, rows) => {
      con.release();
      if (rows) {
        return res.status(200).json({ data: rows });
      } else {
        console.error(err);
        return res.status(500).json({ data: "SERVER ERROR" });
      }
    });
  });
});

module.exports = router;
