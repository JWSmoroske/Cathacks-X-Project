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
        localStorage.setItem("medList",JSON.stringify(meds));
        update();
        modal.style.display = "none";
}

function closeButton(){
    modal.style.display = "none";
}

async function update(){
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
        let sciName = await getSciName(name);
        newListScientific.textContent = "Scientific Name: " + sciName;
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

function fetchDataAndCreateList() {
    let apiData = []; // Initialize an empty array to store the data

    // Make API call and process the results
    return fetch('https://api.fda.gov/drug/event.json?count=patient.drug.openfda.generic_name.exact')
        .then((response) => response.json()) // Parse JSON response
        .then((data) => {
            apiData = data; // Assign response data to apiData
            console.log(apiData); // Use apiData here or call functions that depend on it

            // Extract the "term" values from apiData.results
            const termArray = apiData.results.map(item => item.term);
            console.log(termArray); // Log the termArray for verification

            // Create and return a list using the "term" values
            return createList(termArray);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; // Re-throw the error to propagate it to the caller
        });
}

// Function to create a list using the provided array of items
function createList(items) {
    const list = document.createElement('ul'); // Create <ul> element
    items.forEach(item => {
        const listItem = document.createElement('li'); // Create <li> element
        listItem.textContent = item; // Set text content of <li> to the item
        list.appendChild(listItem); // Append <li> to <ul>
    });
    return list; // Return the created list
}

fetchDataAndCreateList()
    .then((list) => {
        console.log("is list an array? ", typeof list)
        const dropdownContainer = document.getElementById("medicationInput");

        const liElements = list.querySelectorAll('li');
        liElements.forEach(li => {
            // Create an option element for each item
            const option = document.createElement('option');

            // Set the text of the option to the item
            option.textContent = li.textContent;
            option.value = li.textContent;
            // Append the option to the dropdown
            dropdownContainer.appendChild(option);
        })
    });

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

async function getSciName(name) {
    return fetch(`https://api.fda.gov/drug/event.json?search=patient.drug.openfda.generic_name:"${name}"&count=patient.drug.openfda.substance_name.exact&limit=1`)
    .then((response) => response.json())
    .then((data) => {
        return data.results[0].term;
    });
}

if("serviceWorker" in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/Cathacks-X-Project/' });
  }