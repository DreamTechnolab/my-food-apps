const express = require("express");
const app = express();
const cors = require("cors");
const { socket } = require("server/router");
require("dotenv").config()

var http = require("http").createServer(app);
var io = require("socket.io")(http);
var url = require("url");
const { response } = require("express");
var bodyParser = ("body-parser");

app.use(bodyParser());
var clientResponseRef;

app.get("/*", (req, res) => {
var pathname = url.parse(req.url).pathname;
var obj = {
    pathname: pathname,
    method: "get",
    params: req.query
}
io.emit("page-request",obj);
clientResponseRef = res;
})

app.post("/*", (req, res) => {
    var pathname = url.parse(req.url).pathname;
    var obj = {
        pathname: pathname,
        method: "post",
        params: req.body
    }
    io.emit("page-request",obj);
    clientResponseRef = res;
})

io.on('connection',(socket) => {
    console.log('a node connected');
    socket.on("page-response",(response) => {
        clientResponseRef.send(response);
    })
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
http.listen(server_port,() => {
    console.log('listning on *:' + server_port);
})

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