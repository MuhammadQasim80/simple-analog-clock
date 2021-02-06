/**
 * An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined
 * @returns an object having properties startTimer & showCurrentTime
 */
const clock = (function () {
  const secondHand = document.getElementById('second-hand');
  const minuteHand = document.getElementById('minute-hand');
  const hourHand = document.getElementById('hour-hand');

  const angleSec = 360 / 60;
  const angleMinutes = 360 / (60 * 60);
  const angleHours = 360 / (60 * 60 * 60);

  let intervalId = null;

  /**
   * @initiates timer with 0 angle for each clock hand.
   */
  const startTimer = () => {
    spinClockHands(0, 0, 0);
  };

  /**
   *
   * @param {Number} hourAngle to update the hour clock hand
   * @param {Number} minuteAngle to update the minute clock hand
   * @param {Number} secondAngle to update the second clock hand
   * @returns {Nothing} updates the clock hands on UI
   */
  const updateClockHandsPosition = (hourAngle, minuteAngle, secondAngle) => {
    secondHand.style.transform = `rotate(${secondAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    hourHand.style.transform = `rotate(${hourAngle}deg)`;
  };

  /**
   *
   * @param {Number} hour value
   * @param {Number} minute value
   * @param {Number} second value
   * @returns {Object} having angles information each for hour, minute and seconds hand.
   */
  const getClockHandsAngles = (hour, minute, second) => {
    // (Divide 360 degrees by total clock hours and then multiple by the remainder of (current hour % clock hours))
    const hoursAngle = (360 / 12) * (hour % 12);
    // (Divide 360 degrees by total clock minutes and then multiple current minutes)
    const minuteAngle = (360 / 60) * minute;
    // (Divide 360 degrees by total clock seconds and then multiple current seconds)
    const secondAngle = (360 / 60) * second;

    return {
      hoursAngle,
      minuteAngle,
      secondAngle,
    };
  };

  /**
   *
   * @param {Number} hourAngle is the initial angle (position within the circle) for HOUR clock hand
   * @param {Number} minuteAngle is the initial angle (position within the circle) for MINUTE clock hand
   * @param {Number} secondAngle is the initial angle (position within the circle) for SECOND clock hand
   * @returns {SET_INTERVAL} that will update clock hands (HOUR, MINUTE, SECOND) after each second
   */
  const spinClockHands = (hourAngle, minuteAngle, secondAngle) => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      secondAngle += angleSec;
      secondAngle %= 360;
      minuteAngle += angleMinutes;
      minuteAngle %= 360;
      hourAngle += angleHours;
      hourAngle %= 360;

      // update clock
      updateClockHandsPosition(hourAngle, minuteAngle, secondAngle);
    }, 1000);
  };

  /**
   * @determins current hour, minute & second hand position with respect to current time.
   * @intiates spinClockHands function with initial angles w.r.t current time.
   */
  const showCurrentTime = () => {
    const time = new Date();

    const {hoursAngle, minuteAngle, secondAngle} = getClockHandsAngles(
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );

    spinClockHands(hoursAngle, minuteAngle, secondAngle);
  };
  return {
    startTimer,
    showCurrentTime,
  };
})();
