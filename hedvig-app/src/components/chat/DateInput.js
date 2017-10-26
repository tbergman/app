import React from "react"
import { Text, TouchableOpacity, DatePickerIOS, DatePickerAndroid, View, Platform } from "react-native"
import { Util } from "expo"
import {
  StyledDatePickerResultRow,
  StyledFakeTextInput,
  StyledFakeTextInputText
} from "../styles/chat"
import { SendIconButton } from "../Button"
import moment from "moment"
import "moment/locale/sv"

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
          style={{flex: 1}}
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
      <View>
        <StyledDatePickerResultRow>
          <StyledFakeTextInput>
            <StyledFakeTextInputText>
              {moment(message._inputValue).format('LL')}
            </StyledFakeTextInputText>
          </StyledFakeTextInput>
          <SendIconButton onPress={() => (send(message))} />
        </StyledDatePickerResultRow>
        {this.datePicker(message, onChange)}
      </View>
    )
  }
}

export default DateInput
