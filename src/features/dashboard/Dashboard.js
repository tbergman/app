/* global require */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { PerilsCategory } from './components/PerilsCategory';
import { Loader } from '../../components/Loader';

import {
  StyledDashboardHeaderOffWhite,
  StyledDashboardHeaderRowLessMargin,
  StyledDashboardHeaderItem,
  StyledDashboardContainer,
  StyledCategoriesContainer,
  StyledDashboardHeaderIcon,
  StyledConditionRow,
} from './styles/dashboard';
import { StyledPassiveText, StyledHeading } from '../../components/styles/text';

import { INSURANCE_TYPES } from '../../constants';
import { insuranceActions } from '../../../hedvig-redux';

class Dashboard extends React.Component {
  renderCategories() {
    let categories = this.props.categories.map(
      ({ title, description, perils, iconUrl }, i) => {
        return (
          <PerilsCategory
            title={title}
            description={description}
            perils={perils}
            iconUrl={iconUrl}
            key={i}
            navigation={this.props.navigation}
          />
        );
      },
    );
    return <StyledCategoriesContainer>{categories}</StyledCategoriesContainer>;
  }

  statusIcon() {
    const imageModule = {
      ACTIVE: require('../../../assets/icons/my_insurance/aktiv.png'),
      PENDING: require('../../../assets/icons/edit_perils/added_peril.png'),
      INACTIVE: require('../../../assets/icons/edit_perils/added_peril.png'),
    }[this.props.insurance.status];
    return <StyledDashboardHeaderIcon source={imageModule} />;
  }

  statusText() {
    return {
      ACTIVE: 'Aktiv',
      PENDING: 'På gång',
      INACTIVE: 'Aktiveras snart',
    }[this.props.insurance.status];
  }

  render() {
    // WARNING: Change this to loading state based on the request or something
    // more robust
    if (!this.props.categories || !this.props.categories.length) {
      return <Loader />;
    }

    return (
      <StyledDashboardContainer style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <StyledDashboardHeaderOffWhite>
            <StyledDashboardHeaderRowLessMargin>
              <StyledHeading>Min hemförsäkring</StyledHeading>
              <StyledDashboardHeaderItem>
                {this.statusIcon()}
                <StyledPassiveText>{this.statusText()}</StyledPassiveText>
              </StyledDashboardHeaderItem>
            </StyledDashboardHeaderRowLessMargin>
          </StyledDashboardHeaderOffWhite>

          {this.renderCategories()}

          <View>
            <View style={{ marginLeft: 24 }}>
              <StyledConditionRow>
                <StyledDashboardHeaderIcon
                  source={require('../../../assets/icons/my_insurance/pris.png')}
                />
                <StyledPassiveText>Din självrisk är 1 500 kr</StyledPassiveText>
              </StyledConditionRow>
              {this.props.insurance.insuranceType === INSURANCE_TYPES.BRF ||
              this.props.insurance.insuranceType ===
                INSURANCE_TYPES.SUBLET_BRF ? (
                <StyledConditionRow>
                  <StyledDashboardHeaderIcon
                    source={require('../../../assets/icons/my_insurance/aktiv.png')}
                  />
                  <StyledPassiveText>
                    Lägenheten försäkras till sitt fulla värde
                  </StyledPassiveText>
                </StyledConditionRow>
              ) : null}
              <StyledConditionRow>
                <StyledDashboardHeaderIcon
                  source={require('../../../assets/icons/my_insurance/pris.png')}
                />
                <StyledPassiveText>
                  Prylarna försäkras till totalt 1 000 000 kr
                </StyledPassiveText>
              </StyledConditionRow>
              <StyledConditionRow>
                <StyledDashboardHeaderIcon
                  source={require('../../../assets/icons/my_insurance/worldwide.png')}
                />
                <StyledPassiveText>
                  Gäller på resor varsomhelst i världen
                </StyledPassiveText>
              </StyledConditionRow>
            </View>
            <View
              style={{
                alignSelf: 'stretch',
                height: this.props.extraScrollViewPadding || 0,
              }}
            />
          </View>
        </ScrollView>
      </StyledDashboardContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    insurance: state.insurance,
    categories: state.insurance.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInsurance: () => dispatch(insuranceActions.getInsurance()),
  };
};

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);

export default DashboardContainer;
