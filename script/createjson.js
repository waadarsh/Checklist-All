class CreateJSON {
    
    jsonText;

    constructor(templateName, stationName, totalNoOfInstruction) {
        this.populateChecklistHeader(templateName, stationName, totalNoOfInstruction);
    }

    populateChecklistHeader(templateName, stationName, totalNoOfInstruction) {
        let tempName = document.getElementById("checklist-name-input").value;
        let statName = document.getElementById("station-name-input").value;
        let totalInstruction = totalNoOfInstruction;
        console.log(tempName, totalInstruction,statName);
        this.jsonText = `{
            "templateName":` + `"` + tempName + `"` + `,` +
            `"stationName":` + `"` + statName + `"` + `,` +
            `"totalNoOfInstruction":` + totalNoOfInstruction + `,`;
        this.populateProcessHeader(totalInstruction);
    }

    populateProcessHeader(totalInstruction) {
        let totalInstruction1 = totalInstruction;
        this.jsonText = this.jsonText + `"workInstructions": [`;
        for(let i = 0; i < totalInstruction; i++)
        {
            let processName = document.getElementById("processNameInput" + i).value;
            let checkLocation = document.getElementById("checkLocationInput" + i).value;
            let checkDetails = document.getElementById("checkDetailsInput" + i).value;
            this.jsonText = this.jsonText + `{
                "index":` + i + `,` +
                `"processName":` + `"` + processName.toString() + `"` + `,` +
                `"checkLocation":` + `"` + checkLocation.toString() + `"` + `,` +
                `"checkDetails":` + `"` + checkDetails.toString() + `"` +  `,`;
            this.populateWorkArea(i, totalInstruction1);
        }
        this.populateClosingBraces();
    }

    populateWorkArea(i, totalInstruction1) {
        
        let imageComponent = null;
        let inputField1Component = null;
        let inputField2Component = null;
        let judgementComponent = null;

        this.jsonText = this.jsonText + `"workArea": {`;
        if(document.getElementById("imageComponent" + i) !== null)
        {
            let imageString = document.getElementById('imgInput' + i).getAttribute('value');
            imageComponent = `"image":` + `"` + imageString + `"`;
        }
        if(document.getElementById("inputField1Component" + i) !== null)
        {
                let inputField1Label = document.getElementById("inputField1Label" + i).innerHTML;
                inputField1Component = `"inputField1":` + `"` + inputField1Label.toString() + `"`;
        }

        if(document.getElementById("inputField2Component" + i) !== null)
        {
                let inputField2Label = document.getElementById("inputField2Label" + i).innerHTML;
                inputField2Component = `"inputField2":` + `"` + inputField2Label.toString() + `"`;
        }

        if(document.getElementById("judgementComponent" + i) !== null)
        {
                judgementComponent = `"judgement":"Judgement"`;
        }

        if(imageComponent)
        {
            this.jsonText = this.jsonText + imageComponent;
            if(inputField1Component)
            {
                this.jsonText = this.jsonText + `,` + inputField1Component;
                if(inputField2Component)
                {
                    this.jsonText = this.jsonText + `,` + inputField2Component;
                    if(judgementComponent)
                    {
                        this.jsonText = this.jsonText + `,` + judgementComponent;
                    }
                }
            }
        }
        else if(inputField1Component)
        {
            this.jsonText = this.jsonText + inputField1Component;
            if(inputField2Component)
            {
                this.jsonText = this.jsonText + `,` + inputField2Component;
                if(judgementComponent)
                {
                    this.jsonText = this.jsonText + `,` + judgementComponent;
                }
            }
        }
        else if(inputField2Component)
        {
            this.jsonText = this.jsonText + inputField2Component;
            if(judgementComponent)
            {
                this.jsonText = this.jsonText + `,` + judgementComponent;
            }
        }
        else if(judgementComponent)
        {
            this.jsonText = this.jsonText + judgementComponent;
        }

        if(i === (totalInstruction1-1))
        {
            this.jsonText = this.jsonText + `}}`;
        }
        else
        {
            this.jsonText = this.jsonText + `}},`;
        }
    }

    populateClosingBraces() {
        this.jsonText = this.jsonText + `]}`;
    }

}

export {CreateJSON};