const pool = require("../config/db");

const router = require("express").Router();

// GET ORDERS
router.get("/", async(req, res) => {
  const data = req.body;
  await pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`SELECT * FROM orders`, (err, rows) => {
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

// GET ORDER/:ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`SELECT * FROM orders WHERE o_id = ${id}`, (err, rows) => {
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

// POST ORDER
router.post("/", (req, res) => {
  const data = req.body;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`INSERT INTO orders SET ?`, data, (err, rows) => {
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

// EDIT DISH
router.put("/:id", (req, res) => {
  const data = req.body;
  const { id } = req.params;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`UPDATE orders SET ? WHERE o_id = ${id}`, data, (err, rows) => {
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

// DELETE ORDER
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`DELETE FROM orders WHERE o_id = ${id}`, (err, rows) => {
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
