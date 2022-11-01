const nextFormSubmissionButton = document.getElementById("nextFormSubmission");

function handleNextFormSubmission() {
    console.log("Inside handleNextFormSubmission");
    if(document.getElementById("input-field1-input") != null) {
        console.log("hidden-" + document.getElementById("posthiddenInputField1Value"));
        console.log("inoutfield1-" + document.getElementById("input-field1-input"));
        document.getElementById("posthiddenInputField1Value").value = document.getElementById("input-field1-input").value;
        console.log("Input Field 1 value- " + document.getElementById("posthiddenInputField1Value").value);
    }
    if(document.getElementById("input-field2-input") != null) {
        document.getElementById("posthiddenInputField2Value").value = document.getElementById("input-field2-input").value;
    }
    if(document.getElementById("comment-input") != null) {
        document.getElementById("posthiddenCommentValue").value = document.getElementById("comment-input").value;
    }

};

function handleOKButtonClick() {
    const okJudgementButton = document.getElementById("judgement-ok-button");
    okJudgementButton.style.backgroundColor = "green";
    const ngJudgementButton = document.getElementById("judgement-ng-button");
    if(ngJudgementButton.style.backgroundColor === "red") {
        ngJudgementButton.style.backgroundColor = "";
    }
    document.getElementById("posthiddenJudgementButtonValue").value = "OK";
    //console.log(document.getElementById("hiddenJudgementButtonValue").value);
};

function handleNGButtonClick() {
    const okJudgementButton = document.getElementById("judgement-ok-button");
    const ngJudgementButton = document.getElementById("judgement-ng-button");
    ngJudgementButton.style.backgroundColor = "red";
    if(okJudgementButton.style.backgroundColor === "green") {
        okJudgementButton.style.backgroundColor = "";
    }
    document.getElementById("posthiddenJudgementButtonValue").value = "NG";
    //console.log(document.getElementById("hiddenJudgementButtonValue").value);
};