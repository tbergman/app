import React from "react"
import { Image, View, Text, Dimensions } from "react-native"
import Carousel, { Pagination } from "react-native-snap-carousel"
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
  padding: 20px 20px 0px 20px;
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
  flex: 1;
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

export default class MarketingCarousel extends React.Component {
  state = {
    index: 0
  }

  _renderItem({ item, index }) {
    // TODO Render either an Image or a Lottie animation here, based on
    // which of item.imageUrl and item.animationUrl is not null
    return (
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: 300, height: 300 }}
      />
    )
  }

  render() {
    let data = contents[this.state.index]
    return (
      <FullScreen>
        <Container>
          <CenteredText>
            <StyledHeading>{data.heading}</StyledHeading>
          </CenteredText>
          <ImageContainer>
            <Carousel
              ref={c => {
                this._carousel = c
              }}
              data={contents}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={300}
              inactiveSlideOpacity={0}
              inactiveSlideScale={0.9}
              onSnapToItem={slideIndex => this.setState({ index: slideIndex })}
            />
          </ImageContainer>
          <ParagraphContainer>
            <CenteredText>
              <StyledPassiveText>{data.paragraph}</StyledPassiveText>
            </CenteredText>
          </ParagraphContainer>
        </Container>
        <View style={{ marginBottom: 20 }}>
          <DotsContainer>
            <Pagination
              dotsLength={contents.length}
              activeDotIndex={this.state.index}
              dotColor="#651EFF"
              inactiveDotColor="#D7D7DC"
              inactiveDotScale={1}
            />
          </DotsContainer>
          <LoginContainer>
            <Text style={{ marginRight: 10 }}>
              <StyledPassiveText>Redan medlem?</StyledPassiveText>
            </Text>
            <TextButton title="Logga in" />
          </LoginContainer>
        </View>
      </FullScreen>
    )
  }
}
