import styled from 'styled-components/native';
import { StyledPassiveText, StyledHeading } from './text';

export const StyledListHeader = styled.View`
  align-self: stretch;
  background-color: ${(props) => props.theme.colors.offWhite};
  padding: 24px 16px;
  align-items: center;
  justify-content: center;
`;

export const StyledList = styled.ScrollView`
  background-color: ${(props) => props.theme.colors.white};
`;

export const StyledListElement = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 16px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.offWhite};
`;

export const TouchableStyledListElement = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  padding: 16px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.offWhite};
`;

export const StyledListElementImage = styled.Image`
  width: 40;
  height: 40;
  border-radius: 20;
`;

export const StyledListElementTexts = styled.View`
  flex: 1;
  margin: 0px 16px;
`;

export const StyledListElementHeading = StyledHeading;

export const StyledListElementText = StyledPassiveText;

export const StyledRowButton = styled.View`
  align-self: flex-end;
`;
