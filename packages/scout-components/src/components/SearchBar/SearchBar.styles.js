import styled from "styled-components"

const Form = styled.form`
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 100%;
  }
`

const Field = styled.div`
  margin-bottom: 15px;
  position: relative;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    margin-bottom: 0px;
    margin-right: 20px;
    flex: 1;
  }
`

const Label = styled.label`
  margin-bottom: 5px;
  display: inline-block;
`

const GeolocateButton = styled.button`
  position: absolute;
  right: 2px;
  bottom: 2px;
  background: none;
  height: 41px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  img {
    height: 20px;
  }
  &:hover {
    background: ${props => props.theme.styles.pale};
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
`

const Button = styled.button`
  background: ${props => props.theme.styles.link};
  border: none;
  text-align: center;
  width: 100%;
  padding: 10px 20px;
  cursor: pointer;
  height: 45px;
  &:hover {
    background: ${props => props.theme.styles.linkHover};
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &:active {
    background: ${props => props.theme.styles.linkActive};
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    width: 100px;
  }
`

const Input = styled.input`
  font-size: 1rem;
  padding: 10px;
  border: 2px solid ${props => props.theme.styles.text};
  display: block;
  width: 100%;
  height: 45px;
  padding-right: 45px;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &::placeholder {
    color: rgb(33, 33, 33, 0.3);
  }
`

export { Form, Field, Label, Input, GeolocateButton, Button }
