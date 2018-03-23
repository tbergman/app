import React from 'react';
import { View } from 'react-native';
import { Peril } from '../../components/dashboard/Peril';
import {
  StyledCategoryContainer,
  StyledCategoryHeader,
  StyledCategoryIcon,
  StyledCategoryTextContainer,
  StyledExpandButton,
  StyledPerilsContainer,
  StyledPerilsRow,
  StyledCategoryTextAndButton,
  StyledPerilsHelpText,
} from '../styles/dashboard';
import { DisabledCollapseButton, DisabledExpandButton } from '../Button';
import { StyledRow } from '../styles/general';
import {
  StyledHeading,
  StyledPassiveText,
  StyledSmallPassiveText,
} from '../styles/text';

const coveredStates = ['COVERED', 'ADD_REQUESTED', 'ADD_PENDING'];

export const coveredPerils = (perils, title, navigation) => {
  return perils
    .filter(peril => coveredStates.includes(peril.state))
    .map((peril, index) => (
      <Peril
        peril={peril}
        key={index}
        navigation={navigation}
        categoryPerils={perils}
        categoryTitle={title}
        perilIndex={perils.findIndex(p => p.id === peril.id)}
      />
    ));
};

export class PerilsCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCategory: props.offerMode === true,
    };
  }

  render() {
    let CollapseButton = this.state.showCategory
      ? DisabledCollapseButton
      : DisabledExpandButton;
    return (
      <StyledCategoryContainer
        activeOpacity={1}
        onPress={() =>
          !this.props.offerMode &&
          this.setState({ showCategory: !this.state.showCategory })
        }
      >
        <StyledCategoryHeader>
          <StyledCategoryIcon source={{ uri: this.props.iconUrl }} />
          <StyledCategoryTextAndButton>
            <StyledCategoryTextContainer>
              <StyledRow>
                <StyledHeading>{this.props.title}</StyledHeading>
              </StyledRow>
              <StyledRow>
                <StyledPassiveText>
                  {this.props.description}
                  {!this.props.offerMode && this.state.showCategory
                    ? ':'
                    : null}
                </StyledPassiveText>
              </StyledRow>
            </StyledCategoryTextContainer>
            {!this.props.offerMode ? (
              <StyledExpandButton>
                <CollapseButton size="mediumBig" />
              </StyledExpandButton>
            ) : null}
          </StyledCategoryTextAndButton>
        </StyledCategoryHeader>
        {this.state.showCategory && (
          <ExpandedPerilsCategory>
            {coveredPerils(
              this.props.perils,
              this.props.title,
              this.props.navigation,
            )}
          </ExpandedPerilsCategory>
        )}
      </StyledCategoryContainer>
    );
  }
}

export const ExpandedPerilsCategory = props => (
  <View>
    <StyledPerilsContainer>
      <StyledPerilsRow>{props.children}</StyledPerilsRow>
    </StyledPerilsContainer>
    <StyledPerilsHelpText>
      <StyledSmallPassiveText>
        Klicka på ikonerna för mer info
      </StyledSmallPassiveText>
    </StyledPerilsHelpText>
  </View>
);
