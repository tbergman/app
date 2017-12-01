import styled from "styled-components"

export const NavStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  border-bottom: solid 1px ${props => props.theme.colors.lightGray};
`
