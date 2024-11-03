import { useState, useEffect } from 'react';
import { DiscoundTime } from 'src/types/common';

function useCountdown(initialMinutes = 0, initialSeconds = 0) {
  const [time, setTime] = useState<DiscoundTime>({
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  const [isActive, setIsActive] = useState(false);

  const start = () => {
    setIsActive(true);
  };

  useEffect(() => {
    let intervalRef: ReturnType<typeof setInterval>;

    if (isActive) {
      intervalRef = setInterval(() => {
        setTime(prevTime => {
          const { minutes, seconds } = prevTime;

          if (minutes === 0 && seconds === 0) {
            clearInterval(intervalRef);
            return prevTime;
          } else if (seconds === 0) {
            return {
              minutes: minutes - 1,
              seconds: 59,
            };
          } else {
            return {
              minutes,
              seconds: seconds - 1,
            };
          }
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef);
  }, [isActive]);

  return { time, start, isActive };
}

export default useCountdown;
