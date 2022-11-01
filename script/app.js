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

inputFieldComponentObj.componentObj.style.backgroundColor="white";
inputFieldComponentObj.componentObj.style.backgroundImage="url('../static/InputFieldImage.svg')";
inputFieldComponentObj.componentObj.style.backgroundRepeat="no-repeat";
inputFieldComponentObj.componentObj.style.backgroundPosition="center";

imageComponentObj.componentObj.style.backgroundColor="white";
imageComponentObj.componentObj.style.backgroundImage="url('../static/ImageUpload.png')";
imageComponentObj.componentObj.style.backgroundRepeat="no-repeat";
imageComponentObj.componentObj.style.backgroundPosition="center";

judgementComponentObj.componentObj.style.backgroundColor="white";
judgementComponentObj.componentObj.style.backgroundImage="url('../static/Judgement.png')";
judgementComponentObj.componentObj.style.backgroundRepeat="no-repeat";
judgementComponentObj.componentObj.style.backgroundPosition="center";

commentComponentObj.componentObj.style.backgroundColor="white";
commentComponentObj.componentObj.style.backgroundImage="url('../static/Comment.png')";
commentComponentObj.componentObj.style.backgroundRepeat="no-repeat";
commentComponentObj.componentObj.style.backgroundPosition="center";


const addWorkInstructionButton = document.getElementById("add-work-instruction");
addWorkInstructionButton.addEventListener("click", function() {
    checklistContainerObj.addWorkInstruction();
});

//const createJSONObj = new CreateJSON(checklistContainerObj.templateName, checklistContainerObj.stationName, checklistContainerObj.totalNoOfInstruction);
//console.log(createJSONObj.jsonText);
let createJSONObj = null;

const publishButton = document.getElementById("publish-button");

publishButton.addEventListener("click", function() {
    let totalInstruction = checklistContainerObj.totalNoOfInstruction;
    createJSONObj = new CreateJSON(checklistContainerObj.templateName, checklistContainerObj.stationName, totalInstruction);
    console.log(createJSONObj.jsonText);
    let finalJSON = JSON.parse(createJSONObj.jsonText);

    try {
        const ourRequest = $.ajax({
            method: "POST",
            url: "http://localhost:3000/admin/adminPanel",
            contentType: "application/json",
            data: JSON.stringify(finalJSON)

        });
        ourRequest.then((response) => {
            console.log(response);
        })
    } catch (err) { console.error("err"); }

    console.log(finalJSON);
    alert("Completed");
});

