function addItem(action) {
    const itemInput = document.getElementById("itemInput");
    const itemList = document.getElementById("itemList");
    const medicationSelect = document.getElementById("medicationSelect");

    if (action === "add") {
        const itemText = itemInput.value;
        const newListItem = document.createElement("li");
        newListItem.textContent = itemText;
        itemList.appendChild(newListItem);
        itemInput.value = "";

        // Add a new option for the medication in the select element
        const newOption = document.createElement("option");
        newOption.text = itemText;
        newOption.value = itemText; // Optional value attribute for easier identification
        medicationSelect.appendChild(newOption);
    }
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