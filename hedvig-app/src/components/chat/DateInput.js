import React from "react"
import { Text, TouchableOpacity, DatePickerIOS, View } from "react-native"
import styled from "styled-components/native"

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
            ? new Date()
            : new Date(message._inputValue)
        }
        onDateChange={date => onChange(message, date.toString())}
      />
      <TouchableOpacity onPress={() => send(message)}>
        <Text>Send</Text>
      </TouchableOpacity>
    </StyledView>
  )
}

export default DateInput
