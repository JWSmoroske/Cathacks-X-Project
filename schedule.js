let meds = JSON.parse(localStorage.getItem('medList'));
/*
const sample_med = {
    "name": "ASPIRIN",
    "dosage": "25mg",
    "quantity": 1,
    "frequency": 6,
    "start_time": "6am",
    "end_time": "8pm",
    "method": "with water"
};
const sample_med2 = {
    "name": "IBUPROFEN",
    "dosage": "25mg",
    "quantity": 1,
    "frequency": 3,
    "start_time": "6am",
    "end_time": "9pm",
    "method": "with water"
};
let meds = {}; 
meds[sample_med.name] = sample_med;
meds[sample_med2.name] = sample_med2;
*/

async function load() {
    let allTimes = [];
    let timeToHTML = new Map();

    for (const key in meds) {
        let route = await getRoute(key);
        let str = `<li> Take ${key} (${meds[key].quantity} @ ${meds[key].dosage}) ${route}ly ${meds[key].method} </li>`;
        let start = parseTime(meds[key].start_time), end = parseTime(meds[key].end_time);
        let curTime = start;
        while (curTime < end) {
            if (timeToHTML.has(curTime))
            {
                timeToHTML.set(curTime, timeToHTML.get(curTime) + str);
            }
            else
            {
                timeToHTML.set(curTime, str);
                allTimes.push(curTime);
            }
            curTime += meds[key].frequency;
        }
    }
    allTimes.sort((a, b) => (a-b));
    for (let i = 0; i < allTimes.length; i++) {
        document.getElementById('timeList').innerHTML += `<li> <h3> ${timeOut(allTimes[i])} </h3> <ul class=\"instructionList\"> ${timeToHTML.get(allTimes[i])} </ul> </li>`;
    }
}

// different outputs if no perscriptions entered
if (Object.keys(meds).length == 0) {
    document.getElementById('empty').style.marginTop = '20px';
    document.getElementById('empty').innerHTML = "Visit the home page to add perscriptions!";
} else {
    document.getElementById('empty').style.marginTop = '0px';
    document.getElementById('empty').innerHTML = "";
    load();
}


function parseTime(str) {
    // example strs: "7am", "9am", "1pm", "3pm", "6am", "12pm"
    let num, char;
    if (str.length == 4)
    {
        num = Number(str.substr(0, 2));
        char = str[2];
    }
    else
    {
        num = Number(str.substr(0, 1));
        char = str[1];
    }
    if (num == 12)
        num = 0;
    if (char == "p")
        num += 12;
    return num;

}
function timeOut(num) {
    if (num == 0) return "12:00 AM";
    if (num == 12) return "12:00 PM";
    if (num < 12) return (num) + ":00 AM";
    return (num-12) + ":00 PM";
}
async function getRoute(name) {
    return fetch(`https://api.fda.gov/drug/event.json?search=patient.drug.openfda.generic_name:"${name}"&count=patient.drug.openfda.route.exact`)
    .then((response) => response.json())
    .then((data) => {
        return data.results[0].term.toLowerCase();
    });
}