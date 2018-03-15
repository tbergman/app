import React from "react"
import {
  View,
  DatePickerIOS,
  DatePickerAndroid,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
  BackHandler
} from "react-native"
import { theme } from "hedvig-style"
import moment from "moment"
import "moment/locale/sv"
import * as R from "ramda"

import { HeaderRightChat } from "../NavBar"
import { NavBar } from "../NavBar"
import { ImagePicker, Permissions } from "expo"
import {
  StyledImageSelectionContainer,
  StyledHeaderButton,
  StyledHeaderButtonText,
  StyledImage,
  StyledFormContainer,
  StyledInputContainer,
  StyledInputTexts,
  StyledInputHeader,
  StyledInputText,
  StyledTextInput,
  StyledFooter
} from "../styles/assetTracker"
import { CameraCircleIcon, ChoosePhotoCircleIcon, InputAddIcon } from "../Icon"
import {
  NavigateBackButton,
  DeleteButton,
  DisabledInputEditButton,
  DisabledInputDoneButton,
  RoundedButton,
} from "../Button"
import { KeyboardAwareView } from "../KeyboardAwareView"

export default class AddEditAsset extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      item: {
        title: "",
        date: new Date(),
        price: null
      },
      editingTitle: false,
      editingDate: false,
      editingPrice: false,
      formIsDirty: false,
      dateIsDirty: false
    }
  }

  componentWillMount() {
    let itemId = R.pathOr(
      false,
      ["navigation", "state", "params", "itemId"],
      this.props
    )
    if (itemId !== false) {
      let item = this.props.getItem(itemId)
      item.date = item.date || new Date()
      this.setState({ item })
    }
  }

  componentDidMount() {
    if (Platform.OS === "ios") {
      this.keyboardHideListener = Keyboard.addListener(
        "keyboardWillHide",
        this.handleKeyboardHide.bind(this)
      )
    } else if (Platform.OS === "android") {
      this.keyboardHideListener = Keyboard.addListener(
        "keyboardDidHide",
        this.handleKeyboardHide.bind(this)
      )
      BackHandler.addEventListener("hardwareBackPress", this.onBackPress)
    }
  }

  componentWillUnmount() {
    this.keyboardHideListener.remove()
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress)
  }

  onBackPress = () => {
    this.props.goBack()
    return true
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Lägg till / Ändra Värdeföremål",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  handleKeyboardHide() {
    this.setState({
      editingTitle: false,
      editingDate: false,
      editingPrice: false
    })
  }

  save() {
    this.props.updateItem(this.state.item)
  }

  editing() {
    return (
      this.state.editingTitle ||
      this.state.editingDate ||
      this.state.editingPrice
    )
  }

  isValid() {
    return R.values(R.pick(["title", "date", "price"], this.state.item)).every(
      v => v !== null && v !== ""
    )
  }

  cta() {
    if (
      this.state.item &&
      this.state.item.id &&
      this.state.formIsDirty &&
      this.isValid()
    ) {
      return <RoundedButton title="Spara" onPress={() => this.save()} />
    } else if (this.state.item && this.state.item.id) {
      return (
        // <RedRoundedInvertedButton
        //   title="Något har hänt"
        //   onPress={() => this.props.raiseAssetClaim(this.state.item)}
        // />
        null
      )
    } else {
      if (this.props.currentlyUploading) {
        return <RoundedButton title="Sparar..." disabled={true} />
      } else {
        return <RoundedButton title="Lägg till" onPress={() => this.save()} />
      }
    }
  }

  async showAndroidDatePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.state.item.date
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        this._updateDate(new Date(year, month, day), true)
      }
    } catch ({ code, message }) {
      console.error("Cannot open date picker", message) // eslint-disable-line no-console
    }
  }

  datePicker() {
    Keyboard.dismiss()

    if (Platform.OS === "ios") {
      return (
        <DatePickerIOS
          mode="date"
          ref={ref => this._datePickerIOS = ref}
          date={this.state.item.date}
          maximumDate={new Date()}
          onDateChange={date => {
            this._updateDate(date)
          }}
          onLayout={event => this._getComponentDimensions(event)}
        />
      )
    } else if (Platform.OS === "android") {
      this.showAndroidDatePicker()
    }
  }

  chooseOrDisplayImage() {
    let onPhotoPicked = result => {
      let item = this.state.item
      item.photoUrl = result.uri
      this.setState({ item })
    }
    if (this.state.item.photoUrl) {
      return (
        <TouchableOpacity onPress={() => this._pickImage(onPhotoPicked)}>
          <Image
            source={{ uri: this.state.item.photoUrl }}
            style={{ height: 200, alignSelf: "stretch", resizeMode: "cover" }}
          />
        </TouchableOpacity>
      )
    } else {
      return (
        <StyledHeaderButton onPress={() => this._pickImage(onPhotoPicked)}>
          <ChoosePhotoCircleIcon size="huge" />
          <StyledHeaderButtonText>Välj en bild</StyledHeaderButtonText>
        </StyledHeaderButton>
      )
    }
  }

  _editName = async () => {
    await this.setState({
      editingTitle: !this.state.editingTitle,
      editingDate: false,
      editingPrice: false,
      formIsDirty: true
    })
    if (this.state.editingTitle) {
      this.nameInput.focus()
    }
  }

  _updateTitle(title) {
    let item = { ...this.state.item }
    item.title = title
    this.setState({ item })
  }

  _updateDate(date, shouldClose) {
    let item = { ...this.state.item }
    item.date = date
    if (shouldClose) {
      this.setState({ item, editingDate: false })
      return
    }
    this.setState({ item })
  }

  _updatePrice(price) {
    let item = { ...this.state.item }
    item.price = price
    this.setState({ item })
  }

  _editPrice = async () => {
    await this.setState({
      editingPrice: !this.state.editingPrice,
      editingDate: false,
      editingTitle: false,
      formIsDirty: true
    })
    if (this.state.editingPrice) {
      this.priceInput.focus()
    }
  }

  _takePhoto = async onPhotoTaken => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    if (status !== "granted") {
      this.props.showDialog({
        title: "Kamera",
        paragraph:
          "Vänligen ge Hedvig tillgång till din kamera genom dina systeminställningar."
      })
    } else {
      let result = await ImagePicker.launchCameraAsync({
        // allowsEditing: true,
        aspect: [4, 3]
      })

      if (result.cancelled) {
        return
      }

      this.setState({ formIsDirty: true })
      onPhotoTaken(result)
    }
  }

  _pickImage = async onPhotoPicked => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      aspect: [4, 3]
    })

    if (result.cancelled) {
      return
    }

    this.setState({ formIsDirty: true })
    onPhotoPicked(result)
  }

  _nameInput() {
    let ButtonComponent = this.state.editingTitle
      ? DisabledInputDoneButton
      : DisabledInputEditButton
    return (
      <StyledInputContainer activeOpacity={1} onPress={() => this._editName()}>
        <StyledInputTexts>
          <StyledInputHeader>Min pryl</StyledInputHeader>
          <StyledTextInput
            innerRef={ref => (this.nameInput = ref)}
            placeholderTextColor={theme.typography.passiveText.color}
            placeholder="Lägg till prylnamn"
            editable={this.state.editingTitle}
            value={this.state.item.title}
            returnKeyType="next"
            underlineColorAndroid="transparent"
            onChangeText={text => this._updateTitle(text)}
            onSubmitEditing={() => {
              this.setState({ editingDate: true })
            }}
          />
        </StyledInputTexts>
        <ButtonComponent />
      </StyledInputContainer>
    )
  }

  _purchaseDateInput() {
    let ButtonComponent = this.state.editingDate
      ? DisabledInputDoneButton
      : DisabledInputEditButton
    let dateText = this.state.dateIsDirty
      ? moment(this.state.item.date).format("LL")
      : "Lägg till inköpsdatum"
    return (
      <StyledInputContainer
        activeOpacity={1}
        onPress={() =>
          this.setState({
            editingDate: !this.state.editingDate,
            editingTitle: false,
            editingPrice: false,
            dateIsDirty: true,
            formIsDirty: true
          })}
      >
        <StyledInputTexts>
          <StyledInputHeader>Köptes den</StyledInputHeader>
          <StyledInputText>{dateText}</StyledInputText>
        </StyledInputTexts>
        <ButtonComponent />
      </StyledInputContainer>
    )
  }

  _purchasePriceInput() {
    let ButtonComponent = this.state.editingPrice
      ? DisabledInputDoneButton
      : DisabledInputEditButton
    return (
      <StyledInputContainer activeOpacity={1} onPress={() => this._editPrice()}>
        <StyledInputTexts>
          <StyledInputHeader>Köptes för</StyledInputHeader>
          <StyledTextInput
            keyboardType="numeric"
            placeholderTextColor={theme.typography.passiveText.color}
            innerRef={ref => (this.priceInput = ref)}
            placeholder="Lägg till inköpspris"
            editable={this.state.editingPrice}
            value={this.state.item.price}
            underlineColorAndroid="transparent"
            onChangeText={price => this._updatePrice(price)}
          />
        </StyledInputTexts>
        <ButtonComponent />
      </StyledInputContainer>
    )
  }

  _receiptInput() {
    let onPhotoPickedOrTaken = result => {
      let item = this.state.item
      item.receiptUrl = result.uri
      this.setState({ item })
    }
    let message = this.state.item.receiptUrl
      ? "Kvitto tillagt"
      : "Fota kvittot för prylen"
    return (
      <StyledInputContainer
        activeOpacity={1}
        onPress={() => this._takePhoto(onPhotoPickedOrTaken)}
      >
        <StyledInputTexts>
          <StyledInputHeader>Kvitto</StyledInputHeader>
          <StyledInputText>{message}</StyledInputText>
        </StyledInputTexts>
        <InputAddIcon size="mediumBig" />
      </StyledInputContainer>
    )
  }

  _maybeCoverageInfo() {
    if (this.state.item.id && this.state.item.state === "PENDING") {
      return (
        <StyledInputContainer>
          <StyledInputTexts>
            <StyledInputHeader>Försäkrad för</StyledInputHeader>
            <StyledInputText>Stöld, skadegörelse, olycka</StyledInputText>
          </StyledInputTexts>
        </StyledInputContainer>
      )
    }
  }

  _showActionSheet(options) {
    options = options.slice()
    options.push({
      label: "Avbryt",
      onSelected: () => {}
    })
    this.props.showActionSheet(
      {
        options: R.pluck("label", options),
        cancelButtonIndex: options.length - 1
      },
      selectedIndex => R.pluck("onSelected", options)[selectedIndex]()
    )
  }

  _photoArea() {
    let onPhotoPickedOrTaken = result => {
      let item = this.state.item
      item.photoUrl = result.uri
      this.setState({ item })
    }
    let actionSheetOptions = [
      {
        label: "Fota din pryl",
        onSelected: () => this._takePhoto(onPhotoPickedOrTaken)
      },
      {
        label: "Välj en bild",
        onSelected: () => this._pickImage(onPhotoPickedOrTaken)
      }
    ]
    if (this.state.item.photoUrl) {
      return (
        <TouchableOpacity
          onPress={() => this._showActionSheet(actionSheetOptions)}
        >
          <StyledImage source={{ uri: this.state.item.photoUrl }} />
        </TouchableOpacity>
      )
    } else {
      return (
        <View>
          <StyledImageSelectionContainer>
            <StyledHeaderButton
              onPress={() => this._takePhoto(onPhotoPickedOrTaken)}
            >
              <CameraCircleIcon size="huge" />
              <StyledHeaderButtonText>Fota</StyledHeaderButtonText>
            </StyledHeaderButton>

            <StyledHeaderButton
              onPress={() => this._pickImage(onPhotoPickedOrTaken)}
            >
              <ChoosePhotoCircleIcon size="huge" />
              <StyledHeaderButtonText>Välj</StyledHeaderButtonText>
            </StyledHeaderButton>
          </StyledImageSelectionContainer>
        </View>
      )
    }
  }

  _navbar() {
    let headerRight = this.state.item.id ? (
      <DeleteButton onPress={() => this.props.deleteItem(this.state.item)} />
    ) : null
    return (
      <NavBar
        title={this.state.item.title || " "} // hide hedvig logo when no title
        headerLeft={
          <NavigateBackButton onPress={() => this.props.navigation.goBack()} />
        }
        headerRight={headerRight}
      />
    )
  }

  _maybeFooter() {
    if (this.props.keyboard.currentState.state !== "shown") {
      return (
        <StyledFooter isDatePicker={this.state.editingDate}>
          {this.state.editingDate ? this.datePicker() : this.cta()}
        </StyledFooter>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <KeyboardAwareView>
        {this._navbar()}
        {this._photoArea()}
        <StyledFormContainer>
          <View>
            {this._nameInput()}
            {this._purchaseDateInput()}
            {this._purchasePriceInput()}
            {this._receiptInput()}
            {this._maybeCoverageInfo()}
          </View>
        </StyledFormContainer>
        {this._maybeFooter()}
      </KeyboardAwareView>
    )
  }
}
