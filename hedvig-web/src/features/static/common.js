import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { TurquoiseRoundedButtonStyled } from "../../components/styles/button"

const CustomButton = TurquoiseRoundedButtonStyled.extend`
  margin-left: auto;
  white-space: nowrap;
  font-size: 16px;
`

export const SayHi = connect(
  undefined,
  dispatch => ({
    registerCtaClick: () => dispatch({type: "ANALYTICS/CTA_CLICK", payload: {location: "header"}})
  })
)(({registerCtaClick}) => (
  <Link to="/chat" onClick={registerCtaClick}>
    <CustomButton>
      Säg hej till Hedvig!
    </CustomButton>
  </Link>
))
