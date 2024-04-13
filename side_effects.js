const EFFECTS_PER = 7;
/* const sample_med = {
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
*/  
let meds = JSON.parse(localStorage.getItem('medList'));

if (Object.keys(meds).length == 0) {
    document.getElementById('empty').style.marginTop = '20px';
    document.getElementById('empty').innerHTML = "Visit the home page to add perscriptions!";
    document.getElementById('container').innerHTML = "";
} else {
    document.getElementById('empty').style.marginTop = '0px';
    document.getElementById('empty').innerHTML = "";
    document.getElementById('container').innerHTML = "<table class=\"effectTable\" id=\"effectsTable\"><tr style=\"border-bottom: 1px solid black\"><td width=\"50%\"><h3> Side Effect </h3></td><td width=\"50%\"><h3> Potential Sources </h3></td></tr></table>";
    load();
}


function load() {
    let table = document.getElementById('effectsTable');
    let effMap = new Map();
    let curRow = 0;
    for (const key in meds) {
        fetch(`https://api.fda.gov/drug/event.json?search=patient.drug.openfda.generic_name:"${key}"&count=patient.reaction.reactionmeddrapt.exact`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            for (let i = 0; i < data.results.length && i < EFFECTS_PER; i++) {
                let term = data.results[i].term;
                if (effMap.has(term)) {
                    // console.log(`already has term ${term}`);
                    document.getElementById(`row${effMap.get(term)}drug`).innerHTML += `, ${key}`;
                }
                else {
                    effMap.set(term, ++curRow);
                    // console.log(`adding term ${term}`);
                    table.innerHTML += `<tr> <td id=row${curRow}term> ${term} </td> <td id=row${curRow}drug> ${key} </td> </tr>`;
                }
            }
        }).catch(err => {
            return;
        });
    }
}