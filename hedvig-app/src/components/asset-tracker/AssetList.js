import React from "react"
import {
  View
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
        <View>
          <StyledEmptyListText>
            Om du vill kan du logga saker och deras kvitton här. Då får du
            koll precis hur de är försäkrade, och kan anmäla en skada
            superenkelt
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
