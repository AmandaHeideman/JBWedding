import React from "react";
import pic2 from "../styles/images/johannaobjörn2.jpg";
import pic3 from "../styles/images/johannaobjörn3.jpg";

const HotelPage = () => {
  return (
    <div className="weddingday">
      <h1 className="page-header center ">Hotelltips</h1>
      <div className="d-grid-40-60">
      <div className="styled-div">
        <img className="mb-3" src={pic2} alt="Björn och Johanna" />
        <img src={pic3} alt="Björn och Johanna" />
      </div>
      <div className="styled-div">
        <p>
          Hotelltips från Hans och Kerstin om de hotell i Lund som ligger verkligt centralt! 
          <br /><br />
          <h3>Concordia, Stallbrogatan 1</h3>
          Vårt favorithotell, bott där cirka fem gånger. Gammalt charmigt hus. Lugnt
          läge, bra frukost. Receptionen är inte öppen jämt.
          <br />
          <a href="https://www.concordia.se/">Länk till hotellet</a> 
          <br /><br />
          <h3>Oskar, Bytaregatan 3</h3>
          Bott där en gång.
          Charmigt hus men rummet var något trångt. Ingen servering i huset utan
          frukost intages på café Creperiet som ligger om hörnet, på
          Klostergatan. 
          <br />
          <a href="https://www.hotelloskar.se/se">Länk till hotellet</a> 
          <br /><br />
          <h3>Bishops Arms, St Petri Kyrkogata 7</h3>
          Bott där en gång. Små rum. Gammalt charmigt hus. Pub i
          bottenplanet som också fungerar som reception. Puben stör ej
          nattsömnen. 
          <br />
          <a href="https://www.bishopsarms.com/vara-hotell/lund/hotellrum/">Länk till hotellet</a>
          <br /><br />
          <h3>Lundia, Knut den Stores Torg 2</h3>
          Vi har inte bott där. Ett mer modernt
          hus än de andra, mycket nära stationen. 
          <br />
          <a href="https://www.lundia.se/">Länk till hotellet</a> 
          <br /><br />
          <h3>Grand Hotel, Bantorget 1</h3>
          Klassiskt, fint och traditionellt. En helt annan
          prislapp än de övriga. Hans har bott där på tjänsteresa. Bra
          restaurang och dito bar. 
          <br />
          <a href="https://www.grandilund.se/">Länk till hotellet</a>
        </p>
      </div>
      </div>
    </div>
  );
};

export default HotelPage;
