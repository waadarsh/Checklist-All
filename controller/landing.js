var pgp = require("pg-promise")();
const { publicDecrypt } = require("crypto");
const path = require("path");
var queryString = require("querystring");
const db = pgp('postgresql://postgres:nissan@localhost:5432/rnaipl');

exports.getHome = function(req,res) {

    var finalData = [];
    var taskCountByStatus = [];
    db.task(getTaskCountByStatus)
    .then(data => {
        taskCountByStatus = data;
        finalData.push(taskCountByStatus);
        db.task(getCompletedTaskRecords)
        .then(data => {
            if(data.length != 0) {
                finalData.push(data);
            }
            db.task(getInProgressTaskRecords)
            .then(data => {
                if(data.length != 0) {
                    finalData.push(data);
                }
                db.task(getCancelledTaskRecords)
                .then(data => {
                    if(data.length != 0) {
                        finalData.push(data);
                    }
                    res.locals.taskRecords = finalData;
                    //console.log(res.locals.taskRecords);
                    res.render("Analytics", res.locals.taskRecords);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log(error);
            });
        }).catch(error => {
            console.log(error);
        })
    }).catch(error => {
        console.log(error);
    })
}

exports.getlanding = function(req, res) {
    const db1 = pgp('postgresql://postgres:nissan@localhost:5432/rnaipl');
    db1.any("SELECT chklst_id,chklst_name,station_name,total_no_instruction FROM chklst_hdr WHERE status_code = 110;")
    .then((data) => {
        landing=data;
        console.log(data);
        res.render("landing", landing);
    }).catch(error => res.send(error));

};

exports.postlanding = function(req, res) {
    console.log("hi");
    res.redirect("../admin/adminPanel");
};

function getTaskCountByStatus(pgp) {
    var finalData = [];
    return pgp.any(`SELECT COUNT(*) FROM public.task_hdr WHERE status_code = '0';`)
    .then((data) => {
        var inProgress = Object.create({});
        inProgress["InProgress"] = data[0].count;
        finalData.push(inProgress);
        //console.log(finalData);
        return db.any(`SELECT COUNT(*) FROM public.task_hdr WHERE status_code = '90';`)
        .then((data) => {
            var completed = Object.create({});
            completed["Completed"] = data[0].count;
            finalData.push(completed);
            //console.log(finalData);
            return db.any(`SELECT COUNT(*) FROM public.task_hdr WHERE status_code = '99';`)
            .then((data) => {
                var cancelled = Object.create({});
                cancelled["Cancelled"] = data[0].count;
                finalData.push(cancelled);
                //console.log(finalData);
                return finalData;
            }).catch(error => {
                console.log(error);
            });   
        }).catch(error => {
            console.log(error);
        });
    }).catch(error => {
        console.log(error);
    });
    //console.log(finalData);
};

function getCompletedTaskRecords(pgp) {
    return pgp.any(`SELECT ch.chklst_name, ch.station_name, ch.total_no_instruction, th.created_dttm, th.updated_dttm
    FROM public.task_hdr th
    INNER JOIN public.chklst_hdr ch ON ch.chklst_id = th.chklst_id and th.status_code = '90' order by th.updated_dttm desc;`)
    .then(data => {
        return data;
    }).catch(error => {
        console.log(error);
    });
};

function getInProgressTaskRecords(pgp) {
    return pgp.any(`SELECT ch.chklst_name, ch.station_name, ch.total_no_instruction, th.created_dttm, th.updated_dttm
    FROM public.task_hdr th
    INNER JOIN public.chklst_hdr ch ON ch.chklst_id = th.chklst_id and th.status_code = '0' order by th.updated_dttm desc;;`)
    .then(data => {
        //console.log(data);
        return data;
    }).catch(error => {
        console.log(error);
    });
};

function getCancelledTaskRecords(pgp) {
    return pgp.any(`SELECT ch.chklst_name, ch.station_name, ch.total_no_instruction, th.created_dttm, th.updated_dttm
    FROM public.task_hdr th
    INNER JOIN public.chklst_hdr ch ON ch.chklst_id = th.chklst_id and th.status_code = '99' order by th.updated_dttm desc;;`)
    .then(data => {
        //console.log(data);
        return data;
    }).catch(error => {
        console.log(error);
    });
};


