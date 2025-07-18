import { useEffect, useState } from 'react';

const Countdown = () => {
  const targetDate = new Date('2025-07-18T00:29:59');
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date();
    const total = targetDate - now;

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.total <= 0) {
    return <div>🏁 Shuffle Race finalizada</div>;
  }

  return (
    <div className="countdown-container">
      <h2 className="title">💸 SHUFFLE WAGER RACE - $2000 USD EN PREMIOS 💸</h2>
      <h3 className="subtitle">🔥 ¡Los 10 que más apuesten se reparten el pozo! 🔥</h3>
      <h3 className="countdown"> 
        {String(timeLeft.days).padStart(2, '0')}d: 
        {String(timeLeft.hours).padStart(2, '0')}: 
        {String(timeLeft.minutes).padStart(2, '0')}: 
        {String(timeLeft.seconds).padStart(2, '0')}
      </h3>
    </div>
  );
};

export default Countdown;