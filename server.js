var express = require("express");
//const app = express();
var app = express();
var multer = require('multer');
var upload = multer();
const cors = require("cors");

app.use(cors());
require("dotenv").config();
const port = process.env.PORT || 5001;//"192.168.0.112"


app.get("/", (req, res) => {
    res.send("Hello there")
})

// for parsing application/json
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

//app.use(express.json({ extebded: true }));

app.use("/auth", require("./routes/auth"));
app.use("/customers", require("./routes/customer"));
app.use("/dishes", require("./routes/dishes"));
app.use("/orders", require("./routes/orders"));
app.use("/restaurants", require("./routes/restaurants"));
app.listen(port, () => console.log(`Example app listening on port ${port} !`));

// var http = require('http');http.createServer(function (req,res){ res.write('Nodejs started using xampp'); res.end();}).listen(8080);
// console.log('http server started'); 
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