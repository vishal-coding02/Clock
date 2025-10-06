let currTime = document.getElementById("currentTime");
let currTimevalue = "";
const openAlarmBtn = document.querySelector(".alarm-btn .openAlarm");
const closeAlarmBtn = document.querySelector(".alarm-btn .closeAlarm");
const setAlarmDiv = document.querySelector(".setAlarm");
const setAlarmBtn = document.querySelector(".setAlarmBtn");
const stopAlarmBtn = document.querySelector(".stopAlarmBtn");
let timeInput = document.getElementById("time-input");
let alarmTime = "";
let alarmAudio = new Audio("audio.mp3");
let alarmInterval;

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
  timeInput.value = "";
});

setAlarmBtn.addEventListener("click", () => {
  alarmTime = timeInput.value;
  if (!alarmTime) {
    alert("Please select a time for alarm");
    return;
  }

  setAlarmDiv.style.display = "none";

  let [alarmHours, alarmMinutes] = alarmTime.split(":");
  alarmHours = parseInt(alarmHours);
  alarmMinutes = parseInt(alarmMinutes);

  let currentDate = new Date();
  let currentHours = currentDate.getHours();
  let currentMinutes = currentDate.getMinutes();

  if (
    alarmHours < currentHours ||
    (alarmHours === currentHours && alarmMinutes <= currentMinutes)
  ) {
    alert(`Please enter future time. Current time is ${currTimevalue}`);
    timeInput.value = "";
    alarmTime = "";
  } else {
    alert("Alarm set for " + formatTimeForAlert(alarmHours, alarmMinutes));
    setAlarmBtn.style.display = "none";
    stopAlarmBtn.style.display = "block";
    checkAlarm();
  }
});

stopAlarmBtn.addEventListener("click", () => {
  stopAlarm();
});

function formatTimeForAlert(hours, minutes) {
  let ampm = hours >= 12 ? "PM" : "AM";
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

function checkAlarm() {
  if (alarmInterval) {
    clearInterval(alarmInterval);
  }

  alarmInterval = setInterval(() => {
    let currentDate = new Date();
    let currentHours = currentDate.getHours();
    let currentMinutes = currentDate.getMinutes();

    let [alarmHours, alarmMinutes] = alarmTime.split(":");
    alarmHours = parseInt(alarmHours);
    alarmMinutes = parseInt(alarmMinutes);

    if (currentHours === alarmHours && currentMinutes === alarmMinutes) {
      console.log("Wake Up!");
      alarmAudio.play();
      alarmAudio.loop = true;
      clearInterval(alarmInterval);
      alert("Wake Up! Alarm ringing!");
    }
  }, 1000);
}

function stopAlarm() {
  if (alarmAudio) {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
  }

  if (alarmInterval) {
    clearInterval(alarmInterval);
  }

  setAlarmBtn.style.display = "block";
  stopAlarmBtn.style.display = "none";
  timeInput.value = "";
  alarmTime = "";
  setAlarmDiv.style.display = "none";
}
