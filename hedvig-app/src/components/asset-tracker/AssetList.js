/* global require */
import React from "react"
import {
  View, Text, Image, StyleSheet, TouchableOpacity
} from "react-native"
import { HeaderRightChat } from "../NavBar"
import {
  StyledListHeader,
  StyledList,
  StyledListElementImage,
  StyledListElementTexts,
  StyledListElementHeading,
  StyledListElementText,
  StyledRowButton
} from "../styles/list"
import { AddButton, DisabledListNextButton } from "../Button"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  assetListElement: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F9FAFC",
  },
  addItemText: {
    fontFamily: "circular",
    color: "#9B9BAA",
    fontSize: 16,
  },
  emptyListText: {
    fontFamily: "circular",
    marginTop: 20,
    marginRight: 30,
    marginBottom: 30,
    marginLeft: 20,
    color: "#9B9BAA",
    fontSize: 16,
    lineHeight: 20,
    textAlign: "center",
    paddingBottom: 40,
  }
})

export default class AssetList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Dina värdeföremål",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  componentWillMount() {
    this.props.getAssets()
  }

  _assetState(state) {
    return {
      CREATED: "Info saknas",
      PENDING: "Behandlas av Hedvig",
      WAITING_FOR_PAYMENT: "Inväntar betalning",
      NOT_COVERED: "Ej försäkrad",
      COVERED: "Försäkrad"
    }[state]
  }

  _assetList() {
    let assets = this.props.assets.map((asset) => {
      return (
        <TouchableOpacity style={styles.assetListElement}
          key={asset.id}
          onPress={() => {
            this.props.navigation.navigate("AddEditAsset", {
              itemId: asset.id
            })
          }}>
          <StyledListElementImage source={{ uri: asset.photoUrl }} />
          <StyledListElementTexts>
            <StyledListElementHeading>
              {asset.title || `Namnlös pryl`}
            </StyledListElementHeading>
            <StyledListElementText>
              {this._assetState(asset.state)}
            </StyledListElementText>
          </StyledListElementTexts>
          <StyledRowButton>
            <DisabledListNextButton />
          </StyledRowButton>
        </TouchableOpacity>
      )
    })
    return (
      <StyledList>
        {assets}
        <Text style={styles.emptyListText}>Logga om du vill, dina prylar täcks ändå ✌️</Text>
      </StyledList>
    )
  }

  maybeList() {
    if (this.props.assets.length > 0) {
      return this._assetList()
    } else {
      return (
        <View style={{justifyContent: "center", height: "auto", flex: 1}}>
          <View style={{justifyContent: "center", alignItems: "center"}}>
            <Image
              source={require("../../../assets/asset-tracker-bicycle.png")}
              style={{
                width: 219,
                height: 150,
              }}
            />
          </View>
          <Text style={styles.emptyListText}>
            Här kan du logga dina prylar och kvitton. Då ser du exakt hur de täcks
            av försäkringen och kan anmäla en skada superenkelt{"\n\n"}

            Det är inget måste, men kan vara{"\n"}skönt att ha koll ✌️
          </Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StyledListHeader>
          <View style={styles.headerContainer}>
            <Text style={styles.addItemText}>Lägg till pryl</Text>
            <AddButton
              onPress={() => this.props.navigation.navigate("AddEditAsset")}
            />
          </View>
        </StyledListHeader>
        {this.maybeList()}
      </View>
    )
  }
}
