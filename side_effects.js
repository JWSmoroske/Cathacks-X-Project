const EFFECTS_PER = 7;

// let meds = localStorage.getItem('medList');
const sample_med = {
    "name": "ASPIRIN",
    "dosage": "25mg",
    "quantity": 1,
    "frequency": 6,
    "start_time": "7:00am",
    "end_time": "9:00pm",
    "method": "with water"
};
const sample_med2 = {
    "name": "IBUPROFEN",
    "dosage": "25mg",
    "quantity": 1,
    "frequency": 6,
    "start_time": "7:00am",
    "end_time": "9:00pm",
    "method": "with water"
};
let meds = {}; 
meds[sample_med.name] = sample_med;
meds[sample_med2.name] = sample_med2;

const table = document.getElementById('effectsTable');

for (const key in meds) {
    fetch(`https://api.fda.gov/drug/event.json?search=patient.drug.openfda.generic_name:"${meds[key].name}"&count=patient.reaction.reactionmeddrapt.exact`)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data);
        for (let i = 0; i < data.results.length && i < EFFECTS_PER; i++) {
            let term = data.results[i].term;
            console.log(term);
        }
    });
}

