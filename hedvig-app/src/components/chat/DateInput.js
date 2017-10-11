import React from "react"
import { Text, TouchableOpacity, DatePickerIOS, DatePickerAndroid, View, Platform } from "react-native"
import styled from "styled-components/native"
import moment from "moment"

const StyledView = styled.View`border: solid 1px black;`

// TODO: Render DatePickerAndroid on Android
class DateInput extends React.Component {

  async showAndroidDatePicker(message, onChange) {
    try {
     const {action, year, month, day} = await DatePickerAndroid.open({
       // Use `new Date()` for current date.
       // May 25 2020. Month 0 is January.
       date: new Date(1984, 8, 11)
     })
     if (action !== DatePickerAndroid.dismissedAction) {
       onChange(message, moment(new Date(year, month, day + 1)).toISOString())
     }
     this.setState({androidDatePickerVisible: false})
   } catch ({code, message}) {
     console.warn('Cannot open date picker', message);
   }
  }

  datePicker(message, onChange) {
    if (Platform.OS === "ios") {
      return (
        <DatePickerIOS
          mode="date"
          date={
            message._inputValue === undefined
              ? moment(message.body.date).toDate()
              : moment(message._inputValue).toDate()
          }
          onDateChange={date => onChange(message, moment(date).toISOString())}
        />
      )
    } else if (Platform.OS === "android") {
      return (
        <TouchableOpacity onPress={() => this.showAndroidDatePicker(message, onChange)}>
          <Text>Open date picker</Text>
        </TouchableOpacity>
      )
      this.showAndroidDatePicker(message, onChange)
    }
  }

  render() {
    let { message, onChange, send } = this.props
    return (
      <StyledView>
        <View>
          <Text>
            Date: {message._inputValue}
          </Text>
        </View>
        {this.datePicker(message, onChange)}
        <TouchableOpacity onPress={() => send(message)}>
          <Text>Send</Text>
        </TouchableOpacity>
      </StyledView>
    )
  }
}

export default DateInput
