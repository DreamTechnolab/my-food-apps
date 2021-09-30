const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config()

// app.use(cors());
// require("dotenv").config();
const port = process.env.PORT || 5001;


app.get("/", (req, res) => {
    res.send("Hello there")
})
app.use(express.json({ extended: false }));

app.use("/auth", require("./routes/auth"));
app.use("/customers", require("./routes/customer"));
app.use("/dishes", require("./routes/dishes"));
app.use("/orders", require("./routes/orders"));
app.use("/restaurants", require("./routes/restaurants"));

app.listen(port, () => console.log(`Example app listening on port ${port} !`));