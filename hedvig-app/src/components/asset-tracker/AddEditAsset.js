import React from "react"
import {
  View,
  Text,
  Button,
  TextInput,
  DatePickerIOS,
  DatePickerAndroid,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
  ActionSheetIOS,
  Clipboard
} from "react-native"
import { Link, ClaimLink } from "../../containers/Link"
import { HeaderRightChat } from "../NavBar"
import { NavBar } from "../NavBar"
import { Textplainer } from "../Placeholder"
import { Placeholder } from "../Styles"
import { ImagePicker, Permissions } from "expo"
import {
  StyledAssetTrackerContainer,
  StyledImageSelectionContainer,
  StyledHeaderButton,
  StyledHeaderButtonText,
  StyledImage,
  StyledFormContainer,
  StyledInputContainer,
  StyledInputTexts,
  StyledInputHeader,
  StyledInputText,
  StyledInputPlaceholderText,
  StyledTextInput,
  StyledFooter
} from "../styles/assetTracker"
import { CameraCircleIcon, ChoosePhotoCircleIcon, InputAddIcon } from "../Icon"
import {
  NavigateBackButton,
  DeleteButton,
  InputEditButton,
  InputDoneButton,
  RoundedButton,
  RedRoundedInvertedButton,
  DisabledListNextButton
} from "../Button"
import { theme } from "hedvig-style"
import moment from "moment"
import "moment/locale/sv"
const R = require("ramda")

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

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Lägg till / Ändra Värdeföremål",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  save() {
    this.props.updateItem(this.state.item)
    this.props.navigation.goBack()
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
        <RedRoundedInvertedButton
          title="Anmäl skada"
          onPress={() => this.props.raiseAssetClaim(this.state.item)}
        />
      )
    } else {
      return <RoundedButton title="Lägg till" onPress={() => this.save()} />
    }
  }

  async showAndroidDatePicker() {
    this.setState({ editingDate: false })
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: this.state.item.date
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        this._updateDate(new Date(year, month, day))
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message)
    }
  }

  datePicker() {
    Keyboard.dismiss()

    if (Platform.OS === "ios") {
      return (
        <DatePickerIOS
          ref="DatePickerIOS"
          mode="date"
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
    let item = this.state.item
    item.title = title
    this.setState({ item })
  }

  _updateDate(date) {
    console.log("Selected date" + date.toString())
    let item = this.state.item.date
    item.date = date
    this.setState({ item })
  }

  _updatePrice(price) {
    let item = this.state.item
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
    const { status } = await Permissions.getAsync(Permissions.CAMERA)
    if (status !== "granted") {
      alert(
        "Hey! You might want to enable notifications for my app, they are good."
      )
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    })

    if (result.cancelled) {
      console.log("launchCameraAsync cancelled")
      return
    }

    this.setState({ formIsDirty: true })
    onPhotoTaken(result)
  }

  _pickImage = async onPhotoPicked => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      aspect: [4, 3]
    })

    if (result.cancelled) {
      console.log("launchImageLibraryAsync cancelled")
      return
    }

    // let resizedUri = await new Promise((resolve, reject) => {
    //   ImageEditor.cropImage(result.uri,
    //     {
    //       offset: { x: 0, y: 0 },
    //       size: { width: result.width, height: result.height },
    //       displaySize: { width: 50, height: 50 },
    //       resizeMode: 'contain',
    //     },
    //     (uri) => resolve(uri),
    //     () => reject(),
    //   );
    // });

    // this gives you a rct-image-store URI or a base64 image tag that
    // you can use from ImageStore

    this.setState({ formIsDirty: true })
    onPhotoPicked(result)
  }

  _nameInput() {
    let ButtonComponent = this.state.editingTitle
      ? InputDoneButton
      : InputEditButton
    return (
      <StyledInputContainer>
        <StyledInputTexts>
          <StyledInputHeader>Pryl</StyledInputHeader>
          <StyledTextInput
            innerRef={ref => (this.nameInput = ref)}
            placeholderTextColor={theme.typography.passiveText.color}
            placeholder="Namnge din pryl"
            editable={this.state.editingTitle}
            value={this.state.item.title}
            returnKeyType="next"
            onChangeText={text => this._updateTitle(text)}
            onSubmitEditing={event => {
              this.setState({ editingDate: true })
            }}
          />
        </StyledInputTexts>
        <ButtonComponent onPress={() => this._editName()} />
      </StyledInputContainer>
    )
  }

  _purchaseDateInput() {
    let ButtonComponent = this.state.editingDate
      ? InputDoneButton
      : InputEditButton
    let dateText = this.state.dateIsDirty
      ? moment(this.state.item.date).format("LL")
      : "Ange inköpsdatum"
    return (
      <StyledInputContainer>
        <StyledInputTexts>
          <StyledInputHeader>Inköpt</StyledInputHeader>
          <StyledInputText>{dateText}</StyledInputText>
        </StyledInputTexts>
        <ButtonComponent
          onPress={() =>
            this.setState({
              editingDate: !this.state.editingDate,
              editingTitle: false,
              editingPrice: false,
              dateIsDirty: true,
              formIsDirty: true
            })}
        />
      </StyledInputContainer>
    )
  }

  _purchasePriceInput() {
    let ButtonComponent = this.state.editingPrice
      ? InputDoneButton
      : InputEditButton
    return (
      <StyledInputContainer>
        <StyledInputTexts>
          <StyledInputHeader>Inköpspris</StyledInputHeader>
          <StyledTextInput
            keyboardType="numeric"
            placeholderTextColor={theme.typography.passiveText.color}
            innerRef={ref => (this.priceInput = ref)}
            placeholder="Ange inköpspris"
            editable={this.state.editingPrice}
            value={this.state.item.price}
            onChangeText={price => this._updatePrice(price)}
          />
        </StyledInputTexts>
        <ButtonComponent onPress={() => this._editPrice()} />
      </StyledInputContainer>
    )
  }

  _receiptInput() {
    let onPhotoPickedOrTaken = result => {
      let item = this.state.item
      console.log(result.uri)
      item.receiptUrl = result.uri
      this.setState({ item })
    }
    let actionSheetOptions = [
      {
        label: "Fota kvitto",
        onSelected: () => this._pickImage(onPhotoPickedOrTaken)
      },
      {
        label: "Kopiera kvitton@hedvig.com",
        onSelected: () => {
          Clipboard.setString("kvitton@hedvig.com")
          this.props.setStatusMessage("kvitton@hedvig.com kopierat")
        }
      }
    ]
    let message = this.state.item.receiptUrl
      ? "Kvitto fotat"
      : "Fota eller maila ditt kvitto"
    return (
      <TouchableOpacity
        onPress={() => this._showActionSheet(actionSheetOptions)}
      >
        <StyledInputContainer>
          <StyledInputTexts>
            <StyledInputHeader>Kvitto</StyledInputHeader>
            <StyledInputText>{message}</StyledInputText>
          </StyledInputTexts>
          <InputAddIcon size="mediumBig" />
        </StyledInputContainer>
      </TouchableOpacity>
    )
  }

  _maybeCoverageInfo() {
    if (this.state.item.id && this.state.item.state === "PENDING") {
      return (
        <StyledInputContainer>
          <StyledInputTexts>
            <StyledInputHeader>Försäkrad för</StyledInputHeader>
            <StyledInputText>Stäld, skadegörelse, olycka</StyledInputText>
          </StyledInputTexts>
        </StyledInputContainer>
      )
    }
  }

  _showActionSheet(options) {
    options = options.slice()
    options.push({
      label: "Avbryt",
      onSelected: () => console.log("Action sheet cancelled")
    })
    ActionSheetIOS.showActionSheetWithOptions(
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
              <StyledHeaderButtonText>Fota din pryl</StyledHeaderButtonText>
            </StyledHeaderButton>

            <StyledHeaderButton
              onPress={() => this._pickImage(onPhotoPickedOrTaken)}
            >
              <ChoosePhotoCircleIcon size="huge" />
              <StyledHeaderButtonText>Välj en bild</StyledHeaderButtonText>
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
        title={this.state.item.title || "Ny pryl"}
        headerLeft={
          <NavigateBackButton onPress={() => this.props.navigation.goBack()} />
        }
        headerRight={headerRight}
      />
    )
  }

  _footer() {
    return (
      <StyledFooter>
        {this.state.editingDate ? this.datePicker() : this.cta()}
      </StyledFooter>
    )
  }

  render() {
    return (
      <StyledAssetTrackerContainer>
        {this._navbar()}
        {this._photoArea()}
        <StyledFormContainer>
          <View>
            {this._nameInput()}
            {this._maybeCoverageInfo()}
            {this._purchaseDateInput()}
            {this._purchasePriceInput()}
            {this._receiptInput()}
          </View>
        </StyledFormContainer>
        {this._footer()}
      </StyledAssetTrackerContainer>
    )
  }
}
