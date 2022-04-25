import React from 'react';
import Countdown from 'react-countdown';

const HomePage = () => {

  let weddingDate = new Date("July 30, 2022 13:30:00").getTime();

  return (
    <div className="homepage d-flex flex-column align-items-center justify-content-center">
      <h1>Björn & Johanna</h1>
      <div className="countdownContainer d-flex flex-column align-items-center p-2">
        <h4>Vi gifter oss om</h4>
        <Countdown className="countdown" date={weddingDate} />
        <h3>dagar : timmar : minuter : sekunder</h3>
      </div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d4496.370606555084!2d13.187305726346834!3d55.70315071766312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s0x465397dbb4237065%3A0x81baadecfa709d32!2sKlosterkyrkan%2C%20Trollebergsv%C3%A4gen%2C%20Lund!3m2!1d55.704265!2d13.186006899999999!4m5!1s0x465397c5b491359f%3A0x910dc285b2120077!2sMagle%20Konserthus%2C%20Magle%20Stora%20kyrkogata%2C%20Lund!3m2!1d55.703018699999994!2d13.1972572!5e0!3m2!1sen!2sse!4v1649578794395!5m2!1sen!2sse" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="map"></iframe>
    </div>
  )
}

export default HomePage
