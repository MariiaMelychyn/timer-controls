const displaytimer = document.querySelector(".display__time-left");
const displayEndtimer = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

let countdown;

buttons.forEach((button) => {
  button.addEventListener("click", startTimer);
});

document.customForm.addEventListener("submit", manualStartTimer); //! customForm works because the form has a name

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTime(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTime(secondsLeft);
  }, 1000);
}

function displayTime(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  const display = `${mins}:${secs}`;
  document.title = display;
  displaytimer.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const nin = end.getMinutes().toString().padStart(2, "0");
  displayEndtimer.textContent = `Be back at ${hour}:${nin}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function manualStartTimer(event) {
  event.preventDefault();
  const minutes = this.minutes.value; //! .minutes chooses the input by attribute 'name'
  const seconds = minutes * 60;
  this.reset();
  timer(seconds);
}