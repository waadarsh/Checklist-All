var pgp = require("pg-promise")();
const { publicDecrypt } = require("crypto");
const path = require("path");
var queryString = require("querystring");
//const db = pgp('postgresql://postgres:nissan@localhost:5432/rnaipl');

exports.getlanding = function(req, res) {

    const db1 = pgp('postgresql://postgres:nissan@localhost:5432/rnaipl');
    db1.any("SELECT chklst_id,chklst_name,station_name,total_no_instruction FROM chklst_hdr WHERE status_code = 110;")
    .then((data) => {
        landing=data;
        console.log(data);
        res.render("landing", landing);
    }).catch(error => res.send(error));
    //res.sendFile(path.join(__dirname,'../views/inspectionComplete.html'));

};

exports.postlanding = function(req, res) {
    console.log("hi");
    res.redirect("../admin/adminPanel");
};



