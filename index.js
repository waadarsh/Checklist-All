const express = require('express');
const base64 = require('base-64');
var utf8 = require('utf8');
const path = require('path');
const bodyParser = require('body-parser');
const createError = require("http-errors");
const PORT = 3000;

const adminRouter = require("./routes/admin");
const { application } = require('express');

const app = express();

app.use("/css", express.static("css"));
app.use("/static", express.static("static"));
app.use("/script", express.static("script"));
app.use("/html", express.static("html"));

app.use(bodyParser.text());
app.use(express.json());

app.use("/admin", adminRouter);

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