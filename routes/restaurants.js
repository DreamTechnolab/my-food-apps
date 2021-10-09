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

    // GET ALL HOME
// router.get("/home", (req, res) => {
//   pool.getConnection((err, con) => {
//     if (err) throw err;
//     con.query("SELECT * FROM banners", (err, rows) => {
//       con.release();
//       if (rows) {
//         pool.getConnection((err, con) => {
//           if (err) throw err;
//           con.query("SELECT * FROM banners", (err, rows) => {
//             con.release();
//             if (rows) {
              
//               return res.status(200).json({ data: rows });
//             } else {
//               console.error(err);
//               return res.status(500).json({ data: "SERVER ERROR" });
//             }
//           });
//         });
//         return res.status(200).json({ data: rows });
//       } else {
//         console.error(err);
//         return res.status(500).json({ data: "SERVER ERROR" });
//       }
//     });
//   });
// });

  module.exports = router;


  // {
//   "name": "my-food-apps",
//   "version": "1.0.0",
//   "description": "Food app for restraunt",
//   "main": "server.js",
//   "scripts": {
//     "server": "nodemon server.js",
//     "start": "node server.js",
//     "build": "webpack"
//   },
//   "author": "Diptee Parmar",
//   "license": "ISC",
//   "dependencies": {
//     "bcryptjs": "^2.4.3",
//     "body-parser": "^1.19.0",
//     "config": "^3.3.6",
//     "cors": "^2.8.5",
//     "dotenv": "^10.0.0",
//     "express": "^4.17.1",
//     "express-validator": "^6.12.1",
//     "jsonwebtoken": "^8.5.1",
//     "mongoose": "^6.0.7",
//     "multer": "^1.4.3",
//     "mysql": "^2.18.1",
//     "server": "^1.0.36",
//     "socket.io": "^4.2.0",
//     "superagent": "^6.1.0"
//   },
//   "devDependencies": {
//     "nodemon": "^2.0.13",
//     "webpack": "^5.58.0",
//     "webpack-cli": "^4.9.0"
//   },
//   "repository": {
//     "type": "git",
//     "url": "git+https://github.com/DreamTechnolab/just-order.git"
//   },
//   "bugs": {
//     "url": "https://github.com/DreamTechnolab/just-order/issues"
//   },
//   "homepage": "https://github.com/DreamTechnolab/just-order#readme"
// }
