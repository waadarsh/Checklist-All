import {ChecklistContainer} from './checklistContainer.js';
import {Component} from './component.js';
import {CreateJSON} from './createjson.js';

const checklistContainerObj = new ChecklistContainer();
const inputFieldComponentObj = new Component("Input Field");
const imageComponentObj = new Component("Image");
const judgementComponentObj = new Component("Judgement");
const commentComponentObj = new Component("Comment");

inputFieldComponentObj.componentObj.addEventListener("dragstart", function(Event) {
    inputFieldComponentObj.handleDragStart(Event);
});
inputFieldComponentObj.componentObj.addEventListener("dragend", function(Event) {
    inputFieldComponentObj.handleDragEnd(Event);
});
inputFieldComponentObj.componentObj.addEventListener("dragenter", function(Event) {
    inputFieldComponentObj.handleDragEnter(Event);
});

imageComponentObj.componentObj.addEventListener("dragstart", function(Event) {
    imageComponentObj.handleDragStart(Event);
});
imageComponentObj.componentObj.addEventListener("dragend", function(Event) {
    imageComponentObj.handleDragEnd(Event);
});
imageComponentObj.componentObj.addEventListener("dragenter", function(Event) {
    imageComponentObj.handleDragEnter(Event);
});

judgementComponentObj.componentObj.addEventListener("dragstart", function(Event) {
    judgementComponentObj.handleDragStart(Event);
});
judgementComponentObj.componentObj.addEventListener("dragend", function(Event) {
    judgementComponentObj.handleDragEnd(Event);
});
judgementComponentObj.componentObj.addEventListener("dragenter", function(Event) {
    judgementComponentObj.handleDragEnter(Event);
});

commentComponentObj.componentObj.addEventListener("dragstart", function(Event) {
    commentComponentObj.handleDragStart(Event);
});
commentComponentObj.componentObj.addEventListener("dragend", function(Event) {
    commentComponentObj.handleDragEnd(Event);
});
commentComponentObj.componentObj.addEventListener("dragenter", function(Event) {
    commentComponentObj.handleDragEnter(Event);
});

// inputFieldComponentObj.componentObj.style.backgroundColor="white";
// inputFieldComponentObj.componentObj.style.backgroundImage="url('../static/InputFieldImage.svg')";
// inputFieldComponentObj.componentObj.style.backgroundRepeat="no-repeat";
// inputFieldComponentObj.componentObj.style.backgroundPosition="center";


// imageComponentObj.componentObj.style.backgroundColor="white";
// imageComponentObj.componentObj.style.backgroundImage="url('../static/ImageUpload.png')";
// imageComponentObj.componentObj.style.backgroundRepeat="no-repeat";
// imageComponentObj.componentObj.style.backgroundPosition="center";


// judgementComponentObj.componentObj.style.backgroundColor="white";
// judgementComponentObj.componentObj.style.backgroundImage="url('../static/Judgement.png')";
// judgementComponentObj.componentObj.style.backgroundRepeat="no-repeat";
// judgementComponentObj.componentObj.style.backgroundPosition="center";


// commentComponentObj.componentObj.style.backgroundColor="white";
// commentComponentObj.componentObj.style.backgroundImage="url('../static/Comment.png')";
// commentComponentObj.componentObj.style.backgroundRepeat="no-repeat";
// commentComponentObj.componentObj.style.backgroundPosition="center";

// inputFieldComponentObj.componentObj.style.backgroundColor="white";
inputFieldComponentObj.componentObj.style.backgroundImage="url('../static/Input Field icon.png')";
inputFieldComponentObj.componentObj.style.backgroundRepeat="no-repeat";
inputFieldComponentObj.componentObj.style.backgroundPosition="center";
inputFieldComponentObj.componentObj.style.paddingTop="30%";
inputFieldComponentObj.componentObj.style.width="40%";
inputFieldComponentObj.componentObj.style.textAlign="center";
inputFieldComponentObj.componentObj.style.float="left";


