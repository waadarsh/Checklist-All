const startInspectionButtons = document.querySelectorAll(".checklist-template-panel-button");
//console.log(startInspectionButtons);

startInspectionButtons.forEach(function(startInspectionButton) {
    var buttonId = startInspectionButton.id.toString();
    startInspectionButton.addEventListener("click", async _ => {
        try {
            //console.log("buttonId" + buttonId);
            const response = await fetch("http://localhost:3000/operator/templateList", {
                method:"post",
                body:buttonId
            });
            //console.log("Inside event-" + response);
        }
        catch(err) {
            console.log(err);
        }})
});