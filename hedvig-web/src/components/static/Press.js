import React from "react"

import { LinkStyled, StaticHeading2 } from "../styles/static"
import { Heading, Paragraph, StaticPage } from "./common"

const Legal = () => {
  return (
    <StaticPage heroContent={<StaticHeading2>Press</StaticHeading2>}>
      <Heading>Nam porttitor</Heading>
      <Paragraph>
        Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget
        libero posuere vulputate. Etiam elit elit, elementum sed varius at,
        adipiscing vitae est. Sed nec felis pellentesque, lacinia dui sed,
        ultricies sapien. Pellentesque orci lectus, consectetur vel posuere
        posuere, rutrum eu ipsum. Aliquam eget odio sed ligula iaculis
        consequat.
        <LinkStyled href="/">Link</LinkStyled>
      </Paragraph>

      <Heading>Nam porttitor</Heading>
      <Paragraph>
        Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget
        libero posuere vulputate. Etiam elit elit, elementum sed varius at,
        adipiscing vitae est. Sed nec felis pellentesque, lacinia dui sed,
        ultricies sapien. Pellentesque orci lectus, consectetur vel posuere
        posuere, rutrum eu ipsum. Aliquam eget odio sed ligula iaculis
        consequat.
        <LinkStyled href="/">Link</LinkStyled>
      </Paragraph>
    </StaticPage>
  )
}

export default Legal
