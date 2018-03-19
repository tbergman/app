import React from "react"
import { Helmet } from "react-helmet"

import { SayHi } from "../common"
import Hero from "../../../components/Hero"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import "./faq.css"

const FAQ = () => (
  <main>
    <Helmet>
      <title>FAQ | Hedvig</title>
    </Helmet>
    <Header headerRight={<SayHi />}/>
    <article className="pure-g pure-centered FAQ">
      <div className="pure-u-1-1 pure-u-lg-4-5">
        <h1 className="FAQ__hero-header">Frågor och svar</h1>
      </div>
      <div className="pure-u-1-1 pure-u-lg-4-5">
        <section className="pure-g">
          <div className="pure-u-1-1 pure-u-md-1-3 pure-u-lg-2-5">
            <h1 className="FAQ__heading">Vilka typer av försäkringar har Hedvig?</h1>
          </div>
          <div className="pure-u-1-1 pure-u-md-2-3 pure-u-lg-3-5">
            <p>
              Just nu försäkrar jag dig som äger eller hyr en lägenhet.
              Försäkringen täcker inte bara din lägenhet utan också dig –
              till exempel när du reser. Självklart ingår även ”drulleförsäkring”
              för alla dina prylar – så länge de inte kostar mer än 50&nbsp;000 kronor styck.
            </p>
          </div>
        </section>
        <section className="pure-g">
          <div className="pure-u-1-1 pure-u-md-1-3 pure-u-lg-2-5">
            <h1 className="FAQ__heading">Jag vill byta till Hedvig men har redan en försäkring, hur gör jag?</h1>
          </div>
          <div className="pure-u-1-1 pure-u-md-2-3 pure-u-lg-3-5">
            <p>
              Det är inga problem, jag sköter bytet åt dig. Allt du behöver göra är att signera med Mobilt BankID.
              Jag aktiverar din Hedvigförsäkring så fort bindningstiden går ut på din gamla.
              Du blir aldrig utan försäkring och behöver inte krångla med uppsägningen – det löser jag.
            </p>
          </div>
        </section>
        <section className="pure-g">
          <div className="pure-u-1-1 pure-u-md-1-3 pure-u-lg-2-5">
            <h1 className="FAQ__heading">Hur lång är bindningstiden?</h1>
          </div>
          <div className="pure-u-1-1 pure-u-md-2-3 pure-u-lg-3-5">
            <p>
              Det finns ingen bindningstid! Hedvig är Sveriges enda hemförsäkring utan.
              Det betyder att du kan säga upp din försäkring precis när du vill, utan anledning.
            </p>
          </div>
        </section>
        <section className="pure-g">
          <div className="pure-u-1-1 pure-u-md-1-3 pure-u-lg-2-5">
            <h1 className="FAQ__heading">Är Hedvig tryggt?</h1>
          </div>
          <div className="pure-u-1-1 pure-u-md-2-3 pure-u-lg-3-5">
            <p>
              Hedvig tryggas av ett globalt försäkringsbolag som heter International Insurance Company of Hannover.
              De är del av en av världens största försäkringsgrupper. Tryggare kan det nog inte bli!
            </p>
          </div>
        </section>
        <section className="pure-g">
          <div className="pure-u-1-1 pure-u-md-1-3 pure-u-lg-2-5">
            <h1 className="FAQ__heading">Varför samarbetar Hedvig med välgörenhetsorganisationer?</h1>
          </div>
          <div className="pure-u-1-1 pure-u-md-2-3 pure-u-lg-3-5">
            <p>
              Vissa år är skadorna låga, och då blir det pengar över.
              Ett vanligt försäkringsbolag hade tagit pengarna som extra vinst.
              Det gör inte jag. När det blir pengar över skänks de istället till ett gott ändamål.
              Du bestämmer vilket!
            </p>
          </div>
        </section>
        <section className="pure-g">
          <div className="pure-u-1-1 pure-u-md-1-3 pure-u-lg-2-5">
            <h1 className="FAQ__heading">Är Hedvig icke-vinstdrivande?</h1>
          </div>
          <div className="pure-u-1-1 pure-u-md-2-3 pure-u-lg-3-5">
            <p>
              Nej, Hedvig är ett vanligt bolag. Jag tar en fast avgift på 20% av det du betalar varje månad för att kunna ge dig bra service.
              Men jag tar aldrig mer än så! Jag tycker det är schysstare med en fast avgift.
              Då kan du känna dig trygg med att jag behandlar dig rättvist när du har en skada,
              eftersom jag aldrig vinner något på att hålla inne med dina pengar.
            </p>
          </div>
        </section>
        <section className="pure-g">
          <div className="pure-u-1-1 pure-u-md-1-3 pure-u-lg-2-5">
            <h1 className="FAQ__heading">Hur vet jag vad min försäkring täcker?</h1>
          </div>
          <div className="pure-u-1-1 pure-u-md-2-3 pure-u-lg-3-5">
            <p>
              Det ser du tydligt i appen, men om du är intresserad finns så klart hela försäkringsvillkor också! De hittar du här:
            </p>
            <p>
              <a href="https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/F%C3%B6rs%C3%A4kringsvillkor+-+Hyresr%C3%A4tt+(Februari+2018).pdf">
                För dig som hyr din lägenhet
              </a>
            </p>
            <p>
              <a href="https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/F%C3%B6rs%C3%A4kringsvillkor+-+Bostadsr%C3%A4tt+(Februari+2018).pdf">
                För dig som äger din lägenhet
              </a>
            </p>
            <p>
              Vill du inte läsa hela villkoren finns sammanfattningar här:
            </p>
            <p>
              <a href="https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/F%C3%B6rk%C3%B6psinformation+-+Hyresr%C3%A4tt+(Februari+2018).pdf">
                Förköpsinformation för dig som hyr lägenhet
              </a>
            </p>
            <p>
              <a href="https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/F%C3%B6rk%C3%B6psinformation+-+Bostadsr%C3%A4tt+(Februari+2018).pdf">
                Förköpsinformation för dig som äger lägenhet
              </a>
            </p>
          </div>
        </section>
        <section className="pure-g">
          <div className="pure-u-1-1 pure-u-md-1-3 pure-u-lg-2-5">
            <h1 className="FAQ__heading">Vad kostar Hedvig?</h1>
          </div>
          <div className="pure-u-1-1 pure-u-md-2-3 pure-u-lg-3-5">
            <p>
              Ditt pris beror på lite olika saker, till exempel hur du bor,
              var du bor och hur många du bor med. Så för att kunna ge dig ett
              pris behöver jag lära känna dig lite först. Ladda ner appen,
              så tar vi det därifrån!
            </p>
          </div>
        </section>
        <section className="pure-g">
          <div className="pure-u-1-1 pure-u-md-1-3 pure-u-lg-2-5">
            <h1 className="FAQ__heading">Hur betalar jag för min försäkring?</h1>
          </div>
          <div className="pure-u-1-1 pure-u-md-2-3 pure-u-lg-3-5">
            <p>
              Eftersom du inte har någon bindningstid betalar du per månad.
              Jag har valt det smidigaste betalsättet jag kunde hitta,
              och det är ett digitalt autogiro som kopplas till ditt bankkonto.
              Det sätts upp direkt i appen när du blir medlem, allt du behöver
              göra är att signera en gång med Mobilt BankID.
            </p>
          </div>
        </section>
        <section className="pure-g">
          <div className="pure-u-1-1 pure-u-md-1-3 pure-u-lg-2-5">
            <h1 className="FAQ__heading">Hur kommer jag i kontakt med Hedvig?</h1>
          </div>
          <div className="pure-u-1-1 pure-u-md-2-3 pure-u-lg-3-5">
            <p>
              Du kan fråga mig vad som helst när som helst direkt i appen.
              Du kan självklart också be en av mina kollegor att ringa upp dig.
              Om du gillar att maila når du mig på <a href="mailto:hedvig@hedvig.com">hedvig@hedvig.com</a>!
            </p>
          </div>
        </section>
      </div>
    </article>
    <Footer />
  </main>
)

export default FAQ
