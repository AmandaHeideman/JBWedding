import React from 'react';
import Countdown from 'react-countdown';

const HomePage = () => {

  let weddingDate = new Date("July 30, 2022 13:30:00").getTime();

  return (
    <div className="homepage d-flex flex-column align-items-center justify-content-center">
      <h1>Johanna & Björn </h1>
      <div className="countdownContainer d-flex flex-column align-items-center p-2">
        <h4>Vi gifter oss om</h4>
        <Countdown className="countdown" date={weddingDate} />
        <h3>dagar : timmar : minuter : sekunder</h3>
      </div>
    </div>
  )
}

export default HomePage
