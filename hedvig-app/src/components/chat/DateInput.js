import React from "react"
import {
  DatePickerIOS,
  DatePickerAndroid,
  View,
  Platform
} from "react-native"
import {
  StyledDatePickerResultRow,
  StyledFakeTextInput,
  StyledFakeTextInputText,
  TouchableStyledFakeTextInput
} from "../styles/chat"
import { SendIconButton } from "../Button"
import moment from "moment"
import "moment/locale/sv"

// TODO: Render DatePickerAndroid on Android
class DateInput extends React.Component {
  async showAndroidDatePicker(message, onChange) {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(1984, 8, 11)
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        onChange(message, moment(new Date(year, month, day)).toISOString())
      }
      this.setState({ androidDatePickerVisible: false })
    } catch ({ code, message }) {
      throw new Error("Could not show datepicker")
    }
  }

  renderIos() {
    let { message, onChange, send } = this.props
    return (
      <View>
        <StyledDatePickerResultRow>
          <StyledFakeTextInput>
            <StyledFakeTextInputText>
              {moment(message._inputValue).format("LL")}
            </StyledFakeTextInputText>
          </StyledFakeTextInput>
          <SendIconButton onPress={() => send(message)} />
        </StyledDatePickerResultRow>
        <DatePickerIOS
          mode="date"
          date={
            message._inputValue === undefined
              ? moment(message.body.date).toDate()
              : moment(message._inputValue).toDate()
          }
          onDateChange={date => onChange(message, moment(date).toISOString())}
          // TODO: Fix layout to not use hard coded height
          style={{ height: 220 }}
        />
      </View>
    )
  }

  renderAndroid() {
    let { message, onChange, send } = this.props
    return (
      <View>
        <StyledDatePickerResultRow>
          <TouchableStyledFakeTextInput
            onPress={() => this.showAndroidDatePicker(message, onChange)}
          >
            <StyledFakeTextInputText>
              {moment(message._inputValue).format("LL")}
            </StyledFakeTextInputText>
          </TouchableStyledFakeTextInput>
          <SendIconButton onPress={() => send(message)} />
        </StyledDatePickerResultRow>
      </View>
    )
  }

  render() {
    if (Platform.OS === "ios") {
      return this.renderIos()
    } else if (Platform.OS === "android") {
      return <View>{this.renderAndroid()}</View>
    }
  }
}

export default DateInput
