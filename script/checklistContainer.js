class ChecklistContainer {
    templateName;
    stationName;
    index;
    totalNoOfInstruction;

    constructor() {
        this.checklistContainer = document.querySelector(".checklist-container");
        this.templateName = document.querySelector(".checklist-name-input").value;
        this.stationName = document.querySelector(".station-name-input").value;
        this.index = 0;
        this.totalNoOfInstruction = 1;
        this.createWorkInstructionContainer();
        //console.log(this.templateName);
        //console.log(this.stationName);
    }

    createWorkInstructionContainer() {
        const workInstructionContainer = document.createElement("div");
        workInstructionContainer.setAttribute("id", "workInstructionContainer" + this.index);
        workInstructionContainer.classList.add("work-instruction-container");
        this.checklistContainer.appendChild(workInstructionContainer);
        //console.log(workInstructionContainer);
        //this.totalNoOfInstruction = this.totalNoOfInstruction + 1;
        // const onScrolling = document.createElement("div");
        // onScrolling.setAttribute("id","onScroll"+this.index );
        // workInstructionContainer.appendChild("onScrolling");

        this.createProcessHeaderContainer();
    }

    createProcessHeaderContainer() {
        const processHeaderContainer = document.createElement("div");
        processHeaderContainer.setAttribute("id", "processHeaderContainer" + this.index);
        const workInstructionContainer = document.getElementById("workInstructionContainer" + this.index);
        workInstructionContainer.appendChild(processHeaderContainer);
        processHeaderContainer.classList.add("process-header-container");

        this.createProcessNameContainer();
    }

    createProcessNameContainer() {
        const processNameContainer = document.createElement("div");
        processNameContainer.setAttribute("id", "processNameContainer" + this.index);
        const processHeaderContainer = document.getElementById("processHeaderContainer" + this.index);
        processHeaderContainer.appendChild(processNameContainer);
        processNameContainer.classList.add("process-name-container");

        const label = document.createElement("label");
        label.setAttribute("id", "processNameInputLabel" + this.index);
        label.setAttribute("for", "processNameInput" + this.index);
        label.textContent = "PROCESS NAME";
        label.classList.add("process-name-container");
        processNameContainer.appendChild(label);

        const input = document.createElement("input");
        input.setAttribute("id", "processNameInput" + this.index);
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "  Type here");
        input.classList.add("process-name-input");
        //input.value = "   Type here";
        processNameContainer.appendChild(input);

        this.createCheckLocationContainer();
    }

    createCheckLocationContainer() {
        const checkLocationContainer = document.createElement("div");
        checkLocationContainer.setAttribute("id", "checkLocationContainer" + this.index);
        const processHeaderContainer = document.getElementById("processHeaderContainer" + this.index);
        processHeaderContainer.appendChild(checkLocationContainer);
        checkLocationContainer.classList.add("check-location-container");

        const label = document.createElement("label");
        label.setAttribute("id", "checkLocationInputLabel" + this.index);
        label.setAttribute("style", "margin-left:0%");
        label.setAttribute("for", "checkLocationInput" + this.index);
        label.textContent = "CHECK LOCATION";
        label.classList.add("check-location-container");
        checkLocationContainer.appendChild(label);

        const input = document.createElement("input");
        input.setAttribute("id", "checkLocationInput" + this.index);
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "  Type Here")
        input.classList.add("check-location-input");
        //input.value = "   Type here";
        checkLocationContainer.appendChild(input);

        this.createInstructionNoContainer();
    }

    createInstructionNoContainer() {
        const instructionNoContainer = document.createElement("div");
        instructionNoContainer.setAttribute("id", "instructionNoContainer" + this.index);
        const processHeaderContainer = document.getElementById("processHeaderContainer" + this.index);
        processHeaderContainer.appendChild(instructionNoContainer);
        instructionNoContainer.classList.add("instruction-no-container");

        const currentInstruction = document.createElement("b");
        currentInstruction.setAttribute("id", "currentInstruction" + this.index);
        currentInstruction.textContent = this.index + 1;
        instructionNoContainer.appendChild(currentInstruction);
        currentInstruction.classList.add("current-instruction");

        const divisionSymbol = document.createElement("b");
        divisionSymbol.setAttribute("id", "divisionSymbol" + this.index);
        divisionSymbol.textContent = "/";
        instructionNoContainer.appendChild(divisionSymbol);

        const totalInstruction = document.createElement("b");
        totalInstruction.setAttribute("id", "totalInstruction" + this.index);
        totalInstruction.textContent = this.totalNoOfInstruction;
        instructionNoContainer.appendChild(totalInstruction);
        totalInstruction.classList.add("total-instructions");

        this.createCheckDetailsContainer();
    }

    createCheckDetailsContainer() {
        const checkDetailsContainer = document.createElement("div");
        checkDetailsContainer.setAttribute("id", "checkDetailsContainer" + this.index);
        const workInstructionContainer = document.getElementById("workInstructionContainer" + this.index);
        workInstructionContainer.appendChild(checkDetailsContainer);
        checkDetailsContainer.classList.add("check-details-container");

        const label = document.createElement("label");
        label.setAttribute("id", "checkDetailsInputLabel" + this.index);
        label.setAttribute("for", "checkDetailsInput" + this.index);
        label.textContent = "CHECK DETAILS";
        label.classList.add("check-details-input");
        checkDetailsContainer.appendChild(label);

        const input = document.createElement("input");
        input.setAttribute("id", "checkDetailsInput" + this.index);
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "  Type here");
        input.classList.add("check-details-input");
        //input.value = "   Type here";
        checkDetailsContainer.appendChild(input);
        this.createWorkAreaContainer();
    }

    createWorkAreaContainer() {
        const workAreaContainer = document.createElement("div");
        workAreaContainer.setAttribute("id", "workAreaContainer" + this.index);
        const workInstructionContainer = document.getElementById("workInstructionContainer" + this.index);
        workInstructionContainer.appendChild(workAreaContainer);
        workAreaContainer.classList.add("work-area-container");

        const imageContainer = document.createElement("div");
        imageContainer.setAttribute("id", "imageContainer" + this.index);
        workAreaContainer.appendChild(imageContainer);
        imageContainer.classList.add("image-container");
        imageContainer.addEventListener("dragover", (Event) => {
            this.handleDragOver(Event);
        });
        imageContainer.addEventListener("drop", (Event) => {
            this.handleImageDrop(Event);
        });

        const inputFieldContainer = document.createElement("div");
        inputFieldContainer.setAttribute("id", "inputFieldContainer" + this.index);
        workAreaContainer.appendChild(inputFieldContainer);
        inputFieldContainer.classList.add("input-field-container");

        const inputField1Container = document.createElement("div");
        inputField1Container.setAttribute("id", "inputField1Container" + this.index);
        inputFieldContainer.appendChild(inputField1Container);
        inputField1Container.classList.add("input-field1-container");
        inputField1Container.addEventListener("dragover", (Event) => {
            this.handleDragOver(Event);
        });
        inputField1Container.addEventListener("drop", (Event) => {
            this.handleInputField1Drop(Event);
        });

        const inputField2Container = document.createElement("div");
        inputField2Container.setAttribute("id", "inputField2Container" + this.index);
        inputFieldContainer.appendChild(inputField2Container);
        inputField2Container.classList.add("input-field2-container");
        inputField2Container.addEventListener("dragover", (Event) => {
            this.handleDragOver(Event);
        });
        inputField2Container.addEventListener("drop", (Event) => {
            this.handleInputField2Drop(Event);
        });

        const judgementContainer = document.createElement("div");
        judgementContainer.setAttribute("id", "judgementContainer" + this.index);
        inputFieldContainer.appendChild(judgementContainer);
        judgementContainer.classList.add("judgement-container");
        judgementContainer.addEventListener("dragover", (Event) => {
            this.handleDragOver(Event);
        });
        judgementContainer.addEventListener("drop", (Event) => {
            this.handleJudgementDrop(Event);
        });

        const commentContainer = document.createElement("div");
        commentContainer.setAttribute("id", "commentContainer" + this.index);
        workAreaContainer.appendChild(commentContainer);
        commentContainer.classList.add("comment-container");
        commentContainer.addEventListener("dragover", (Event) => {
            this.handleDragOver(Event);
        });
        commentContainer.addEventListener("drop", (Event) => {
            this.handleCommentDrop(Event);
        });

        //this.incrementChecklistCounter();
    }


    incrementChecklistCounter() {
        this.totalNoOfInstruction += 1;
        this.index += 1;
    }

    updateTotalInstruction() {
        let currentIndex = this.index;
        //console.log(currentIndex);
        let totalInstructionContainer = null;
        for (let i = 0; i < currentIndex; i++) {
            totalInstructionContainer = document.getElementById("totalInstruction" + i.toString());
            //console.log(totalInstructionContainer.textContent);
            totalInstructionContainer.textContent = this.totalNoOfInstruction;
            //console.log(totalInstructionContainer.textContent);
        }
    }

    addWorkInstruction() {
        this.incrementChecklistCounter();
        this.createWorkInstructionContainer();
        this.updateTotalInstruction();
    }

    getCurrentIndex(containerName) {
        let revContainerName = containerName.split('').reverse().join('');
        //console.log(revContainerName);
        let revStr = [];
        //console.log(typeof(revContainerName[0]));
        for (let i = 0; i < revContainerName.length; i++) {
            if (revContainerName[i].match(/[0-9]/) === null) { break; }
            revStr.push(revContainerName[i]);
        }
        //console.log(revStr.toString());
        let finalStr = revStr.toString().split('').reverse().join('');
        return finalStr;
    }

    handleDragOver(Event) {
        Event.preventDefault();
        //console.log(Event);
    }

    handleImageDrop(Event) {
        Event.stopPropagation();
        let sourceElement = Event.dataTransfer.getData("text");
        let imageContainerText = Event.target.id.toString();
        let index = this.getCurrentIndex(imageContainerText);
        let imageComponent = document.getElementById("imageComponent" + index);
        let imageContainer = document.getElementById("imageContainer" + index);

        if ((sourceElement === "Image") && (imageComponent === null)) {
            const div = document.createElement("div");
            div.setAttribute("id", "imageComponent" + index);
            div.classList.add("image-component");

            /*const button = document.createElement("button");
            button.setAttribute("id", "button" + index);
            button.classList.add("button-input");
            button.addEventListener('click', function () {
                input.click();
                button.style.display = "none";
                display_image.style.display = "block";
            })*/

            const display_image = document.createElement("img");
            display_image.classList.add("display-image");
            display_image.setAttribute("id", "display_image" + index);
            //display_image.setAttribute("src","Upload.png");
            //display_image.style.display = "none";
            display_image.addEventListener('click', function () {
                input.click();
            })

            const input = document.createElement("input");
            input.type = "file";
            input.setAttribute("id", "input" + index);
            input.style.display = "none";
            input.addEventListener('change', function () {

                const file = input.files[0];
                const reader = new FileReader();

                reader.addEventListener("load", (e) => {
                    const imageString = reader.result;
                    const imgInput = document.createElement("input");
                    imgInput.setAttribute('id','imgInput'+index);
                    imgInput.setAttribute('style', 'display: none');
                    imgInput.setAttribute('value',imageString);
                    div.appendChild(imgInput);
                    
                })
                reader.readAsDataURL(file);
                var url = URL.createObjectURL(input.files[0]);
                display_image.src = url;
            })


            div.appendChild(display_image);
            //div.appendChild(button);
            //button.appendChild(input);
            Event.target.appendChild(div);
            imageContainer.classList.remove("over");

        }
    }

    handleCommentDrop(Event) {
        Event.stopPropagation();
        let sourceElement = Event.dataTransfer.getData("text");
        let commentContainerText = Event.target.id.toString();
        let index = this.getCurrentIndex(commentContainerText);
        let commentComponent = document.getElementById("commentComponent" + index);
        let commentContainer = document.getElementById("commentContainer" + index);

        if ((sourceElement === "Comment") && (commentComponent === null)) {
            const div = document.createElement("div");
            div.setAttribute("id", "commentComponent" + index);
            div.classList.add("comment-component");

            const label = document.createElement("label");
            label.setAttribute("id", "commentLabel" + index);
            label.innerHTML = "Comment";
            div.appendChild(label);

            const input = document.createElement("textarea");
            input.setAttribute("id", "commentInput" + index);
            // input.setAttribute("style", "margin-left:10px");
            input.classList.add("commentInputBox");
            input.disabled = true;
            div.appendChild(input);

            //div.appendChild(button);
            //button.appendChild(input);
            Event.target.appendChild(div);
            commentContainer.classList.remove("over");

        }
    }


    handleInputField1Drop(Event) {
        Event.stopPropagation();
        let sourceElement = Event.dataTransfer.getData("text");
        let inputField1ContainerText = Event.target.id.toString();
        let index = this.getCurrentIndex(inputField1ContainerText);
        let inputField1Component = document.getElementById("inputField1Component" + index);
        let inputField1Container = document.getElementById("inputField1Container" + index);

        if (sourceElement === "Input Field") {
            if (inputField1Component === null) {
                const div = document.createElement("div");
                // // div.classList.add("hover-div");
                // // div.setAttribute("draggable", "true");
                div.setAttribute("id", "inputField1Component" + index);
                const label = document.createElement("p");
                label.setAttribute("id", "inputField1Label" + index);
                label.innerHTML = "MC";
                label.setAttribute("style", "margin:5%");
                label.style.width = "10ch";
                div.appendChild(label);
                const input = document.createElement("input");
                input.setAttribute("id", "inputField1Input" + index);
                input.setAttribute("type", "text");
                input.setAttribute("style", "margin-left:10px");
                input.style.width = "17ch";
                input.disabled = true;
                div.classList.add("input-field1-component");
                div.appendChild(input);

                if (document.getElementById("delete1" + index) === null) {
                    const del = document.createElement("a");
                    del.setAttribute("id", "delete1" + index);
                    //del.setAttribute("type","button");
                    del.setAttribute("style", 'margin: 2rem');
                    del.innerHTML += '<i class="material-icons">delete</i>';
                    del.setAttribute("style", "display:none");
                    div.appendChild(del);
                    del.onclick = function () {
                        // //const del = document.getElementById("inputField1Container" + index);
                        inputField1Container.innerHTML = '';
                        const x = document.getElementById("edit" + index);
                        x.style.display = "none";
                        x.innerHTML = "";
                    }
                }



                if (document.getElementById("edit1" + index) === null) {
                    var isAlphabet = false;
                    var isNumeric = false;
                    const edit1 = document.createElement("a");
                    edit1.setAttribute("id", "edit1" + index);
                    edit1.innerHTML += '<span class="material-icons">edit</span>';

                    edit1.setAttribute("style", "display:none");
                    div.appendChild(edit1);
                    edit1.onclick = function () {

                        var x = document.createElement("div");
                        x.setAttribute("id", "edit" + index);
                        x.classList.add("edit-panel-container");
                        x.setAttribute("style", "display:block");
                        // x.style.display = "block"
                        const he3 = document.createElement("h3");
                        he3.innerHTML = "<h3>Edit Header</h3>"


                        const inp = document.createElement("input");
                        inp.setAttribute("type", "text");
                        inp.setAttribute("id", "txt" + index);
                        inp.setAttribute("style", "width:80%");
                        const button = document.createElement("a");
                        button.setAttribute("id", "icn" + index);
                        button.setAttribute("style", "margin-left:3%");
                        button.innerHTML += '<span class="material-symbols-outlined">check_circle</span>';
                        button.onclick = function () {
                            x.style.display = "none";
                            var val = document.getElementById("txt" + index).value;
                            label.innerHTML = val;
                            x.innerHTML = "";
                            if (val === "") {
                                alert("Label value cannot be empty");
                                inputField1Container.innerHTML = '';
                            }

                            const y = document.getElementById("edit1" + index);
                            y.style.display = "none";
                            const z = document.getElementById("delete1" + index);
                            z.style.display = "none";
                            document.getElementById("edit" + index).remove();


                        }
                        const inputType = document.createElement("h4");
                        inputType.innerHTML = "<h3>Select Input Type</h3>"

                        const radioBtn1 = document.createElement("input");
                        radioBtn1.setAttribute("id", "radioBtn1" + index);
                        radioBtn1.setAttribute("type", "radio");
                        radioBtn1.setAttribute("style", "width:7%");
                        radioBtn1.onclick = function () {
                            isAlphabet = true;
                            document.getElementById("radioBtn2" + index).disabled = "true";
                            console.log(isAlphabet);
                        }

                        const radiolabel1 = document.createElement('label')
                        radiolabel1.setAttribute("for", radioBtn1);
                        radiolabel1.innerHTML = "Alphabet";

                        const radioBtn2 = document.createElement("input");
                        radioBtn2.setAttribute("id", "radioBtn2" + index);
                        radioBtn2.setAttribute("type", "radio");
                        radioBtn2.setAttribute("style", "width:7%");
                        radioBtn2.onclick = function () {
                            isNumeric = true;
                            document.getElementById("radioBtn1" + index).disabled = "true";
                            console.log(isNumeric);
                        }

                        const radiolabel2 = document.createElement('label')
                        radiolabel2.setAttribute("for", radioBtn2);
                        radiolabel2.innerHTML = "Numeric";

                        x.appendChild(he3);
                        x.appendChild(inp);
                        x.appendChild(button);
                        x.appendChild(inputType);
                        x.appendChild(radioBtn1);
                        x.appendChild(radiolabel1);
                        x.appendChild(radioBtn2);
                        x.appendChild(radiolabel2);

                        div.appendChild(x);

                    }
                }

                div.onmouseenter = function () {
                    mouseEnter();
                }

                div.onmouseleave = function () {
                    mouseLeave();
                }

                function mouseEnter() {
                    console.log(Event.target);

                    // const del = document.createElement("a");
                    // del.setAttribute("id", "delete1");
                    // //del.setAttribute("type","button");
                    // del.setAttribute("style", 'margin: 1rem');
                    // del.innerHTML += '<i class="material-icons">delete</i>';
                    // del.setAttribute("style", "cursor:pointer");
                    // div.appendChild(del);
                    const delonHover = document.getElementById("delete1" + index);
                    delonHover.setAttribute("style", "display:block");
                    delonHover.setAttribute("style", "cursor:pointer");
                    // //console.log(document.getElementById("edit1"+index));
                    // const edit1 = document.createElement("a");
                    // edit1.setAttribute("id", "edit1");
                    // edit1.innerHTML += '<span class="material-icons">edit</span>';
                    // edit1.setAttribute("style", "cursor:pointer");
                    // div.appendChild(edit1);
                    const editonHover = document.getElementById("edit1" + index);
                    editonHover.setAttribute("style", "display:block");
                    editonHover.setAttribute("style", "cursor:pointer");

                    console.log(document.getElementById("edit1" + index).value);
                };

                function mouseLeave() {
                    document.getElementById("delete1" + index).style.display = "none";
                    document.getElementById("edit1" + index).style.display = "none";

                }


                // // const del_div = document.createElement("div");
                // // del_div.classList.add("icon");
                // // const del = document.createElement("button");
                // // del.innerHTML += '<span class="material-icons">delete</span>';
                // // del.onclick = function(){
                // //     //const del = document.getElementById("inputField1Container" + index);
                // //     inputField1Container.innerHTML='';
                // // }
                // // del_div.appendChild(del);
                // // hdiv.appendChild(del_div);

                // // div.addEventListener("dragstart", function(Event) {
                // //     alert(Event.currentTarget.id);
                // //     Event.currentTarget.style.opacity = 0.4;
                // //     Event.dataTransfer.effectAllowed = "move";
                // // });


                Event.target.appendChild(div);
                inputField1Container.classList.remove("over");


                // var click = document.getElementById("edit");
                // if (click != null) {
                //     document.getElementById("present").style.display = "none";
                // }

                // // Event.target.appendChild(input);
                // // console.log(inputField1Container.classList);
                // // console.log(inputField1Container.classList);
                // // comp = document.querySelectorAll(".input-field1-component");
                // // console.log("Component lenght" + comp.length);
            }
        }
    }



    handleInputField2Drop(Event) {
        Event.stopPropagation();
        let sourceElement = Event.dataTransfer.getData("text");
        let inputField2ContainerText = Event.target.id.toString();
        let index = this.getCurrentIndex(inputField2ContainerText);
        let inputField2Component = document.getElementById("inputField2Component" + index);
        let inputField2Container = document.getElementById("inputField2Container" + index);

        if (sourceElement === "Input Field") {
            console.log(inputField2Component);
            if (inputField2Component === null) {
                const div = document.createElement("div");
                div.classList.add("input-field2-component");
                div.setAttribute("id", "inputField2Component" + index);
                const label = document.createElement("p");
                label.setAttribute("id", "inputField2Label" + index);
                label.innerHTML = "QA";
                label.style.width = "10ch";
                label.setAttribute("style", "margin:5%");
                div.appendChild(label);

                const input = document.createElement("input");
                input.setAttribute("id", "inputField2Input" + index);
                input.setAttribute("type", "text");
                input.setAttribute("size", "10rem");
                input.setAttribute("style", "margin-left:5%");
                input.style.width = "17ch";
                input.disabled = true;
                div.appendChild(input);

                if (document.getElementById("delete2" + index) === null) {
                    const del1 = document.createElement("a");
                    del1.setAttribute("id", "delete2" + index);
                    del1.setAttribute("style", 'margin-left: 2rem');
                    del1.innerHTML += '<span class="material-icons">delete</span>';

                    div.appendChild(del1);
                    del1.onclick = function () {
                        // //const del = document.getElementById("inputField1Container" + index);
                        inputField2Container.innerHTML = '';
                        const x = document.getElementById("edit" + index);
                        x.style.display = "none";
                        x.innerHTML = "";
                    }
                }

                if (document.getElementById("edit2" + index) === null) {
                    var isAlphabet = false;
                    var isNumeric = false;
                    const edit2 = document.createElement("a");
                    edit2.setAttribute("id", "edit2" + index);
                    //edit2.setAttribute("style", 'margin-right: 1rem');
                    edit2.setAttribute("style", 'margin: 1rem');
                    edit2.innerHTML += '<span class="material-icons">edit</span>';

                    edit2.setAttribute("style", "display:none");
                    div.appendChild(edit2);
                    edit2.onclick = function () {
                        var x = document.createElement("div");
                        x.setAttribute("id", "edit" + index);
                        x.classList.add("edit-panel-container");
                        x.setAttribute("style", "display:block");
                        const he3 = document.createElement("h3");
                        he3.innerHTML = "<h3>Edit Header</h3>"
                        const inp = document.createElement("input");
                        inp.setAttribute("type", "text");
                        inp.setAttribute("id", "txt" + index);
                        inp.setAttribute("style", "width:80%");
                        const button = document.createElement("a");
                        button.setAttribute("id", "icn" + index);
                        button.setAttribute("style", "margin-left:3%");
                        button.innerHTML += '<span class="material-symbols-outlined">check_circle</span>';
                        button.onclick = function () {
                            x.style.display = "none";
                            var val = document.getElementById("txt" + index).value;
                            label.innerHTML = val;
                            if (val === "") {
                                alert("Label value cannot be empty");
                                inputField2Container.innerHTML = '';
                            }
                            const y = document.getElementById("edit2" + index);
                            y.style.display = "none";
                            const z = document.getElementById("delete2" + index);
                            z.style.display = "none";
                            document.getElementById("edit" + index).remove();
                        }
                        const inputType = document.createElement("h4");
                        inputType.innerHTML = "<h3>Select Input Type</h3>"

                        const radioBtn1 = document.createElement("input");
                        radioBtn1.setAttribute("id", "radioBtn1" + index);
                        radioBtn1.setAttribute("type", "radio");
                        radioBtn1.setAttribute("style", "width:7%");
                        radioBtn1.onclick = function () {
                            isAlphabet = true;
                            document.getElementById("radioBtn2" + index).disabled = "true";
                            console.log(isAlphabet);
                        }

                        const radiolabel1 = document.createElement('label')
                        radiolabel1.setAttribute("for", radioBtn1);
                        radiolabel1.innerHTML = "Alphabet";


                        const radioBtn2 = document.createElement("input");
                        radioBtn2.setAttribute("id", "radioBtn2" + index);
                        radioBtn2.setAttribute("type", "radio");
                        radioBtn2.setAttribute("style", "width:7%");
                        radioBtn2.onclick = function () {
                            isNumeric = true;
                            document.getElementById("radioBtn1" + index).disabled = "true";
                            console.log(isNumeric);
                        }

                        const radiolabel2 = document.createElement('label')
                        radiolabel2.setAttribute("for", radioBtn2);
                        radiolabel2.innerHTML = "Numeric";

                        x.appendChild(he3);
                        x.appendChild(inp);
                        x.appendChild(button);
                        x.appendChild(inputType);
                        x.appendChild(radioBtn1);
                        x.appendChild(radiolabel1);
                        x.appendChild(radioBtn2);
                        x.appendChild(radiolabel2);
                        div.append(x);
                    }
                }

                div.onmouseenter = function () {
                    mouseEnter();
                }

                div.onmouseleave = function () {
                    mouseLeave();
                }

                function mouseEnter() {
                    console.log(Event.target);

                    // const del1 = document.createElement("a");
                    // del1.setAttribute("id", "delete2");
                    // del1.setAttribute("style", 'margin-left: 1rem');
                    // del1.innerHTML += '<span class="material-icons">delete</span>';
                    // del1.setAttribute("style", "cursor:pointer");
                    // div.appendChild(del1);
                    // del1.onclick = function () {
                    //     // //const del = document.getElementById("inputField1Container" + index);
                    //     inputField2Container.innerHTML = '';
                    //     const x = document.getElementById("edit");
                    //     x.style.display = "none";
                    //     x.innerHTML = "";
                    // }
                    const delonHover = document.getElementById("delete2" + index);
                    delonHover.setAttribute("style", "display:block");
                    delonHover.setAttribute("style", "cursor:pointer");


                    // //console.log(document.getElementById("edit2"+index));
                    // const edit2 = document.createElement("a");
                    // edit2.setAttribute("id", "edit2");
                    // //edit2.setAttribute("style", 'margin-right: 1rem');
                    // edit2.setAttribute("style", 'margin: 1rem');
                    // edit2.innerHTML += '<span class="material-icons">edit</span>';
                    // edit2.setAttribute("style", "cursor:pointer");
                    // div.appendChild(edit2);
                    // edit2.onclick = function () {
                    //     var x = document.getElementById("edit");
                    //     x.style.display = "block"
                    //     const he3 = document.createElement("h3");
                    //     he3.innerHTML = "<h3>Edit Label</h3>"
                    //     const inp = document.createElement("input");
                    //     inp.setAttribute("type", "text");
                    //     inp.setAttribute("id", "txt");
                    //     inp.setAttribute("style", "width:80%");
                    //     const button = document.createElement("a");
                    //     button.setAttribute("id", "icn");
                    //     button.setAttribute("style", "margin-left:3%");
                    //     button.innerHTML += '<span class="material-symbols-outlined">check_circle</span>';
                    //     button.onclick = function () {
                    //         x.style.display = "none";
                    //         var val = document.getElementById("txt").value;
                    //         label.innerHTML = val;
                    //         if (val === "") {
                    //             alert("Label value cannot be empty");
                    //             inputField2Container.innerHTML = '';
                    //         }
                    //         x.innerHTML = "";
                    //     }

                    //     if (x.childElementCount > 0) {
                    //         document.getElementById("edit2").style.display = "none";
                    //     }
                    //     x.appendChild(he3);
                    //     x.appendChild(inp);
                    //     x.appendChild(button);
                    // }
                    const editonHover = document.getElementById("edit2" + index);
                    editonHover.setAttribute("style", "display:block");
                    editonHover.setAttribute("style", "cursor:pointer");

                    console.log(document.getElementById("edit2" + index).value);
                };

                function mouseLeave() {
                    document.getElementById("delete2" + index).style.display = "none";
                    document.getElementById("edit2" + index).style.display = "none";

                }

                Event.target.appendChild(div);
                // //Event.target.appendChild(input);
                // //console.log(inputField1Container.classList);
                inputField2Container.classList.remove("over");
                // //console.log(inputField1Container.classList);
                // //comp = document.querySelectorAll(".input-field1-component");
                // //console.log("Component lenght" + comp.length);


                // var click = document.getElementById("edit");
                // if (click != null) {
                //     document.getElementById("present").style.display = "none";
                // }
            }
        }


    }

    handleJudgementDrop(Event) {
        Event.stopPropagation();
        let sourceElement = Event.dataTransfer.getData("text");
        let judgementContainerText = Event.target.id.toString();
        let index = this.getCurrentIndex(judgementContainerText);
        let judgementComponent = document.getElementById("judgementComponent" + index);
        let judgementContainer = document.getElementById("judgementContainer" + index);

        if ((sourceElement === "Judgement") && (judgementComponent === null)) {
            const judgementComponent = document.createElement("div");
            judgementComponent.setAttribute("id", "judgementComponent" + index);
            Event.target.appendChild(judgementComponent);
            judgementComponent.classList.add("judgement-component");
            judgementContainer.classList.remove("over");
            const label = document.createElement("p");
            label.setAttribute("id", "judgementLabel" + index);
            label.textContent = "STATUS";
            label.setAttribute("style", "margin-left:2%");
            judgementComponent.appendChild(label);


            const okButton = document.createElement("button");
            okButton.setAttribute("id", "okButton" + index);
            okButton.innerHTML += '<span class="material-symbols-outlined">check_circle</span>';
            judgementComponent.appendChild(okButton);
            okButton.classList.add("judgement-button");
            okButton.classList.add("judgement-ok-button");
            // okButton.addEventListener("click", function (Event) {
            //     okButton.style.backgroundColor = "green";
            //     ngButton.disabled = "true";
            //     ngButton.style.boxShadow = "false";
            // });
            const ngButton = document.createElement("button");
            ngButton.setAttribute("id", "ngButton" + index);
            ngButton.innerHTML += '<span class="material-symbols-outlined">cancel</span >';
            ngButton.classList.add("judgement-button");
            ngButton.classList.add("judgement-ng-button");
            judgementComponent.appendChild(ngButton);
            // ngButton.addEventListener("click", function (Event) {
            //     ngButton.style.backgroundColor = "red";
            //     okButton.disabled = "true";
            // });
            if (document.getElementById("delete3" + index) === null) {
                const del2 = document.createElement("a");
                del2.setAttribute("id", "delete3" + index);
                del2.setAttribute("style", "float:right");
                del2.innerHTML += '<span class="material-icons">delete</span>';
                judgementComponent.appendChild(del2);
                del2.onclick = function () {
                    // //const del = document.getElementById("inputField1Container" + index);
                    document.getElementById("judgementComponent" + index).remove();
                }
            }


            judgementComponent.onmouseenter = function () {
                mouseEnter();
            }

            judgementComponent.onmouseleave = function () {
                mouseLeave();
            }

            function mouseEnter() {
                const delonHover = document.getElementById("delete3" + index);
                delonHover.setAttribute("style", "display:block");
                delonHover.setAttribute("style", "cursor:pointer");
            }
            function mouseLeave() {
                document.getElementById("delete3" + index).style.display = "none";
            }

        }



    }



}


export { ChecklistContainer };