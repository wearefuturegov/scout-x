import styled from "styled-components"

const Banner = styled.p`
  background: ${props => props.theme.styles.pale};
  padding: 10px 50px;
  font-size: 0.95rem;
  color: ${props => props.theme.styles.grey};
  text-align: center;
`

const YellowBanner = styled(Banner)`
  background: ${props => props.theme.styles.focus}50;
  color: ${props => props.theme.styles.darkYellow};
`

export { YellowBanner, Banner }
