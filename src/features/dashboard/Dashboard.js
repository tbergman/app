/* global require */
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
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

import { insuranceActions } from '../../../hedvig-redux';
import { isApartmentOwner, isStudentInsurance } from 'src/utils';

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  footnotesContainer: { marginLeft: 24 },
  bottomPadder: { alignSelf: 'stretch', height: 80 },
});

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
      INACTIVE_WITH_START_DATE: require('../../../assets/icons/my_insurance/startdatum_idle.png'),
      INACTIVE: require('../../../assets/icons/edit_perils/added_peril.png'),
    }[this.props.insurance.status];
    return <StyledDashboardHeaderIcon source={imageModule} />;
  }

  render() {
    // WARNING: Change this to loading state based on the request or something
    // more robust
    if (!this.props.categories || !this.props.categories.length) {
      return <Loader />;
    }
    const { insurance } = this.props;

    return (
      <StyledDashboardContainer>
        <ScrollView style={styles.scroll}>
          <StyledDashboardHeaderOffWhite>
            <StyledDashboardHeaderRowLessMargin>
              <StyledHeading>Min hemförsäkring</StyledHeading>
              <StyledDashboardHeaderItem>
                {this.statusIcon()}
                <StyledPassiveText>
                  {this.props.insurance.statusDescription}
                </StyledPassiveText>
              </StyledDashboardHeaderItem>
            </StyledDashboardHeaderRowLessMargin>
          </StyledDashboardHeaderOffWhite>

          {this.renderCategories()}

          <View>
            <View style={styles.footnotesContainer}>
              <StyledConditionRow>
                <StyledDashboardHeaderIcon
                  source={require('../../../assets/icons/my_insurance/pris.png')}
                />
                <StyledPassiveText>Din självrisk är 1 500 kr</StyledPassiveText>
              </StyledConditionRow>
              {isApartmentOwner(insurance) ? (
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
                  Prylarna försäkras till totalt{' '}
                  {isStudentInsurance(insurance)
                    ? '200 000 kr'
                    : '1 000 000 kr'}
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
            <View style={styles.bottomPadder} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
