import styled from "styled-components/native"

const Placeholder = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: white;
  justify-content: center;
  align-items: center;
`

const BaseViewStyle = styled.View`
  flex: 1;
  background-color: white;
`

const BaseScrolleViewStyle = styled.ScrollView`
  flex: 1;
  background-color: white;
`

const ChatMessageStyle = styled.View`
  flex-direction: row;
  padding: 10px;
  width: 80%;
  background: lightgray;
  margin-bottom: 20;
`

const TextplainerStyle = styled.Text`
  border-style: solid;
  border-width: 1px;
  border-color: black;
  padding: 40px 20px;
  font-size: 30px;
  align-self: stretch;
  text-align: center;
  margin: 20px;
`

export {
  Placeholder,
  BaseViewStyle,
  BaseScrolleViewStyle,
  ChatMessageStyle,
  TextplainerStyle
}
