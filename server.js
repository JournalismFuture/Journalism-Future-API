"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");

// database setup

mongoose
  .connect(
    "mongodb://localhost:27017/JournalismFutureDatabase",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Backend successfully started.");
  })
  .catch(err => {
    console.error("Backend error:", err.stack);
    process.exit(1);
  });
var db = mongoose.connection;

// router setup

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => res.send("Hello World!"));

var router = express.Router();

require("./routes/userRoute.js")(router);
require("./routes/articleRoute.js")(router);

//Use our router configuration when we call /api
app.use("/api", router);

app.listen(3000, () => console.log("Backend listening on port 3000!"));

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------
var os = require("os");
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function(ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function(iface) {
    if ("IPv4" !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      // console.log(ifname + ":" + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});
