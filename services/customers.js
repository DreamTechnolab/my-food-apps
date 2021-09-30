const pool = require("../config/db");

const getDBConnection = () => {
  try {
    pool.getConnection((err, con) => {
      if (err) {
        console.error("DB connection Failed");
        return err;
      }
      return con;
    });
  } catch (err) {
    console.error("DB connection failed" + con);
  }
};

module.exports = getDBConnection();
