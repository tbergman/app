import React from "react"
import { Image, View, Text } from "react-native"
import styled from "styled-components/native"
import { StyledHeading, StyledPassiveText } from "./styles/text"
import { TextButton } from "./Button"

const contents = [
  {
    heading: "Heading 1",
    imageUrl: "https://picsum.photos/300/300",
    animationUrl: null,
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultrices pellentesque placerat. Etiam quis vehicula libero. Fusce pretium blandit purus id placerat. Ut accumsan mattis elementum."
  },
  {
    heading: "Heading 2",
    imageUrl: "https://picsum.photos/300/300",
    animationUrl: null,
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultrices pellentesque placerat. Etiam quis vehicula libero. Fusce pretium blandit purus id placerat. Ut accumsan mattis elementum."
  },
  {
    heading: "Heading 3",
    imageUrl: "https://picsum.photos/300/300",
    animationUrl: null,
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultrices pellentesque placerat. Etiam quis vehicula libero. Fusce pretium blandit purus id placerat. Ut accumsan mattis elementum."
  },
  {
    heading: "Heading 4",
    imageUrl: "https://picsum.photos/300/300",
    animationUrl: null,
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ultrices pellentesque placerat. Etiam quis vehicula libero. Fusce pretium blandit purus id placerat. Ut accumsan mattis elementum."
  }
]

const FullScreen = styled.View`
  flex: 1;
  align-self: stretch;
`

const Container = FullScreen.extend`
  padding: 20px;
`

const CenteredText = styled.Text`
  text-align: center;
`

const ImageContainer = styled.View`
  margin-top: 20px;
  align-self: stretch;
  align-items: center;
`

const ParagraphContainer = styled.View`
  margin-top: 20px;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`

const DotsContainer = styled.View`
  margin-top: 20px;
  align-items: center;
`

const LoginContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const MarketingScreen = ({ data }) => {
  return (
    <FullScreen>
      <Container>
        <CenteredText>
          <StyledHeading>{data.heading}</StyledHeading>
        </CenteredText>
        <ImageContainer>
          <Image
            source={{ uri: data.imageUrl }}
            style={{ width: 300, height: 300 }}
          />
        </ImageContainer>
        <ParagraphContainer>
          <CenteredText>
            <StyledPassiveText>{data.paragraph}</StyledPassiveText>
          </CenteredText>
        </ParagraphContainer>
        <DotsContainer>
          <Text>Dots go here</Text>
        </DotsContainer>
        <LoginContainer>
          <Text style={{ marginRight: 10 }}>Redan medlem?</Text>
          <TextButton title="Logga in" />
        </LoginContainer>
      </Container>
    </FullScreen>
  )
}

const MarketingCarousel = () => {
  return (
    <FullScreen>
      <MarketingScreen data={contents[0]} />
    </FullScreen>
  )
}

export default MarketingCarousel
