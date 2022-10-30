var pgp = require("pg-promise")();
const { publicDecrypt } = require("crypto");
const path = require("path");
var queryString = require("querystring");
const db = pgp('postgresql://postgres:nissan@localhost:5432/rnaipl');
var chklstId = null;
var chklstSeqNbr = null;
var chklstDtlId = null;
var taskId = null;
var taskDtlId = null;

exports.getTemplateList = function(req, res) {

    //const db = pgp('postgresql://postgres:air2020@localhost:5432/rnaipl');
    db.any("SELECT chklst_id,chklst_name,station_name,total_no_instruction FROM chklst_hdr WHERE status_code = 80;")
    .then((data) => {
        templateList=data;
        res.render("templateList", templateList);
    }).catch(error => res.send(error));

};

exports.postTemplateList = function(req, res) {
    chklstId = req.body.chklstId;
    chklstSeqNbr = 0;
    /*console.log(chklstId);*/
    const query = queryString.stringify({
        "chklstId":chklstId,
        "chklstSeqNbr":0
    });
    
    res.redirect("/operator/executeInspection/?" + query);
    /*db.task(getWorkInstructionDetails)
    .then((data) => {
        res.locals.inspectionDetails = data;
        console.log(res.locals.inspectionDetails);
        res.render("executeInspection",res.locals.inspectionDetails);  
        //res.send("Hello");
    })
    .catch(error => {
        console.log(error);
    });*/
};


exports.getExecuteInspection = function(req, res) {
    chklstId = req.query.chklstId;
    chklstSeqNbr = req.query.chklstSeqNbr;

    db.one(`SELECT cd.chklst_dtl_id FROM public.chklst_dtl cd WHERE cd.chklst_id = $1 and cd.chklst_seq_nbr = $2;`,[chklstId,chklstSeqNbr],e => e.chklst_dtl_id)
    .then((data) => {
        chklstDtlId = data;
        if(parseInt(chklstSeqNbr) === parseInt("0")) {
            db.one(`INSERT INTO public.task_hdr(chklst_id, status_code, created_dttm, updated_dttm) VALUES($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING task_id;`, [chklstId,0])
            .then((data) => {
                taskId = data.task_id;
                db.tx(insertTaskRecords)
                .then((data) => {
                    db.task(getWorkInstructionDetails)
                    .then((data) => {
                        res.locals.inspectionDetails = data;
                        res.locals.inspectionDetails[0]["task_dtl_id"] = taskDtlId;
                        console.log(res.locals.inspectionDetails[0]);
                        res.render("executeInspection",res.locals.inspectionDetails);
                    }).catch(error => {
                        console.log(error);
                    })
                }).catch(error => {
                    console.log(error);
                })
            }).catch(error => {
                console.log(error);
            });
        }
        else {
            db.tx(insertTaskRecords)
            .then((data) => {
                db.task(getWorkInstructionDetails)
                .then((data) => {
                    res.locals.inspectionDetails = data;
                    res.locals.inspectionDetails[0]["task_dtl_id"] = taskDtlId;
                    console.log(res.locals.inspectionDetails[0]);
                    res.render("executeInspection",res.locals.inspectionDetails);
                }).catch(error => {
                    console.log(error);
                })
            }).catch(error => {
                console.log(error);
            });
        }
    }).catch(error => {
        console.log(error);
    })

};

