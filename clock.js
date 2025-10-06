let currTime = document.getElementById("currentTime");
let currTimevalue = "";
const openAlarmBtn = document.querySelector(".alarm-btn .openAlarm");
const closeAlarmBtn = document.querySelector(".alarm-btn .closeAlarm");
const setAlarmDiv = document.querySelector(".setAlarm");
const setAlarmBtn = document.querySelector(".setAlarm button");
let timeInput = document.getElementById("time-input");
let alarmTime = "";
let alarmAudio = new Audio("audio.mp3");

function updateDate() {
  let date = new Date();
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "july",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let todayDay = weekDay[date.getDay()];
  let currMonth = months[date.getMonth()];
  let year = date.getFullYear();
  let currDate = date.getDate();
  document.getElementById(
    "currentDate"
  ).innerHTML = `${todayDay}, ${currMonth} <span>${currDate}</span>, ${year}`;
}

updateDate();

function displayTime() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  currTimevalue = `${hours}:${minutes}`;
  currTime.innerHTML = `${hours}:${minutes}:${seconds} ${ampm}`;
}

displayTime();
setInterval(displayTime, 1000);

openAlarmBtn.addEventListener("click", () => {
  setAlarmDiv.style.display = "block";
});
closeAlarmBtn.addEventListener("click", () => {
  setAlarmDiv.style.display = "none";
});

setAlarmBtn.addEventListener("click", () => {
  alarmTime = timeInput.value;
  setAlarmDiv.style.display = "none";
  if (alarmTime < currTimevalue) {
    alert(`Please enter future time current Time is ${currTimevalue}`);
    timeInput = "";
  } else {
    alert("Alarm set for " + alarmTime);
  }
  checkAlarm();
});

function checkAlarm() {
  console.log("Current Time:", currTimevalue);
  console.log("Alarm Time:", alarmTime);

  const alarmInterval = setInterval(() => {
    // console.log("Checking alarm...");

    if (alarmTime === currTimevalue) {
      console.log("Wake Up");
      alarmAudio.play();
      clearInterval(alarmInterval);
      alarmTime = "";
      setAlarmDiv.style.display = "block";
      timeInput.value = "";
    }
  }, 1000);
}
