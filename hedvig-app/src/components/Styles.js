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

export { Placeholder, BaseViewStyle, BaseScrolleViewStyle, ChatMessageStyle }
