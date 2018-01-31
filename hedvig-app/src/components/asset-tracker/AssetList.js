/* global require */
import React from "react"
import {
  View, Image
} from "react-native"
import { HeaderRightChat } from "../NavBar"
import {
  StyledAssetTrackerContainer,
  StyledAssetListHeaderContainer,
  StyledAddItemText,
  StyledAssetListElement,
  StyledEmptyListText
} from "../styles/assetTracker"
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
        <StyledAssetListElement
          key={asset.id}
          onPress={() => {
            this.props.navigation.navigate("AddEditAsset", {
              itemId: asset.id
            })
          }}
        >
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
        </StyledAssetListElement>
      )
    })
    return <StyledList>{assets}</StyledList>
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
          <StyledEmptyListText>
            Här kan du logga dina prylar och kvitton. Då ser du exakt hur de täcks
            av försäkringen och kan anmäla en skada superenkelt{"\n\n"}

            Det är inget måste, men kan vara{"\n"}skönt att ha koll ✌️
          </StyledEmptyListText>
        </View>
      )
    }
  }

  render() {
    return (
      <StyledAssetTrackerContainer>
        <StyledListHeader>
          <StyledAssetListHeaderContainer>
            <StyledAddItemText>Lägg till pryl</StyledAddItemText>
            <AddButton
              onPress={() => this.props.navigation.navigate("AddEditAsset")}
            />
          </StyledAssetListHeaderContainer>
        </StyledListHeader>
        {this.maybeList()}
      </StyledAssetTrackerContainer>
    )
  }
}
