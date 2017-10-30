import React from "react"
import {
  Button,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  View
} from "react-native"
import { Link } from "../../containers/Link"
import { HeaderRightChat } from "../NavBar"
import { Textplainer } from "../Placeholder"
import { Placeholder } from "../Styles"
import {
  StyledAssetTrackerContainer,
  StyledAssetListHeaderContainer,
  StyledAddItemText
} from "../styles/assetTracker"
import {
  StyledListHeader,
  StyledList,
  StyledListElement,
  StyledListElementImage,
  StyledListElementTexts,
  StyledListElementHeading,
  StyledListElementText,
  StyledRowButton
} from "../styles/list"
import { AddButton, DisabledListNextButton } from "../Button"

export default class AssetList extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Dina värdeföremål",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  componentWillMount() {
    // this.props.getAssets()
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
    let assets = this.props.assets.map((asset, i) => {
      return (
        <TouchableOpacity
          key={i}
          onPress={() => {
            this.props.navigation.navigate("AddEditAsset", {
              itemId: asset.id
            })
          }}
        >
          <StyledListElement>
            <StyledListElementImage
              source={{ uri: "https://unsplash.it/40/40" }}
            />
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
          </StyledListElement>
        </TouchableOpacity>
      )
    })
    return <StyledList>{assets}</StyledList>
  }

  maybeList() {
    if (this.props.assets.length > 0) {
      return this._assetList()
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
