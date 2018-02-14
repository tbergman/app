import React from "react"

import "./modelexplanation.css"


export const ModelExplanation = () => (
  <section className="pure-g pure-centered ModelExplanation">
    <div className="pure-u-1-1 pure-u-md-5-6">
      <div className="pure-g pure-centered ModelExplanation__text">
        <div className="pure-u-1-1 pure-u-md-1-3">
          <h1 className="ModelExplanation__heading">
            Schysst för dig, och världen runtomkring
          </h1>
          <p>
            Hedvig fungerar inte som ett vanligt försäkringsbolag. Vi tar en låg fast avgift, betalar blixtsnabbt och skänker överskottet till ett gott ändamål
          </p>
        </div>
      </div>
      <div className="pure-g pure-centered ModelExplanation__icons">
        <div className="pure-u-1-1 pure-u-md-1-3">
          <img width={166} height={166} src="/assets/icons/profil/personlig_info.svg" alt="Hedvig Logo" />
          <p>Hedvig tar en fast avgift för<br /> att ge dig blixtsnabb service</p>
        </div>
        <div className="pure-u-1-1 pure-u-md-1-3">
          <img width={166} height={166} src="/assets/icons/perils/mina_prylar/drulle.svg" alt="Skadad telefon" />
          <p>Resten av din månadskostnad<br /> går till att täcka skador</p>
        </div>
        <div className="pure-u-1-1 pure-u-md-1-3">
          <img width={166} height={166} src="/assets/icons/profil/valgorenhet.svg" alt="Hjärta" />
          <p>Ett bra år med lite skador blir det<br /> pengar över, det skänker vi till<br /> ett gott ändamål</p>
        </div>
      </div>
    </div>
  </section>
)

export default ModelExplanation
