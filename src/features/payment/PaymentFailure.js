import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from '@sampettersson/primitives';

import { colors } from '@hedviginsurance/brand';
import { Spacing } from '../../components/Spacing';

import { CircledCross } from '../../components/icons/CircledCross';

const Container = styled(View)({
  padding: 20,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const Title = styled(Text)({
  fontFamily: 'Merriweather-Light',
  fontSize: 35,
  color: colors.PINK,
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

export const PaymentFailure = ({ onPressContinue }) => (
  <Container>
    <CircledCross width={100} height={100} />
    <Spacing height={20} />
    <Title>Något gick fel</Title>
    <Spacing height={20} />
    <Body>
      Inga pengar kommer att dras.
      {'\n'}
      {'\n'}
      Du kan gå tillbaka till chatten för att försöka igen.
    </Body>
    <Spacing height={25} />
    <Button onPress={onPressContinue}>
      <ButtonText>Tillbaka till chatten</ButtonText>
    </Button>
  </Container>
);
