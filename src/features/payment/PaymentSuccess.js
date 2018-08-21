import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from '@emotion/primitives';

import { colors } from '../../style';
import { Spacing } from '../../components/Spacing';
import { CircledCheckmark } from '../../components/icons/CircledCheckmark';

const Container = styled(View)({
  padding: 20,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const Title = styled(Text)({
  fontFamily: 'Merriweather-Light',
  fontSize: 35,
  color: colors.GREEN,
});

const Body = styled(Text)({
  fontFamily: 'CircularStd-Book',
  fontSize: 18,
  color: colors.BLACK,
  textAlign: 'center',
  maxWidth: '80%',
});

const Button = styled(TouchableOpacity)({
  borderRadius: 40,
  padding: 20,
  paddingRight: 40,
  paddingLeft: 40,
  backgroundColor: colors.GREEN,
});

const ButtonText = styled(Text)({
  color: colors.WHITE,
  fontSize: 18,
  fontFamily: 'CircularStd-Book',
});

export const PaymentSuccess = ({ onPressContinue }) => (
  <Container>
    <CircledCheckmark height={100} width={100} />
    <Spacing height={20} />
    <Title>Autogirot aktivt</Title>
    <Spacing height={20} />
    <Body>
      Hedvig kommer att synas på ditt kontoutdrag när vi tar betalt varje månad.
    </Body>
    <Spacing height={25} />
    <Button onPress={onPressContinue}>
      <ButtonText>Tillbaka till chatten</ButtonText>
    </Button>
  </Container>
);
