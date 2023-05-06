
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const refs = {
   input: document.getElementById("datetime-picker"),
   btnStart: document.querySelector('button[data-start]'),
   days: document.querySelector('span[data-days]'),
   hours: document.querySelector('span[data-hours]'),
   minutes: document.querySelector('span[data-minutes]'),
   seconds: document.querySelector('span[data-seconds]')
}

flatpickr( refs.input, {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
     console.log(selectedDates[0]);
   },
 });

 chooseTime();

 function chooseTime () {
   const currentTime = new Date();
   const newTime = new Date(refs.input.value);

   if (newTime.getTime() <= currentTime.getTime()) {
      window.alert("Please choose a date in the future");
    refs.btnStart.disabled = true;
    return;

    const deltaTime = newTime.getTime() - currentTime.getTime();

    convertMs(deltaTime);

    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
   }
 }

 function convertMs(ms) {
   // Number of milliseconds per unit of time
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;
 
   // Remaining days
   const days = Math.floor(ms / day);
   // Remaining hours
   const hours = Math.floor((ms % day) / hour);
   // Remaining minutes
   const minutes = Math.floor(((ms % day) % hour) / minute);
   // Remaining seconds
   const seconds = Math.floor((((ms % day) % hour) % minute) / second);
 
   return { days, hours, minutes, seconds };
 }

 