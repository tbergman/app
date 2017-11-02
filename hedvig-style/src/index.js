const colors = {
  primary: "#651EFF",
  purple: "#651EFF",
  turquoise: "#1BE9B6",
  red: "#FF8A80",
  blackPurple: "#0F007A",
  white: "#ffffff",
  offWhite: "#F9FAFC",
  whiteGray: "#F1F3F7",
  lightGray: "#E9ECEF",
  mediumGray: "#D7D7DC",
  darkGray: "#9B9BAA",
  black: "#414150",
  activeText: "#414150",
  passiveText: "#9B9BAA",
  hedvigMessageText: "#0F007A",
  hedvigMessageBackground: "#F9FAFC"
}

module.exports.theme = {
  colors: colors,
  mobile: {
    margin: {
      tiny: 8,
      small: 12,
      medium: 16,
      big: 24
    }
  },
  typography: {
    activeText: {
      color: colors.activeText,
      fontSize: 14
    },
    passiveText: {
      color: colors.passiveText,
      fontSize: 14
    },
    hedvigMessage: {
      fontSize: 16
    },
    userMessage: {
      fontSize: 16
    },
    small: {
      fontSize: 12
    },
    heading: {
      fontSize: 16
    },
    input: {
      fontSize: 16
    },
    form: {
      input: {
        fontSize: 14
      }
    }
  },
  input: {
    default: {
      height: 40
    },
    option: {
      height: 20
    }
  },
  button: {
    textButton: {
      fontSize: 16,
      color: colors.primary,
      prefixColor: colors.blackPurple
    }
  }
}
