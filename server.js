const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
require("dotenv").config();
const port = process.env.PORT || 5001;

app.use(express.json({ extebded: false }));

app.use("/auth", require("./routes/auth"));
app.use("/customers", require("./routes/customer"));
app.use("/dishes", require("./routes/dishes"));
app.use("/orders", require("./routes/orders"));
app.use("/restaurants", require("./routes/restaurants"));
app.listen(port, () => console.log(`Example app listening on port ${port} !`));


// const port = process.env.PORT || 5001;


// app.get("/", (req, res) => {
//     res.send("Hello there")
// })
// app.use(express.json({ extended: false }));

// app.use("/auth", require("./routes/auth"));
// app.use("/customers", require("./routes/customer"));
// app.use("/dishes", require("./routes/dishes"));
// app.use("/orders", require("./routes/orders"));
// app.use("/restaurants", require("./routes/restaurants"));

// app.listen(port, () => console.log(`Example app listening on port ${port} !`));