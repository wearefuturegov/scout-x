import styled from "styled-components"

import { Dialog } from "@reach/dialog"

const StyledDialog = styled(Dialog)`
  position: relative;
  width: 95vw;
  max-width: 400px;
  animation: splat 0.15s ease-out;
  @keyframes splat {
    from {
      opacity: 0;
      transform: scale(0.99);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const Title = styled.h2`
  margin-bottom: 25px;
`

const Field = styled.div`
  position: relative;
  margin-bottom: 25px;
`

const Label = styled.label`
  display: block;
  color: ${props => props.theme.styles.text};
  cursor: pointer;
  margin-bottom: 5px;
`

const Input = styled.input`
  font-size: 1rem;
  padding: 10px;
  border: 2px solid ${props => props.theme.styles.text};
  display: block;
  width: 100%;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &::placeholder {
    opacity: 0.3;
  }
`

export { StyledDialog, Title, Field, Label, Input }
