import React from 'react';

const DirectionsPage = () => {

  return (
    <div className="row directions">
      <h1 className="page-header center ">Hitta hit</h1>
      
      <div className="styled-div col-6">
      <p>
        Klosterkyrkan ligger precis vid tågstationen, och det finns en parkering (Klosterhagen) brevid kyrkan och ett 
        parkeringshus (Mobilitetshuset Lund C) under västra stationstorget. 
        Mer information om parkeringarna vid kyrkan går att hitta på: 
        <span> <a href="https://lkpab.se/hitta-parkering/">https://lkpab.se/hitta-parkering/</a></span>
        <br /><br />
        Magle konserthus ligger mellan domkyrkan och stadsteatern. Det finns 11 parkeringsplatser på Magle Stora Kyrkogata, 
        <span> <a href="https://www.apcoa.se/parkering-i/lund/magle-stora-kyrkogata-12/">länk till parkeringarna.</a> </span>
        I närheten av Magle Konserthus finns också ett P-hus på Laboratoriegatan,
        <span> <a href="https://www.apcoa.se/parkering-i/lund/laboratoriegatan/">länk till P-huset.</a> </span>
         Efter 15 kan man parkera på delar av Mårtenstorget.
        
        </p>
        </div>
        <div className="styled-div col-5">
      <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d4496.370606555084!2d13.187305726346834!3d55.70315071766312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s0x465397dbb4237065%3A0x81baadecfa709d32!2sKlosterkyrkan%2C%20Trollebergsv%C3%A4gen%2C%20Lund!3m2!1d55.704265!2d13.186006899999999!4m5!1s0x465397c5b491359f%3A0x910dc285b2120077!2sMagle%20Konserthus%2C%20Magle%20Stora%20kyrkogata%2C%20Lund!3m2!1d55.703018699999994!2d13.1972572!5e0!3m2!1sen!2sse!4v1649578794395!5m2!1sen!2sse" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="map"></iframe>
      </div>
    </div>
  )
}

export default DirectionsPage
