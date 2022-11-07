var pgp = require("pg-promise")();
const { publicDecrypt } = require("crypto");
const db = pgp('postgresql://postgres:nissan@localhost:5432/rnaipl');

exports.getReports = function(req, res) {
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
                    console.log(res.locals.taskRecords);
                    res.render("report", res.locals.taskRecords);
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
};

exports.postReports = function(req, res) {
    console.log("hi");
    res.redirect("../admin/report");
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
    INNER JOIN public.chklst_hdr ch ON ch.chklst_id = th.chklst_id and th.status_code = '90';`)
    .then(data => {
        return data;
    }).catch(error => {
        console.log(error);
    });
};

function getInProgressTaskRecords(pgp) {
    return pgp.any(`SELECT ch.chklst_name, ch.station_name, ch.total_no_instruction, th.created_dttm, th.updated_dttm
    FROM public.task_hdr th
    INNER JOIN public.chklst_hdr ch ON ch.chklst_id = th.chklst_id and th.status_code = '0';`)
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
    INNER JOIN public.chklst_hdr ch ON ch.chklst_id = th.chklst_id and th.status_code = '99';`)
    .then(data => {
        //console.log(data);
        return data;
    }).catch(error => {
        console.log(error);
    });
};