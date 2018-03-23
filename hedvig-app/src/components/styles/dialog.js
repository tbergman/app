import styled from 'styled-components/native';
import { MerriweatherFontText, CircularFontText } from './typography';

export const DialogContainer = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
`;

export const Heading = MerriweatherFontText.extend`
  font-size: 24px;
  margin-top: 24px;
  margin-bottom: 16px;
  padding: 0 16px;
  text-align: center;
`;

export const Paragraph = CircularFontText.extend`
  font-size: 16px;
  margin-bottom: 24px;
  padding: 0 16px;
  text-align: center;
`;

// bottom: 0 has a small goes slightly over the dialog bottom
export const ButtonsContainer = styled.View`
  flex-direction: row;
`;

export const StyledDialogButton = styled.TouchableOpacity`
  flex: 1;
  height: 46px;
  align-items: center;
  justify-content: center;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.colors.offWhite};
  border-right-width: ${props => (props.borderRight ? '1px' : '0')}
  border-right-color: ${props => props.theme.colors.offWhite};
`;

export const StyledDialogButtonText = CircularFontText.extend`
  color: ${props => props.theme.colors.primary};
  font-size: 16px;
`;
