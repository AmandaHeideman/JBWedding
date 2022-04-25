import React from 'react';
import pic1 from '../styles/images/johannaobjörn.jpg';

const WeddingDayPage = () => {

  return (
    <div className="row weddingday">
      <h1 className="page-header center ">Bröllopsdagen</h1>
      <div className="styled-div col-6">
        <p>
        Varmt välkommen på vårt bröllop! Vigseln äger rum i Klosterkyrkan i Lund 13.30 lördagen
        den 30 juli 2022, och efteråt blir det fest i Magle Konserthus.
        <br /><br />
        Från kyrkan tar det ungefär en kvart att promenera till 
        Magle Konserthus där festen äger rum. Vägbeskrivning dit samt tips på parkering till både kyrkan
        och festlokalen hittar ni under fliken <a href="/directions">Hitta hit</a>
        <br /><br />
        Själva festen börjar med mingel. Björn och Johanna kommer gå dit direkt från kyrkan, men det går 
        också bra att komma lite senare. Runt 18 serveras en kall buffe, och efter det blir det tårta. 
        De som vill göra något framträdande under middagen fyller i det i sin anmälan, så kontaktar 
        toastmaster Anja Johansson er. 
        <br /><br />
        Klädkod: sommarfint.
        <br />
        Vi önskar ett barnfritt bröllop.
        </p>
      </div>
      <div className="styled-div col-5">
        <img classNAme="johannaandbjornpic" src={pic1} alt="Johanna och Björn"/>
      </div>

    </div>
  )
}

export default WeddingDayPage
