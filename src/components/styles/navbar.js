import styled from 'styled-components/native';

export const StyledNavBarContainer = styled.View`
  height: 64;
  background-color: ${(props) => props.theme.colors.white};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  ${'' /* Drop shadow */} shadow-opacity: 0.3;
  shadow-radius: 5;
  shadow-color: black;
  z-index: 100;
  elevation: 1;
`;

export const EmptyHeaderItem = styled.View`
  width: 40px;
  height: 40px;
`;
