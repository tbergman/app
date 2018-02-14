import React from "react"

import "./collaboration.css"

const Collaboration = () => {
  return (
    <section className="pure-g pure-centered Collaboration">
      <div className="pure-u-1-1 pure-u-md-2-3">
        <div className="pure-g pure-centered">
          <div className="pure-u-1-1 pure-u-md-1-3">
            <img
              width={166}
              height={166}
              src="assets/web/Images/handshake.png"
              alt="Samarbete"
            />
            <div className="pure-g pure-centered">
              <p className="pure-u-1-1 pure-u-md-3-4">Hedvig är tryggat av InterHannover, del av en av världens största återförsäkringskoncerner</p>
            </div>
          </div>
          <div className="pure-u-1-1 pure-u-md-1-3">
            <img
              width={166}
              height={166}
              src="assets/web/Images/AA.png"
              alt="Samarbete"
            />
            <div className="pure-g pure-centered">
              <p className="pure-u-1-1 pure-u-md-3-4">AA-rating från Standard &amp; Poor's</p>
            </div>
          </div>
          <div className="pure-u-1-1 pure-u-md-1-3">
            <img
              width={166}
              height={166}
              src="assets/icons/authorized.svg"
              alt="samarbete"
            />
            <div className="pure-g pure-centered">
              <p className="pure-u-1-1 pure-u-md-3-4">Hedvig är auktoriserat av Finansinspektionen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Collaboration
