const express = require('express');
const base64 = require('base-64');
var utf8 = require('utf8');
const path = require('path');
const bodyParser = require('body-parser');
const createError = require("http-errors");
const PORT = 3000;

const app = express();

const adminRouter = require("./routes/admin");
const landingRouter = require("./routes/landing");
const operatorRouter = require("./routes/operator");
const reportRouter = require("./routes/report");
const { application } = require('express');

app.set("views", path.resolve(__dirname,"views"));
app.set("view engine", "ejs");

app.use("/css", express.static("css"));
app.use("/static", express.static("static"));
app.use("/script", express.static("script"));
app.use("/html", express.static("html"));
app.use("/vendor", express.static("vendor"));
app.use("/cdn", express.static("cdn"));

app.use(bodyParser.json({ limit: '1024mb' }));
app.use(bodyParser.text());
app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRouter);
app.use("/operator", operatorRouter);
app.use("/landing", landingRouter);
app.use("/admin", reportRouter);


app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.status + " " + err.message);
});

app.listen(PORT, () => {
    console.log("Server listening on port " +PORT);
});

module.exports = app;