let currTime = document.getElementById("currentTime");
let currTimevalue = "";
const openAlarmBtn = document.querySelector(".alarm-btn .openAlarm");
const closeAlarmBtn = document.querySelector(".alarm-btn .closeAlarm");
const setAlarmDiv = document.querySelector(".setAlarm");
const setAlarmBtn = document.querySelector(".setAlarm button");
let timeInput = document.getElementById("time-input");
let alarmTime = "";
let alarmAudio = new Audio("audio.mp3");
alarmAudio.loop = true; // loop until stopped
const stopAlarmBtn = document.querySelector(".stopAlarm"); // new button

function updateDate() {
  let date = new Date();
  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
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
    "July",
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
  setAlarmDiv.style.display = "flex";
});
closeAlarmBtn.addEventListener("click", () => {
  setAlarmDiv.style.display = "none";
});

setAlarmBtn.addEventListener("click", () => {
  alarmTime = timeInput.value;
  setAlarmDiv.style.display = "none";
  if (alarmTime < currTimevalue) {
    alert(`Please enter a future time. Current Time is ${currTimevalue}`);
    timeInput.value = "";
  } else {
    alert("Alarm set for " + alarmTime);
    checkAlarm();
  }
});

function checkAlarm() {
  const alarmInterval = setInterval(() => {
    if (alarmTime === currTimevalue) {
      alarmAudio.play().catch(() => {
        alert("Tap anywhere to allow sound 🔊");
      });
      document.querySelector(".stopAlarm").style.display = "block";
      clearInterval(alarmInterval);
    }
  }, 1000);
}

// ✅ Stop Alarm button logic
stopAlarmBtn.addEventListener("click", () => {
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
  alarmTime = "";
  stopAlarmBtn.style.display = "none";
  alert("Alarm stopped ⏹️");
});
