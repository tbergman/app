import React from "react"
import Lazyload from "react-lazyload"

import "./modelexplanation.css"


export const ModelExplanation = () => (
  <section className="pure-g pure-centered ModelExplanation">
    <div className="pure-u-1-1 pure-u-md-5-6">
      <div className="pure-g pure-centered ModelExplanation__text">
        <div className="pure-u-1-1">
          <h1 className="ModelExplanation__heading">
            Överskottet doneras till ett gott&nbsp;ändamål
          </h1>
          <p className="pure-u-5-6 pure-u-lg-3-5 ModelExplanation__paragraph">
            Hedvig fungerar inte som ett vanligt försäkringsbolag.
            Vi tar en låg fast avgift,
            betalar blixtsnabbt och skänker överskottet till ett gott&nbsp;ändamål
          </p>
        </div>
      </div>
      <div className="pure-g pure-centered ModelExplanation__icons">
        <div className="pure-u-1-1 pure-u-md-1-3">
          <Lazyload
            height={166}
            offset={200}
          >
            <img width={166} height={166} src="/assets/icons/profil/personlig_info.svg" alt="Hedvig Logo" />
          </Lazyload>
          <p>Hedvig tar en fast avgift för<br /> att ge dig blixtsnabb service</p>
        </div>
        <div className="pure-u-1-1 pure-u-md-1-3">
          <Lazyload
            height={166}
            offset={200}
          >
            <img width={166} height={166} src="/assets/icons/perils/mina_prylar/drulle.svg" alt="Skadad telefon" />
          </Lazyload>
          <p>Resten av din månadskostnad<br /> går till att täcka skador</p>
        </div>
        <div className="pure-u-1-1 pure-u-md-1-3">
          <Lazyload
            height={166}
            offset={200}
          >
            <img width={166} height={166} src="/assets/icons/profil/valgorenhet.svg" alt="Hjärta" />
          </Lazyload>
          <p>Ett bra år med lite skador blir det<br /> pengar över, det skänker vi till<br /> ett gott ändamål</p>
        </div>
      </div>
    </div>
  </section>
)

export default ModelExplanation
