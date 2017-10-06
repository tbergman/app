import React from "react"
import { View, Text, Button, TextInput, DatePickerIOS, Image, TouchableOpacity } from "react-native"
import { Link, ClaimLink } from "../../containers/Link"
import { HeaderRightChat } from "../NavBar"
import { Textplainer } from "../Placeholder"
import { Placeholder } from "../Styles"
import { ImagePicker, Permissions } from "expo"
const R = require("ramda")

export default class AddEditAsset extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      item: {},
      editingName: false,
      editingDate: false,
      editingPrice: false
    }
  }

  componentWillMount() {
    let itemId = R.pathOr(false, ["navigation", "state", "params", "itemId"], this.props)
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
    this.props.navigation.navigate("AssetList")
  }

  editing() {
    return this.state.editingName || this.state.editingDate || this.state.editingPrice
  }

  cta() {
    if (this.state.item) {
      if (this.editing()) {
        return <Button title="Spara" onPress={() => this.save()} />
      }
    }
  }

  maybeClaimButton() {
    if (!R.isEmpty(this.state.item)) {
      return <Button title="Rapportera skada" onPress={() => console.log("Rapportera skada pressed")} />
    }
  }

  _onDateChange(date) {

  }

  maybeDatePicker() {
    if (this.state.editingDate) {
      return (
        <DatePickerIOS
          ref="DatePickerIOS"
          mode="date"
          date={ new Date() }
          maximumDate={ new Date() }
          onDateChange={ (date) => this._onDateChange(date) }
          onLayout={ (event) => this._getComponentDimensions(event) }
      />
      )
    }
  }

  chooseOrDisplayImage() {
    if (this.state.item.imageUrl) {
      return (
        <TouchableOpacity onPress={this._pickImage}>
          <Image source={{uri: this.state.item.imageUrl}} style={{ height: 200, alignSelf: "stretch", resizeMode: "cover"}} />
        </TouchableOpacity>
      )
    } else {
      return <Button title="Välj en bild" onPress={this._pickImage} />
    }
  }

  _editName = async () => {
    await this.setState({editingName: !this.state.editingName})
    if (this.state.editingName) {
      this.refs.nameInput.focus()
    }
  }

  _editPrice = async () => {
    await this.setState({editingPrice: !this.state.editingPrice})
    if (this.state.editingPrice) {
      this.refs.priceInput.focus()
    }
  }

  _takePhoto = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Hey! You might want to enable notifications for my app, they are good.');
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      console.log('launchCameraAsync cancelled');
      return;
    }

    let item = this.state.item
    item.imageUrl = result.uri
    this.setState({ item })
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      console.log('launchImageLibraryAsync cancelled');
      return;
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
      <View style={{flex: 1}}>
        <Text>{this.state.item.name || "Ny pryl"}</Text>
        <View style={{flex: 1}}>
          <Button title="Fota din pryl" onPress={this._takePhoto} />
          {this.chooseOrDisplayImage()}
          <View>
            <Text>Pryl</Text>
            <TextInput ref="nameInput" placeholder="Namnge din pryl" editable={this.state.editingName} value={this.state.item.name} returnKeyType="next" onSubmitEditing={(event) => {
              this.setState({editingDate: true})
            }} />
            <Button title={this.state.editingName ? "Ok" : "Ändra namn"} onPress={() => this._editName()} />
            <Text>Inköpt</Text>
            <Text>Ange inköpsdatum</Text>
            <Button title={this.state.editingDate ? "Ok" : "Ändra datum"} onPress={() => this.setState({editingDate: !this.state.editingDate})} />
            {this.maybeDatePicker()}
            <Text>Inköpspris</Text>
            <TextInput ref="priceInput" keyboardType="numeric" placeholder="Ange ditt inköpspris" editable={this.state.editingPrice} returnKeyType="next" value={this.state.item.price} />
            <Button title={this.state.editingPrice ? "Ok" : "Ändra pris"} onPress={() => this._editPrice()} />
          </View>
        </View>
        {this.cta()}
        {this.maybeClaimButton()}
      </View>
    )
  }
}
