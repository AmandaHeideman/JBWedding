import React from 'react';
import Countdown from 'react-countdown';

const HomePage = () => {

  let weddingDate = new Date("July 30, 2022 13:30:00").getTime();

  return (
    <div>
      <h1>Johanna & Björn </h1>
      <div className="countdown">
        <h4>Vi gifter oss om</h4>
        <Countdown date={weddingDate} />
      </div>
    </div>
  )
}

export default HomePage
