// let meds = localStorage.getItem('medList');

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

let allTimes = [];
let timeToHTML = new Map();

for (const key in meds) {
    let route = "oral"; // get from API fetch
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
    allTimes.sort((a, b) => (a-b));
    console.log(allTimes);
    console.log(timeToHTML);
}

for (let i = 0; i < allTimes.length; i++)
{
    document.getElementById('timeList').innerHTML += `<li> <h3> ${timeOut(allTimes[i])} </h3> <ul class=\"instructionList\"> ${timeToHTML.get(allTimes[i])} </ul> </li>`;
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