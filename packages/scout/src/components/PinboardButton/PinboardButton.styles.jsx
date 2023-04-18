import styled from "styled-components"
import add from "./add.svg"
import remove from "./remove.svg"
import tick from "./tick.svg"

const BaseButton = styled.button`
  display: flex;
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-weight: bold;
  color: ${props => props.theme.styles.link};
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  &:before {
    margin-right: 10px;
    display: block;
    content: "";
    height: 15px;
    width: 15px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  &:hover {
    /* color: ${props => props.theme.styles.linkHover}; */
    text-decoration: underline;
  }
  &:active {
    color: ${props => props.theme.styles.text};
  }
  &:focus {
    background: ${props => props.theme.styles.focus};
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    width: inherit;
  }
`

export const AddButton = styled(BaseButton)`
  &:before {
    background-image: url(${add});
  }
`

export const RemoveButton = styled(BaseButton)`
  &:before {
    background-image: url(${tick});
  }
  &:hover:before {
    background-image: url(${props => (props.justPinned ? tick : remove)});
  }
`
