import * as React from 'react';
import {
  Animated,
  ScrollView,
  ScrollViewProps,
  View,
  ViewProps,
} from 'react-native';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Insurance } from 'src/graphql/types';
import { PriceBubble } from 'src/features/new-offer/components/price-bubble';
import { FeaturesBubbles } from 'src/features/new-offer/components/features-bubbles';
import { AnimationValueProvider } from 'animated-react-native-components';
import { Spacing } from 'src/components/Spacing';
import { ScrollContent } from 'src/features/new-offer/components/scroll-content';
import { Checkout } from 'src/features/new-offer/components/checkout';
import { NavigationOptions } from 'src/navigation/options';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { SignButton } from 'src/features/new-offer/components/sign-button';
import { PerilsDialog } from 'src/features/offer/containers/PerilsDialog';

const AnimatedScrollView = Animated.createAnimatedComponent<ScrollViewProps>(
  ScrollView,
);

const AnimatedView = Animated.createAnimatedComponent<ViewProps>(View);

const ScrollContainer = styled(AnimatedScrollView)({
  backgroundColor: colors.BLACK_PURPLE,
});

interface FixedContainerProps {
  animatedValue: Animated.Value;
}

const FixedContainer = styled(AnimatedView)(
  ({ animatedValue }: FixedContainerProps) => ({
    alignItems: 'center',
    transform: [
      {
        translateY: Animated.divide(animatedValue, new Animated.Value(1.25)),
      },
    ],
  }),
);

interface FeaturesContainer {
  animatedValue: Animated.Value;
}

const FeaturesContainer = styled(AnimatedView)(
  ({ animatedValue }: FeaturesContainer) => ({
    transform: [
      {
        translateY: Animated.divide(
          animatedValue,
          new Animated.Value(2),
        ).interpolate({
          inputRange: [-500, 0],
          outputRange: [180, 0],
          extrapolateRight: 'clamp',
        }),
      },
    ],
  }),
);

const getScrollHandler = (animatedValue: Animated.Value) =>
  Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: animatedValue,
          },
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

const INSURANCE_QUERY = gql`
  query insurance {
    insurance {
      address
      monthlyCost
      personsInHousehold
      insuredAtOtherCompany
      type
    }
  }
`;

interface ScrollToParams {
  x: number;
  y: number;
  animated: boolean;
}

interface ScrollViewElement {
  scrollTo: (params: ScrollToParams) => void;
}

interface AnimatedScrollViewComponent {
  getNode: () => ScrollViewElement;
}

const NewOfferRef = React.createRef<AnimatedScrollViewComponent>();

export const NewOffer: React.SFC = () => (
  <Query<{ insurance: Insurance }> query={INSURANCE_QUERY}>
    {({ data, loading, error }) =>
      loading || error ? null : (
        <>
          <AnimationValueProvider initialValue={0}>
            {({ animatedValue }) => (
              <>
                <ScrollContainer
                  onScroll={getScrollHandler(animatedValue)}
                  scrollEventThrottle={1}
                  contentContainerStyle={{
                    alignItems: 'center',
                  }}
                  innerRef={NewOfferRef}
                >
                  <FixedContainer animatedValue={animatedValue}>
                    <Spacing height={15} />
                    <PriceBubble price={data!.insurance.monthlyCost!} />
                    <Spacing height={15} />
                    <FeaturesContainer animatedValue={animatedValue}>
                      <FeaturesBubbles
                        onPress={() => {
                          NewOfferRef.current!.getNode().scrollTo({
                            x: 0,
                            y: -25,
                            animated: true,
                          });

                          setTimeout(() => {
                            NewOfferRef.current!.getNode().scrollTo({
                              x: 0,
                              y: 0,
                              animated: true,
                            });
                          }, 250);
                        }}
                        personsInHousehold={data!.insurance.personsInHousehold!}
                        insuredAtOtherCompany={
                          data!.insurance.insuredAtOtherCompany!
                        }
                        type={data!.insurance.type!}
                      />
                    </FeaturesContainer>
                  </FixedContainer>
                  <ScrollContent scrollAnimatedValue={animatedValue} />
                </ScrollContainer>
                <SignButton scrollAnimatedValue={animatedValue} />
              </>
            )}
          </AnimationValueProvider>
          <TranslationsConsumer textKey="OFFER_TITLE">
            {(title) => (
              <NavigationOptions
                options={{
                  topBar: {
                    title: { text: title },
                    subtitle: { text: data!.insurance.address! },
                  },
                }}
              />
            )}
          </TranslationsConsumer>
          <Checkout />
          <PerilsDialog />
        </>
      )
    }
  </Query>
);
