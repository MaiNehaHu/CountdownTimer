(function () {
  const hour = document.querySelector(".hours");
  const min = document.querySelector(".mins");
  const sec = document.querySelector(".secs");
  const list = document.querySelector(".recordedTimes__list");
  const deleteBtn = document.querySelector(".deleteBtn");

  const start = document.querySelector(".start");
  const stop = document.querySelector(".stop");
  const reset = document.querySelector(".reset");
  const record = document.querySelector(".record");

  let countDownTimer;
  let startFlag;

  start.addEventListener("click", startCountdown);

  stop.addEventListener("click", () => stopCountdown("pause"));

  reset.addEventListener("click", resetCountdown);

  record.addEventListener("click", recordCountdown);

  deleteBtn.addEventListener("click", clearRecordedTimes);

  function startCountdown() {
    if (hour.value === "" && min.value === "" && sec.value === "") {
      //If nothing is set my user. The countdown will not start
      alert("Please set some countdown");
    } else {
      startFlag = true;
      start.style.display = "none";
      stop.style.display = "block";

      countDownTimer = setInterval(() => {
        timer();
      }, 1000);
    }
  }

  function stopCountdown(state) {
    start.innerHTML = state === "pause" ? "Continue" : "Start";

    startFlag = false;
    start.style.display = "block";
    stop.style.display = "none";

    clearInterval(countDownTimer);
  }

  function resetCountdown() {
    hour.value = "";
    min.value = "";
    sec.value = "";

    stopCountdown();
  }

  function recordCountdown() {
    let recordedHour = hour.value == "" ? "00" : hour.value;
    let recordedMin = min.value == "" ? "00" : min.value;
    let recordedSec = sec.value == "" ? "00" : sec.value;

    if (hour === "00" && min === "00" && sec === "00") {
      alert("Please set some countdown");
    } else if (!startFlag) {
      alert("Start the counter first");
    } else {
      list.insertAdjacentHTML(
        "afterend",
        `<p class="recordedTime"> ${recordedHour} : ${recordedMin} : ${recordedSec}</p>`
      );
    }
  }

  function timer() {
    //if ony seconds is entered
    if (sec.value != 0) {
      if (sec.value > 60) {
        min.value++;
        sec.value = parseInt(sec.value) - 59;
      }

      sec.value = `${sec.value <= 10 ? "0" : ""}${sec.value - 1}`;
    }
    //if minutes is entered but not hours and seconds
    else if (sec.value == "" && min.value != 0) {
      if (min.value > 60) {
        min.value++;
        min.value = parseInt(min.value) - 60;
      }

      sec.value = 59;
      min.value = `${min.value <= 10 ? "0" : ""}${min.value - 1}`;
    }
    //if only hour is entered and not min and seconds
    else if (sec.value == "" && min.value == "" && hour.value != 0) {
      min.value = 60;
      hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
    } else {
      resetCountdown();
    }
  }
})();
