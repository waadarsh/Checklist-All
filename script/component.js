class Component {

    componentObj;

    constructor(componentType) {
        this.componentObj = document.createElement("div");
        this.componentObj.setAttribute("draggable", "true");
        
        let componentPanelContainer = document.querySelector(".component-panel-container");
        componentPanelContainer.appendChild(this.componentObj);
        this.componentObj.classList.add("components");
        this.componentObj.textContent = componentType;  
    }

    handleDragStart(Event) {
        this.componentObj.style.opacity = 0.4;
        Event.dataTransfer.effectAllowed = "move";
        Event.dataTransfer.setData("text/plain", this.componentObj.innerHTML);
        //console.log(this.componentObj.innerHTML);
    }

    handleDragEnd(Event) {
        this.componentObj.style.opacity = 1;
        let imageContainers = document.querySelectorAll(".image-container");
        let commentContainers = document.querySelectorAll(".comment-container");
        let inputField1Containers = document.querySelectorAll(".input-field1-container");
        let inputField2Containers = document.querySelectorAll(".input-field2-container");
        let judgementContainers = document.querySelectorAll(".judgement-container");
        
        
        imageContainers.forEach((imageContainer) => {
            imageContainer.classList.remove("over");
        });
        commentContainers.forEach((commentContainer) => {
            commentContainer.classList.remove("over");
        })
        inputField1Containers.forEach((inputField1Container) => {
            inputField1Container.classList.remove("over");
        });
        inputField2Containers.forEach((inputField2Container) => {
            inputField2Container.classList.remove("over");
        });
        judgementContainers.forEach((judgementContainer) => {
            judgementContainer.classList.remove("over");
        })
        
    }

    handleDragEnter(Event) {
        let componentText = Event.target.textContent;
        let inputField1Containers = document.querySelectorAll(".input-field1-container");
        let inputField2Containers = document.querySelectorAll(".input-field2-container");
        let imageContainers = document.querySelectorAll(".image-container");
        let judgementContainers = document.querySelectorAll(".judgement-container");
        let commentContainers = document.querySelectorAll(".comment-container");
        //console.log(inputField1Component.length);
        //console.log(inputField2Component);

        if(componentText === "Input Field") {
            if(inputField1Containers.length > 0) {
                inputField1Containers.forEach((inputField1Container) => {
                    if(inputField1Container.children.length === 0) {
                        inputField1Container.classList.add("over");
                    }
                });
            }
            if(inputField2Containers.length > 0) {
                inputField2Containers.forEach((inputField2Container) => {
                    if(inputField2Container.children.length === 0) {
                        inputField2Container.classList.add("over");
                    }
                });
            }
        }

        else if(componentText === "Image") {
            if(imageContainers.length > 0) {
                imageContainers.forEach((imageContainer) => {
                    if(imageContainer.children.length === 0) {
                        imageContainer.classList.add("over");
                    }
                });
            }
        }

        else if(componentText === "Judgement") {
            if(judgementContainers.length > 0) {
                judgementContainers.forEach((judgementContainer) => {
                    if(judgementContainer.children.length === 0) {
                        judgementContainer.classList.add("over");
                    }
                });
            }
        }

        else if(componentText === "Comment") {
            if(commentContainers.length > 0) {
                commentContainers.forEach((commentContainers) => {
                    if(commentContainers.children.length === 0) {
                        commentContainers.classList.add("over");
                    }
                });
            }
        }

    }

}

export {Component};