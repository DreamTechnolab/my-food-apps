const pool = require("../config/db");

const router = require("express").Router();

// EDIT RESTAURANT PROFILE
router.put("/update_restaurant/:id", (req, res) => {
    const data = req.body;
    const { id } = req.params;
    pool.getConnection((err, con) => {
      if (err) throw err;
      con.query(`UPDATE restaurants SET ? WHERE rest_id = ${id}`, data, (err, rows) => {
        con.release();
        if (rows) {
          //return res.status(200).json({ data: rows });
          return res
          .status(200)
          .json({code: "200", msg: "restaurant updated successfully"});
        } else {
          console.error(err);
          return res.status(500).json({ data: "SERVER ERROR" });
        }
      });
    });
  });

  // GET ALL RESTAURANT
router.get("/get_restaurants", (req, res) => {
    pool.getConnection((err, con) => {
      if (err) throw err;
      con.query("SELECT * FROM restaurants", (err, rows) => {
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