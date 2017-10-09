import React from "react"
import { Text, TouchableOpacity, DatePickerIOS, View } from "react-native"
import styled from "styled-components/native"
import moment from "moment"

const StyledView = styled.View`border: solid 1px black;`

// TODO: Render DatePickerAndroid on Android
const DateInput = ({ message, onChange, send }) => {
  return (
    <StyledView>
      <View>
        <Text>
          Date: {message._inputValue}
        </Text>
      </View>
      <DatePickerIOS
        mode="date"
        date={
          message._inputValue === undefined
            ? moment(message.body.date).toDate()
            : moment(message._inputValue).toDate()
        }
        onDateChange={date => onChange(message, moment(date).toISOString())}
      />
      <TouchableOpacity onPress={() => send(message)}>
        <Text>Send</Text>
      </TouchableOpacity>
    </StyledView>
  )
}

export default DateInput
