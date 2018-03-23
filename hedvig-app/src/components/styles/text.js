import { CircularFontText, MerriweatherFontText } from './typography';

export const StyledText = CircularFontText.extend`
  color: ${props => props.theme.typography.activeText.color}
  font-size: ${props => props.theme.typography.activeText.fontSize}
`;

export const StyledSmallText = StyledText.extend`
  font-size: ${props => props.theme.typography.small.fontSize};
`;

export const StyledPassiveText = StyledText.extend`
  color: ${props => props.theme.typography.passiveText.color};
`;

export const StyledSmallPassiveText = StyledSmallText.extend`
  color: ${props => props.theme.typography.passiveText.color};
`;

export const StyledHeading = MerriweatherFontText.extend`
  color: ${props => props.theme.typography.activeText.color}
  font-size: ${props => props.theme.typography.heading.fontSize};
`;
