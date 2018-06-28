import styled from 'styled-components/native';

export const StyledRow = styled.View`
  flex-direction: row;
`;

export const StyledCenteredRow = StyledRow.extend`
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled.Image`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
