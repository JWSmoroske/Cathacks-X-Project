let meds = {};
const storedMeds = localStorage.getItem("medList");
if (storedMeds) {
    meds = JSON.parse(storedMeds);
    update();
}


function addItem() {
    const medicationInput = document.getElementById("medicationInput");
    const dosageInput = document.getElementById("dosageInput");
    const frequencyInput = document.getElementById("frequencyInput");
    const quantityInput = document.getElementById("quantityInput");
    const startInput = document.getElementById("startInput");
    const endInput = document.getElementById("endInput");
    const methodInput = document.getElementById("methodInput");

    const itemList = document.getElementById("medication-list");
        const itemText = medicationInput.value;
        const dosageText = dosageInput.value;
        const frequencyText = frequencyInput.value;
        const quantityText = quantityInput.value;
        const startText = startInput.value;
        const endText = endInput.value;
        const methodText = methodInput.value;
        const medication = {
            "name": itemText,
            "dosage": dosageText,
            "quantity": Number(quantityText),
            "frequency": Number(frequencyText),
            "start_time": startText,
            "end_time": endText,
            "method": methodText
        }
        meds[itemText] = medication;
        // const newListItem = document.createElement("li");
        // newListItem.textContent = itemText;
        // itemList.appendChild(newListItem);
        // medicationInput.value = "";

        // // Add a new option for the medication in the select element
        // const newOption = document.createElement("option");
        // newOption.text = itemText;
        // newOption.value = itemText;
        
        localStorage.setItem("medList",JSON.stringify(meds));
        update();
        modal.style.display = "none";
}

function closeButton(){
    modal.style.display = "none";
}

function update(){
    console.log(Object.keys(meds).length);
    let listDiv = document.getElementById("listContainer");
    listDiv.innerHTML = "";
    for(const key in meds){
        let medicat = meds[key];
        const newListItem = document.createElement("div");
        newListItem.innerHTML = "";
        const newListName = document.createElement("span");
        const newListDosage = document.createElement("span");
        const newBreak = document.createElement("br");
        const newListQuantity = document.createElement("span");
        const newListFrequency = document.createElement("div");
        const newListScientific = document.createElement("div");
        const newListMethod = document.createElement("span");
        
        let name = medicat["name"];
        let dosage = medicat["dosage"];
        let quantity = medicat["quantity"];
        let frequency = medicat["frequency"];
        let start = medicat["start_time"];
        let end = medicat["end_time"];
        let method = medicat["method"];
        // newListItem.textContent = "Name: "+name+ " Dosage: "+dosage+"Scientific Name: "+"Use case: ";
        newListItem.classList.add("medListItems");
        newListName.textContent = "Name: "+name;
        newListName.classList.add("medListName");
        newListDosage.textContent = "Dosage: "+dosage;
        newListDosage.classList.add("medListDosage");
        newListScientific.textContent = "Scientific Name: " + dosage;
        newListScientific.classList.add("medListScientific");
        newListMethod.textContent = "Method: " + method;
        newListMethod.classList.add("medListMethod");
        const newButton = document.createElement("button");
        newButton.classList.add("deleteButton");
        newButton.textContent = "Delete";
        newButton.addEventListener("click", function(){
            deleteItem(name);
        });
        newButton.innerHTML = '<img width=\"20px\"src=\"./images/icons/trash.svg\"></img>';
        listDiv.appendChild(newListItem);
        newListItem.appendChild(newListName);
        newListName.appendChild(newListDosage);
        newListItem.appendChild(newListScientific);
        newListScientific.appendChild(newBreak);
        newListItem.appendChild(newListMethod);
        newListMethod.appendChild(newButton);
        localStorage.setItem("medList", JSON.stringify(meds));
    }   
}



function deleteItem(name){
    delete meds[name];
    localStorage.setItem("medList",JSON.stringify(meds));
    update();
}

function removeItem() {
    const medicationSelect = document.getElementById("medicationSelect");
    const itemList = document.getElementById("itemList");

    const selectedMedication = medicationSelect.value;

    // Find the list item corresponding to the selected medication
    let itemToRemove = null;
    for (const item of itemList.children) {
        if (item.textContent === selectedMedication) {
            itemToRemove = item;
            break;
        }
    }

    if (itemToRemove) {
        itemList.removeChild(itemToRemove);
        medicationSelect.removeChild(medicationSelect.selectedOptions[0]); // Remove the selected option
    } else {
        console.log("Medication not found in the list");
    }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

