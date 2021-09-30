const pool = require("../config/db");
const { check, validationResult } = require("express-validator");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER CUSTOMER
router.post(
  "/customer/signup",
  [
    check("full_name", "Please enter full Name").notEmpty(),
    check("phone", "Please enter phone number").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const data = req.body;
    const { full_name, phone} = req.body;

    pool.getConnection((err, con) => {
      con.query(
        `SELECT * FROM users WHERE phone = '${phone}'`,
        async (err, rows) => {
          if (rows.length !== 0) {
            return res.status(400).json({
              msg: "This Mobile Number has already been registered, Please login",
            });
          } else {
            // const salt = await bcrypt.genSalt(10);
            // data.password = await bcrypt.hash(password, salt);

            con.query(`INSERT INTO users SET ?`, data, (err, rows) => {
              con.release();
              if (rows) {
                const payload = {
                  user: {
                    phone: phone,
                  },
                };
                jwt.sign(
                  payload,
                  process.env.JWT_SECRET,
                  // {
                  //   expiresIn: 7200,
                  // },
                  (err, token) => {
                    return res
                      .status(200)
                      .json({ msg: "User added successfully", token });
                  }
                );
              } else {
                console.error(err);
                return res.status(500).json({ data: "SERVER ERROR" });
              }
            });
          }
        }
      );
    });
  }
);

// LOGIN CUSTOMER
router.post(
  "/customer/signin",
  [
    // check("email", "Please enter lname").isEmail(),
    check("phone", "Enter Valid mobile").exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const data = req.body;
    const { phone } = req.body;

    pool.getConnection((err, con) => {
      con.query(
        `SELECT * FROM users WHERE phone = '${phone}'`,
        async (err, rows) => {
          if (rows.length === 0) {
            return res.status(404).json({
              msg: "User not found with this mobile number",
            });
          } else {
            var myString = phone.toString();
            var myString2 = rows[0].phone.toString();

            if (myString != myString2){
              return res
              .status(404)
              .json({ msg: "User not found with this mobile number"});
            }

            // const isMatch = await bcrypt.compare(myString,myString2);
            // if (!isMatch) {
            //   return res
            //     .status(404)
            //     .json({ msg: "User not found with this mobile number",isMatch ,myString,myString2});
            // }
            const payload = {
              user: {
                phone: phone,
              },
            };

            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              // {
              //   expiresIn: 7200,
              // },
              (err, token) => {
                return res
                  .status(200)
                  .json({ msg: "User logged in successfully", token });
              }
            );
          }
        }
      );
    });
  }
);



// REGISTER RESTAURANT
router.post(
  "/customer/rest_signup",
  [
    check("rest_name", "Please enter full Name").notEmpty(),
    check("phone", "Please enter phone number").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const data = req.body;
    const { full_name, phone} = req.body;

    pool.getConnection((err, con) => {
      con.query(
        `SELECT * FROM restaurants WHERE phone = '${phone}'`,
        async (err, rows) => {
          if (rows.length !== 0) {
            return res.status(400).json({
              msg: "This Mobile Number has already been registered, Please login",
            });
          } else {
            // const salt = await bcrypt.genSalt(10);
            // data.password = await bcrypt.hash(password, salt);

            con.query(`INSERT INTO restaurants SET ?`, data, (err, rows) => {
              con.release();
              if (rows) {
                const payload = {
                  user: {
                    phone: phone,
                  },
                };
                jwt.sign(
                  payload,
                  process.env.JWT_SECRET,
                  // {
                  //   expiresIn: 7200,
                  // },
                  (err, token) => {
                    return res
                      .status(200)
                      .json({ msg: "User added successfully", token });
                  }
                );
              } else {
                console.error(err);
                return res.status(500).json({ data: "SERVER ERROR" });
              }
            });
          }
        }
      );
    });
  }
);

// LOGIN RESTAURANT
router.post(
  "/customer/rest_signin",
  [
    // check("email", "Please enter lname").isEmail(),
    check("phone", "Enter Valid mobile").exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const data = req.body;
    const { phone } = req.body;

    pool.getConnection((err, con) => {
      con.query(
        `SELECT * FROM users WHERE phone = '${phone}'`,
        async (err, rows) => {
          if (rows.length === 0) {
            return res.status(404).json({
              msg: "User not found with this mobile number",
            });
          } else {
            var myString = phone.toString();
            var myString2 = rows[0].phone.toString();

            if (myString != myString2){
              return res
              .status(404)
              .json({ msg: "User not found with this mobile number"});
            }

            // const isMatch = await bcrypt.compare(myString,myString2);
            // if (!isMatch) {
            //   return res
            //     .status(404)
            //     .json({ msg: "User not found with this mobile number",isMatch ,myString,myString2});
            // }
            const payload = {
              user: {
                phone: phone,
              },
            };

            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              // {
              //   expiresIn: 7200,
              // },
              (err, token) => {
                return res
                  .status(200)
                  .json({ msg: "User logged in successfully", token });
              }
            );
          }
        }
      );
    });
  }
);

module.exports = router;
