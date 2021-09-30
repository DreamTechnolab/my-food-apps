const pool = require("../config/db");

const router = require("express").Router();

// GET ALL KITCHENS
router.get("/", (req, res) => {
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query("SELECT * FROM kitchens", (err, rows) => {
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

// GET KITCHEN/:ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`SELECT * FROM kitchens WHERE k_id = ${id}`, (err, rows) => {
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

// GET KITCHEN/:ID/DISHES
router.get("/:id/dishes", (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`SELECT * FROM dishes WHERE k_id = ${id}`, (err, rows) => {
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

// ADD KITCHEN
router.post("/", (req, res) => {
  const data = req.body;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`INSERT INTO kitchens SET ?`, data, (err, rows) => {
      con.release();
      if (rows) {
        return res.status(200).json({ msg: "Kitchen has been added" });
      } else {
        console.error(err);
        return res.status(500).json({ data: "SERVER ERROR" });
      }
    });
  });
});

// EDIT KITCHEN
router.put("/:id", (req, res) => {
  const data = req.body;
  const { id } = req.params;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`UPDATE kitchens SET ? WHERE k_id = ${id}`, data, (err, rows) => {
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

// DELETE KITCHEN
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`DELETE FROM kitchens WHERE k_id = ${id}`, (err, rows) => {
      con.release();
      if (rows) {
        return res.status(200).json({ msg: "Kitchen has been deleted" });
      } else {
        console.error(err);
        return res.status(500).json({ data: "SERVER ERROR" });
      }
    });
  });
});

module.exports = router;
