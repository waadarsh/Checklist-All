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
        //console.log(finalData[0]);
        res.locals.taskCount = finalData[0];
        //console.log(res.locals.taskCount[0].InProgress);
        res.render("report", res.locals.taskCount);
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