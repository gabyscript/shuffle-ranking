import { useEffect, useState } from 'react';
import { RANKING_PRIZES } from '../const/rankingPrizes';

const Countdown = () => {
  const targetDate = new Date(Date.UTC(2025, 7, 14, 2, 59, 59));
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [totalPrize, setTotalPrize] = useState(0)

  function getTimeRemaining() {
    const now = new Date();
    const total = targetDate.getTime() - now.getTime();

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

  useEffect(() => {
    setTotalPrize(RANKING_PRIZES.reduce((acc, curr) => acc + curr, 0))
  },[])

  if (timeLeft.total <= 0) {
    
    return (
        <div className="countdown-container">
          <h2 className="title">💸 SHUFFLE WAGER RACE - ${totalPrize} USD EN PREMIOS 💸</h2>
          <h3 className="subtitle">🔥 ¡Los 10 que más apuesten se reparten el pozo! 🔥</h3>
          <h3 className="countdown"> 
            🏁 Shuffle Race finalizada
          </h3>
        </div>
    )
  }

  return (
    <div className="countdown-container">
      <h2 className="title">💸 SHUFFLE WAGER RACE - ${totalPrize} USD EN PREMIOS 💸</h2>
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