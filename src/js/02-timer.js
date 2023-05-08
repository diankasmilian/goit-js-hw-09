
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const refs = {
   input: document.getElementById("datetime-picker"),
   btnStart: document.querySelector('button[data-start]'),
   days: document.querySelector('span[data-days]'),
   hours: document.querySelector('span[data-hours]'),
   minutes: document.querySelector('span[data-minutes]'),
   seconds: document.querySelector('span[data-seconds]')
};

refs.btnStart.setAttribute('disabled', '');

let intervalId;


flatpickr( refs.input, {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
      
      if (selectedDates[0].getTime() <= Date.now()) {
         window.alert("Please choose a date in the future");
         refs.btnStart.setAttribute("disabled", "");
      } else {
         refs.btnStart.removeAttribute("disabled");
         refs.input.value = selectedDates[0];
      }
   },
 });

 const timer = {
   isActive: false,
   start() { 
      const selectedDate = new Date(refs.input.value);
      refs.btnStart.setAttribute('disabled', '');
      
      if (this.isActive) {
         return;
      }
      this.isActive = true;
      const intervalId = setInterval(() => { 
         refs.input.setAttribute('disabled', '');        
         const currentTime = Date.now();
         const deltaTime = selectedDate.getTime() - currentTime;
         const { days, hours, minutes, seconds } = convertMs(deltaTime);
         
         refs.days.textContent = `${days}`;
         refs.hours.textContent = `${hours}`;
         refs.minutes.textContent = `${minutes}`;
         refs.seconds.textContent = `${seconds}`;

         if (deltaTime <= 0) {
            this.stop();
            return;
         }
         
      }, 1000);
   },
   stop() {
          clearInterval(intervalId);

         refs.days.textContent = "00";
         refs.hours.textContent = '00';
         refs.minutes.textContent = '00';
         refs.seconds.textContent = '00';
   }
 }
 refs.btnStart.addEventListener('click', () => {
   timer.start()
 });
 window.addEventListener('load', () => {
   timer.stop()
 });

 function convertMs(ms) {

   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;
 
   // Remaining days
   const days = addLeadingZero(Math.floor(ms / day), 2);
   // Remaining hours
   const hours = addLeadingZero(Math.floor((ms % day) / hour), 2);
   // Remaining minutes
   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute), 2);
   // Remaining seconds
   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second), 2);
 
   return { days, hours, minutes, seconds };
 }

 function addLeadingZero(value, length) {
   return String(value).padStart(length, '0')
 };




 