// imageComponentObj.componentObj.style.backgroundColor="white";
imageComponentObj.componentObj.style.backgroundImage="url('../static/Image upload icon.png')";
imageComponentObj.componentObj.style.backgroundRepeat="no-repeat";
imageComponentObj.componentObj.style.backgroundPosition="center";
imageComponentObj.componentObj.style.paddingTop="30%";
imageComponentObj.componentObj.style.width="40%";
imageComponentObj.componentObj.style.textAlign="center";
imageComponentObj.componentObj.style.float="left";

// judgementComponentObj.componentObj.style.backgroundColor="white";
judgementComponentObj.componentObj.style.backgroundImage="url('../static/Judgement icon.png')";
judgementComponentObj.componentObj.style.backgroundRepeat="no-repeat";
judgementComponentObj.componentObj.style.backgroundPosition="center";
judgementComponentObj.componentObj.style.paddingTop="30%";
judgementComponentObj.componentObj.style.width="40%";
judgementComponentObj.componentObj.style.textAlign="center";
judgementComponentObj.componentObj.style.float="left";

// commentComponentObj.componentObj.style.backgroundColor="white";
commentComponentObj.componentObj.style.backgroundImage="url('../static/Comment icon.png')";
commentComponentObj.componentObj.style.backgroundRepeat="no-repeat";
commentComponentObj.componentObj.style.backgroundPosition="center";
commentComponentObj.componentObj.style.paddingTop="30%";
commentComponentObj.componentObj.style.width="40%";
commentComponentObj.componentObj.style.textAlign="center";
commentComponentObj.componentObj.style.float="left";

const addWorkInstructionButton = document.getElementById("add-work-instruction");
addWorkInstructionButton.addEventListener("click", function() {
    checklistContainerObj.addWorkInstruction();
});

//const createJSONObj = new CreateJSON(checklistContainerObj.templateName, checklistContainerObj.stationName, checklistContainerObj.totalNoOfInstruction);
//console.log(createJSONObj.jsonText);
let createJSONObj = null;

const publishButton = document.getElementById("publish-button");

// publishButton.addEventListener("click", function() {
//     let totalInstruction = checklistContainerObj.totalNoOfInstruction;
//     createJSONObj = new CreateJSON(checklistContainerObj.templateName, checklistContainerObj.stationName, totalInstruction);
//     console.log(createJSONObj.jsonText);
//     let finalJSON = JSON.parse(createJSONObj.jsonText);

//     try {
//         const ourRequest = $.ajax({
//             method: "POST",
//             url: "http://localhost:3000/admin/adminPanel",
//             contentType: "application/json",
//             data: JSON.stringify(finalJSON)

//         });
//         ourRequest.then((response) => {
//             console.log(response);
//         })
//     } catch (err) { console.error("err"); }

//     console.log(finalJSON);
// });

var form = document.getElementById('frm');
form.onsubmit = function (event) {

    var xhr = new XMLHttpRequest();
    let totalInstruction = checklistContainerObj.totalNoOfInstruction;
    createJSONObj = new CreateJSON(checklistContainerObj.templateName, checklistContainerObj.stationName, totalInstruction);
    console.log(createJSONObj.jsonText);
    let finalJSON = JSON.parse(createJSONObj.jsonText);

    xhr.open('POST',"http://localhost:3000/admin/adminPanel")
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (this.status === 200) {
            // console.log(this.responseText)
            document.getElementById('det').innerHTML = this.responseText;
        }
        else {
            console.log("Some error occurred")
        }
    }
    xhr.send(JSON.stringify(finalJSON));
    // window.alert('Succesfully Updated');
    // window.location.href='./ic.html';
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            form.reset(); //reset form after AJAX success or do something else
        }
    }
    //Fail the onsubmit to avoid page refresh.
    return false; 
}
