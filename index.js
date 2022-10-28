const express = require('express');
const base64 = require('base-64');
var utf8 = require('utf8');
const path = require('path');
const bodyParser = require('body-parser');
const createError = require("http-errors");
const PORT = 3000;

const app = express();

const adminRouter = require("./routes/admin");
const operatorRouter = require("./routes/operator");
const { application } = require('express');

app.set("views", path.resolve(__dirname,"views"));
app.set("view engine", "ejs");

app.use("/css", express.static("css"));
app.use("/static", express.static("static"));
app.use("/script", express.static("script"));
app.use("/html", express.static("html"));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRouter);
app.use("/operator", operatorRouter);

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