import styled from "styled-components"

/*
Viewport height of 100% is the height after a scroll event, even before you’ve scrolled - making the height too tall initially. This is a WONTFIX in safari:
https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser/37113430
https://nicolas-hoizey.com/2015/02/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers.html

Reducing the height of the FullHeight div by MOBILE_SCROLL_OFFSET on mobile fixes this.
*/

export const FullHeight = styled.div`
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: column;
`
