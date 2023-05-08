

const refs = {
   body: document.querySelector('body'),
   btnStart: document.querySelector('button[data-start]'),
   btnStop: document.querySelector('button[data-stop]')
};

refs.btnStop.setAttribute("disabled", "");
let intervalId;
let isOnColorSwitcher = false;

refs.btnStart.addEventListener('click', onStart);
refs.btnStop.addEventListener('click', onStop);

function onStart () {
   refs.btnStart.setAttribute("disabled", "");
   refs.btnStop.removeAttribute("disabled");
   if (isOnColorSwitcher) {
      return;
   }
   isOnColorSwitcher = true;

   intervalId = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
      
};

function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
 };

 function onStop () {
   clearInterval(intervalId);
   refs.btnStart.removeAttribute("disabled");
   refs.btnStop.setAttribute("disabled", "");
   isOnColorSwitcher = false;
 }