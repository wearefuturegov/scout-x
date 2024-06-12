import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  svg {
    transform: scale(1.5);
  }

  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    gap: 10px;

    svg {
      transform: scale(1);
    }
  }
`
