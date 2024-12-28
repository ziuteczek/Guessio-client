import { useEffect, useState } from "react";

function Timer({ timerStop }) {
  const [clock, setClock] = useState(Math.ceil((timerStop - new Date().getTime()) / 1000));

  useEffect(() => {
    setClock(Math.ceil((timerStop - new Date().getTime()) / 1000));

    const clockInterval = setInterval(() => {
      setClock((time) => (time <= 0 ? 0 : time - 1));
    }, 1000);

    return () => clearInterval(clockInterval);
  }, [timerStop]);

  return (
    <div className="timer">
      <p className="timer__seconds">{clock}</p>
    </div>
  );
}

export default Timer;
