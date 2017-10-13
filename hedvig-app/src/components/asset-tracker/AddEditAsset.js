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
  Keyboard
} from "react-native"
import { Link, ClaimLink } from "../../containers/Link"
import { HeaderRightChat } from "../NavBar"
import { Textplainer } from "../Placeholder"
import { Placeholder } from "../Styles"
import { ImagePicker, Permissions } from "expo"
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
      editingPrice: false
    }
  }

  componentWillMount() {
    let itemId = R.pathOr(
      false,
      ["navigation", "state", "params", "itemId"],
      this.props
    )
    if (itemId !== false) {
      this.setState({
        item: this.props.getItem(itemId)
      })
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
    if (this.state.item && this.isValid()) {
      return <Button title="Spara" onPress={() => this.save()} />
    }
    return (
      <Button title="Avbryt" onPress={() => this.props.navigation.goBack()} />
    )
  }

  maybeClaimButton() {
    if (!R.isNil(this.state.item.id)) {
      return (
        <Button
          title="Rapportera skada"
          onPress={() => this.props.raiseAssetClaim(this.state.item)}
        />
      )
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

  maybeDatePicker() {
    if (this.state.editingDate) {
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
  }

  chooseOrDisplayImage() {
    if (this.state.item.imageUrl) {
      return (
        <TouchableOpacity onPress={this._pickImage}>
          <Image
            source={{ uri: this.state.item.imageUrl }}
            style={{ height: 200, alignSelf: "stretch", resizeMode: "cover" }}
          />
        </TouchableOpacity>
      )
    } else {
      return <Button title="Välj en bild" onPress={this._pickImage} />
    }
  }

  _editName = async () => {
    await this.setState({
      editingTitle: !this.state.editingTitle,
      editingDate: false,
      editingPrice: false
    })
    if (this.state.editingTitle) {
      this.refs.nameInput.focus()
    }
  }

  _updateTitle(title) {
    let item = this.state.item
    item.title = title
    this.setState({ item })
  }

  _updateDate(date) {
    console.log("Selected date" + date.toString())
    let item = this.state.item
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
      editingTitle: false
    })
    if (this.state.editingPrice) {
      this.refs.priceInput.focus()
    }
  }

  _takePhoto = async () => {
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

    let item = this.state.item
    item.imageUrl = result.uri
    this.setState({ item })
  }

  _pickImage = async () => {
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

    let item = this.state.item
    item.imageUrl = result.uri
    this.setState({ item })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>
          {this.state.item.title || "Ny pryl"}
        </Text>
        <View style={{ flex: 1 }}>
          <Button title="Fota din pryl" onPress={this._takePhoto} />
          {this.chooseOrDisplayImage()}
          <View>
            <Text>Pryl</Text>
            <TextInput
              ref="nameInput"
              placeholder="Namnge din pryl"
              editable={this.state.editingTitle}
              value={this.state.item.title}
              returnKeyType="next"
              onChangeText={text => this._updateTitle(text)}
              onSubmitEditing={event => {
                this.setState({ editingDate: true })
              }}
            />
            <Button
              title={this.state.editingTitle ? "Ok" : "Ändra namn"}
              onPress={() => this._editName()}
            />
            <Text>Inköpt</Text>
            <Text>
              {this.state.item.date
                ? this.state.item.date.toString()
                : "Ange inköpsdatum"}
            </Text>
            <Button
              title={this.state.editingDate ? "Ok" : "Ändra datum"}
              onPress={() =>
                this.setState({
                  editingDate: !this.state.editingDate,
                  editingTitle: false,
                  editingPrice: false
                })}
            />
            {this.maybeDatePicker()}
            <Text>Inköpspris</Text>
            <TextInput
              ref="priceInput"
              keyboardType="numeric"
              placeholder="Ange ditt inköpspris"
              editable={this.state.editingPrice}
              value={this.state.item.price}
              onChangeText={price => this._updatePrice(price)}
            />
            <Button
              title={this.state.editingPrice ? "Ok" : "Ändra pris"}
              onPress={() => this._editPrice()}
            />
          </View>
        </View>
        {this.cta()}
        {this.maybeClaimButton()}
      </View>
    )
  }
}
