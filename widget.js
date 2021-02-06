const clock = (function () {
  const secondHand = document.getElementById('second-hand');
  const minuteHand = document.getElementById('minute-hand');
  const hourHand = document.getElementById('hour-hand');

  const angleSec = 360 / 60;
  const angleMinutes = 360 / (60 * 60);
  const angleHours = 360 / (60 * 60 * 60);

  const startCounter = () => {
    rotateClockHands(0, 0, 0);
  };

  const rotateClockHands = (hourAngle, minuteAngle, secondAngle) => {
    setInterval(() => {
      secondAngle += angleSec;
      secondAngle %= 360;
      minuteAngle += angleMinutes;
      minuteAngle %= 360;
      hourAngle += angleHours;
      hourAngle %= 360;

      secondHand.style.transform = `rotate(${secondAngle}deg)`;
      minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
      hourHand.style.transform = `rotate(${hourAngle}deg)`;
    }, 1000);
  };

  const showTime = () => {
    const time = new Date();
    console.log(
      time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
    );

    const hoursAngle = (360 / 12) * (time.getHours() % 12);
    const minuteAngle = (360 / 60) * time.getMinutes();
    const secondAngle = (360 / 60) * time.getSeconds();

    rotateClockHands(hoursAngle, minuteAngle, secondAngle);
  };
  return {
    startCounter,
    showTime,
  };
})();
