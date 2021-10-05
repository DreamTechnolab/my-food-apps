const pool = require("../config/db");
const auth = require("../middleware/auth");

const router = require("express").Router();

// GET DISHES
router.get("/get_dish",(req, res) => {
  const data = req.body;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`SELECT * FROM dishes`, (err, rows) => {
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

// GET DISH
router.get("/get_dish/:rest_id", (req, res) => {
  const { rest_id } = req.params;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`SELECT * FROM dishes WHERE rest_id = ${rest_id}`, (err, rows) => {
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

// ADD DISH
router.post("/add_dish", (req, res) => {
  const data = req.body;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`INSERT INTO dishes SET ?`, data, (err, rows) => {
      con.release();
      if (rows) {
        return res
                      .status(200)
                      .json({code: "200", msg: "Dish added successfully"});
        // return res.status(200).json({ data: rows });
      } else {
        console.error(err);
        return res.status(500).json({ data: "SERVER ERROR" });
      }
    });
  });
});

// EDIT DISH
router.put("/update_dish/:id", (req, res) => {
  const data = req.body;
  const { id } = req.params;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`UPDATE dishes SET ? WHERE d_id = ${id}`, data, (err, rows) => {
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

// DELETE DISH
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(`DELETE FROM dishes WHERE d_id = ${id}`, (err, rows) => {
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