exports.postExecuteInspection = function(req, res) {
    var postChklstId = req.body.postchklstId;
    var postChklstSeqNbr = req.body.postchklstSeqNbr;
    var postChklstDtlId = req.body.postchklstDtlId;
    var postTaskDtlId = req.body.posttaskDtlId;
    var postInputField1Value = req.body.posthiddenInputField1Value;
    var postInputField2Value = req.body.posthiddenInputField2Value;
    var postCommentValue = req.body.posthiddenCommentValue;
    var postJudgementValue = req.body.posthiddenJudgementButtonValue;
    console.log("Checklist ID- " + postChklstId + ", Checklist Seq Number- " + postChklstSeqNbr + ", Checklist Detail Id- " + postChklstDtlId + ", Input Field 1: " + postInputField1Value + ", Input Field 2: " + postInputField2Value + ", Comments: " + postCommentValue + ", Judgement- " + postJudgementValue + ", Task Dtl Id- " + postTaskDtlId);
    
    /*
    if(postInputField1Value != "default") {
        updateTaskRecords("inputField1", postInputField1Value, postTaskDtlId);
    }
    if(postInputField2Value != "default") {
        updateTaskRecords("inputField2", postInputField2Value, postTaskDtlId);
    }
    if(postCommentValue != "default") {
        updateTaskRecords("comment", postCommentValue, postTaskDtlId);
    }
    if(postJudgementValue != "default") {
        updateTaskRecords("judgement", postJudgementValue, postTaskDtlId);
    }
    

    db.none(`UPDATE public.task_dtl SET status_code = 90, updated_dttm = CURRENT_TIMESTAMP WHERE task_dtl_id = $1;`,[taskDtlId])
    .then(() => {
        console.log("Updated task_dtl, task_dtl_id: " + taskDtlId);
    }).catch(error => {
        console.log(error);
    });
    
    db.one(`SELECT MAX(chklst_seq_nbr) FROM public.chklst_dtl WHERE chklst_id = $1;`, [postChklstId])
    .then((data) => {
        if(parseInt(data.max) < (parseInt(postChklstSeqNbr)+1)) {
            console.log("data.max-" + data.max);
            console.log("postChklstSeqNbr-" + (parseInt(postChklstSeqNbr)+1));
            db.one(`SELECT COUNT(*) FROM public.task_dtl WHERE task_id IN 
            (SELECT task_id from public.task_dtl WHERE task_dtl_id = $1) AND status_code < 90;`,[postTaskDtlId])
            .then((data) => {
                console.log("data" + data.count);
                if(data.count === 0) {
                    console.log("Before update task_hdr, data.count = " + data.count);
                    db.none(`UPDATE public.TASK_HDR set status_code = 90 WHERE task_id IN
                    (SELECT task_id FROM public.task_dtl WHERE task_dtl_id = $1);`,[postTaskDtlId])
                    .then(() => {
                        res.send("Inspection Completed!!!!!")
                    }).catch(error => {
                        console.log(error);
                    });
                }
            }).catch(error => {
                console.log(error);
            })
        }
        else {
            chklstId = parseInt(postChklstId);
            chklstSeqNbr = parseInt(postChklstSeqNbr)+1;
            const query = queryString.stringify({
                "chklstId":chklstId,
                "chklstSeqNbr":chklstSeqNbr
            });
            res.redirect("/operator/executeInspection/?" + query);
        }
    }).catch(error => {
        console.log(error);
    });
    */

    db.tx(t => {
        return t.batch(buildUpdateQuery(t, postTaskDtlId, postInputField1Value, postInputField2Value, postCommentValue, postJudgementValue));
    }).then(() => {
        db.one(`SELECT MAX(chklst_seq_nbr) FROM public.chklst_dtl WHERE chklst_id = $1;`, [postChklstId])
        .then((data) => {
            if(parseInt(data.max) < (parseInt(postChklstSeqNbr) + 1)) {
                console.log("max(chklstSeqNbr)="+data.max);
                console.log("chklstSeqNbr="+parseInt(postChklstSeqNbr)+1);
                db.one(`SELECT COUNT(*) FROM public.task_dtl WHERE task_id IN 
                (SELECT task_id from public.task_dtl WHERE task_dtl_id = $1) AND status_code < 90;`,[postTaskDtlId])
                .then((data) => {
                    console.log("Count(task_dtl)=" + data.count);
                    if(parseInt(data.count) === 0) {
                        console.log("Before updating task_hdr");
                        db.none(`UPDATE public.TASK_HDR set status_code = 90 WHERE task_id IN
                        (SELECT task_id FROM public.task_dtl WHERE task_dtl_id = $1);`,[postTaskDtlId])
                        .then(() => {
                            console.log("Before redirecting");
                            res.sendFile(path.join(__dirname,"../views/inspectionComplete.html"));
                        }).catch(error => {
                            console.log(error);
                        })
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
            else {
                chklstId = parseInt(postChklstId);
                chklstSeqNbr = parseInt(postChklstSeqNbr) + 1;
                const query = queryString.stringify({
                    "chklstId":chklstId,
                    "chklstSeqNbr":chklstSeqNbr
                });
                res.redirect("/operator/executeInspection/?" + query);
            }
        }).catch(error => {
            console.log(error);
        })
    }).catch(error => {
        console.log(error);
    })
}

function buildUpdateQuery(t, postTaskDtlId, postInputField1Value, postInputField2Value, postCommentValue, postJudgementValue) {
    var queryArray = [];
    if(postInputField1Value != "default") {
        var inputField1Query = t.none(`UPDATE public.task_component_property SET property_value = $1 WHERE property_type = 'input' AND property_name = 'value' 
        AND task_component_property_id = 
        (SELECT tcp.task_component_property_id FROM public.task_component_property tcp
        INNER JOIN public.task_composite_component_mapping tccm ON tcp.task_component_id = tccm.task_child_component_id AND tcp.property_type='input' 
        AND tcp.property_name = 'value' AND tccm.task_component_id = 
        (SELECT tc.task_component_id FROM public.task_component tc
        INNER JOIN public.chklst_component cc ON cc.chklst_component_id = tc.chklst_component_id AND tc.task_dtl_id = $2
        INNER JOIN public.component c ON c.component_id = cc.base_component_id AND c.component_name = $3));`,[postInputField1Value, postTaskDtlId, "inputField1"]);
        queryArray.push(inputField1Query);
    }
    if(postInputField2Value != "default") {
        var inputField2Query = t.none(`UPDATE public.task_component_property SET property_value = $1 WHERE property_type = 'input' AND property_name = 'value' 
        AND task_component_property_id = 
        (SELECT tcp.task_component_property_id FROM public.task_component_property tcp
        INNER JOIN public.task_composite_component_mapping tccm ON tcp.task_component_id = tccm.task_child_component_id AND tcp.property_type='input' 
        AND tcp.property_name = 'value' AND tccm.task_component_id = 
        (SELECT tc.task_component_id FROM public.task_component tc
        INNER JOIN public.chklst_component cc ON cc.chklst_component_id = tc.chklst_component_id AND tc.task_dtl_id = $2
        INNER JOIN public.component c ON c.component_id = cc.base_component_id AND c.component_name = $3));`,[postInputField2Value, postTaskDtlId, "inputField2"]);
        queryArray.push(inputField2Query);
    }
    if(postCommentValue != "default") {
        var commentQuery = t.none(`UPDATE public.task_component_property SET property_value = $1 WHERE property_type = 'input' AND property_name = 'value' 
        AND task_component_property_id = 
        (SELECT tcp.task_component_property_id FROM public.task_component_property tcp
        INNER JOIN public.task_composite_component_mapping tccm ON tcp.task_component_id = tccm.task_child_component_id AND tcp.property_type='input' 
        AND tcp.property_name = 'value' AND tccm.task_component_id = 
        (SELECT tc.task_component_id FROM public.task_component tc
        INNER JOIN public.chklst_component cc ON cc.chklst_component_id = tc.chklst_component_id AND tc.task_dtl_id = $2
        INNER JOIN public.component c ON c.component_id = cc.base_component_id AND c.component_name = $3));`,[postCommentValue, postTaskDtlId, "comment"]);
        queryArray.push(commentQuery);
    }
    if(postJudgementValue != "default") {
        var judgementQuery =  t.none(`UPDATE public.task_component_property SET property_value = $1 WHERE property_type = 'input' AND property_name = 'value' 
        AND task_component_property_id = 
        (SELECT tcp.task_component_property_id FROM public.task_component_property tcp
        INNER JOIN public.task_composite_component_mapping tccm ON tcp.task_component_id = tccm.task_child_component_id AND tcp.property_type='input' 
        AND tcp.property_name = 'value' AND tccm.task_component_id = 
        (SELECT tc.task_component_id FROM public.task_component tc
        INNER JOIN public.chklst_component cc ON cc.chklst_component_id = tc.chklst_component_id AND tc.task_dtl_id = $2
        INNER JOIN public.component c ON c.component_id = cc.base_component_id AND c.component_name = $3));`,[postJudgementValue, postTaskDtlId, "judgement"]);
        queryArray.push(judgementQuery);
    }
    var taskDtlQuery = t.none(`UPDATE public.task_dtl SET status_code = 90, updated_dttm = CURRENT_TIMESTAMP WHERE task_dtl_id = $1;`,[postTaskDtlId]);
    queryArray.push(taskDtlQuery);

    return queryArray;
}

function updateTaskRecords(componentName, componentValue, postTaskDtlId) {

    db.none(`UPDATE public.task_component_property SET property_value = $1 WHERE property_type = 'input' AND property_name = 'value' 
    AND task_component_property_id = 
    (SELECT tcp.task_component_property_id FROM public.task_component_property tcp
    INNER JOIN public.task_composite_component_mapping tccm ON tcp.task_component_id = tccm.task_child_component_id AND tcp.property_type='input' 
    AND tcp.property_name = 'value' AND tccm.task_component_id = 
    (SELECT tc.task_component_id FROM public.task_component tc
    INNER JOIN public.chklst_component cc ON cc.chklst_component_id = tc.chklst_component_id AND tc.task_dtl_id = $2
    INNER JOIN public.component c ON c.component_id = cc.base_component_id AND c.component_name = $3));`, [componentValue, postTaskDtlId, componentName])
    .then((data) => {
        console.log("Updated task_component_property: Component Name: " + componentName + " Component Value: " + componentValue);
    }).catch(error => {
        console.log(error);
    });
}

function insertTaskRecords(pgp) {
    console.log("inside insertTaskRecords");
    return pgp.one(`INSERT INTO public.task_dtl(task_id, task_seq_nbr, status_code, chklst_dtl_id, created_dttm, updated_dttm) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING task_dtl_id;`, [taskId, chklstSeqNbr, 0, chklstDtlId])
    .then((data) => {
        taskDtlId = data.task_dtl_id;
        return pgp.batch([
            pgp.none(`INSERT INTO public.task_component(task_dtl_id, chklst_component_id, composite_component, created_dttm, updated_dttm) 
            SELECT td.task_dtl_id, cc.chklst_component_id, cc.composite_component, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM public.task_dtl td INNER JOIN public.chklst_component cc ON td.chklst_dtl_id = cc.chklst_dtl_id AND td.task_dtl_id = $1;`, [data.task_dtl_id]),
            pgp.none(`INSERT INTO public.task_composite_component_mapping(task_component_id, task_child_component_id, created_dttm, updated_dttm)
            SELECT tc1.task_component_id, tc2.task_component_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
            FROM public.task_component tc1 
            INNER JOIN public.task_component tc2
            ON tc2.chklst_component_id IN 
            (SELECT cccm.chklst_child_component_id FROM public.chklst_composite_component_mapping cccm WHERE tc1.chklst_component_id = cccm.chklst_component_id)
            AND tc1.task_dtl_id = $1
            AND tc2.task_dtl_id = $1
            AND tc1.composite_component = 'Y';`, [data.task_dtl_id]),
            pgp.none(`INSERT INTO public.task_component_property(task_component_id, property_name, property_value, property_type, created_dttm, updated_dttm)
            SELECT tc.task_component_id, ccp.property_name, ccp.property_value, ccp.property_type, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
            FROM public.task_component tc
            INNER JOIN public.chklst_component_property ccp
            ON tc.chklst_component_id = ccp.chklst_component_id
            AND tc.task_dtl_id = $1;`, [data.task_dtl_id])
        ]);
    });

}


function getWorkInstructionDetails(pgp) {

    const v = q => pgp.any(`SELECT co.component_name, ccp.property_name, ccp.property_value, ccp.property_type
    FROM public.chklst_hdr ch
    INNER JOIN public.chklst_dtl cd 
    ON ch.chklst_id = cd.chklst_id AND cd.chklst_id = $1 AND cd.chklst_seq_nbr = $2
    INNER JOIN public.chklst_component cc
    ON cd.chklst_dtl_id = cc.chklst_dtl_id
    INNER JOIN public.component co
    ON co.component_id = cc.base_component_id
    INNER JOIN public.chklst_composite_component_mapping cccm
    ON cc.chklst_component_id = cccm.chklst_component_id
    INNER JOIN public.chklst_component_property ccp
    ON ccp.chklst_component_id = cccm.chklst_child_component_id AND ccp.property_type = 'display' 
    ORDER BY 
        CASE co.component_name
            WHEN 'img' THEN 1
            WHEN 'inputField1' THEN 2
            WHEN 'inputField2' THEN 3
            WHEN 'comment' THEN 4
            WHEN 'capture' THEN 5
            WHEN 'judgement' THEN 6
            END, ccp.property_name;`,[q.chklst_id, q.chklst_seq_nbr])
    .then(workInstructions => {
        q.workInstructions = workInstructions;
        return q;
    });

    return pgp.map(`SELECT ch.chklst_id, ch.chklst_name, ch.station_name, ch.total_no_instruction, 
    cd.chklst_seq_nbr, cd.chklst_dtl_id, cd.process_name, cd.check_location, cd.check_details
    FROM public.chklst_hdr ch 
    INNER JOIN public.chklst_dtl cd
    ON ch.chklst_id = cd.chklst_id
    AND ch.chklst_id = $1 AND cd.chklst_seq_nbr = $2;`, [chklstId,chklstSeqNbr], v).then(a => pgp.batch(a));

};

function getWorkInstructionDetailsCompleted(pgp) {

};