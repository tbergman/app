import styled from "styled-components/native"

export const Placeholder = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: white;
  justify-content: center;
  align-items: center;
`

export const BaseViewStyle = styled.View`
  flex: 1;
  background-color: white;
`

export const BaseScrolleViewStyle = styled.ScrollView`
  flex: 1;
  background-color: white;
`

export const ChatMessageStyle = styled.View`
  flex-direction: row;
  padding: 10px;
  width: 80%;
  background: ${props => props.theme.colors.hedvigMessageBackground};
  margin-bottom: 20;
`

export const ChatMessageTextStyle = styled.Text`
  color: ${props => props.theme.colors.hedvigMessageText};
  font-family: "merriweather";
`

export const CircularFontText = styled.Text`font-family: "circular";`

export const TextplainerStyle = styled.Text`
  border-style: solid;
  border-width: 1px;
  border-color: black;
  padding: 40px 20px;
  font-size: 30px;
  align-self: stretch;
  text-align: center;
  margin: 20px;
`
