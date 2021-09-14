import React from "react"

import styled from "styled-components"
import { truncate } from "../../lib/utils"
import { Link, useLocation } from "@reach/router"
import Footer from "../ServiceCardFooter"

const Outer = styled.li`
  padding: 25px;
  background: ${props => props.theme.styles.white};
  margin-bottom: 15px;
  transition: box-shadow 0.2s ease-out;
  position: relative;
  animation: fadeIn 0.2s ease-out;
  &:hover {
    /* box-shadow: 0px 4px 5px ${props => props.theme.styles.cardShadow}; */
    box-shadow: 0px 22px 24px 0px ${props => props.theme.styles.cardShadow};
  }
  &:focus-within {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const StyledLink = styled(Link)`
  color: ${props => props.theme.styles.text};
  text-decoration: none;
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  &:focus {
    border: 0;
    outline: none;
  }
`

const Name = styled.h2`
  margin-bottom: 10px;
  font-size: 1.3rem;
`

const Description = styled.p`
  color: ${props => props.theme.styles.text};
  font-size: 0.9rem;
  margin-bottom: 17px;
  line-height: 1.5;
`

const ServiceCard = ({ id, name, description, ...service }) => {
  const { search } = useLocation()
  return (
    <Outer>
      <StyledLink to={`/service/${id}${search}`}>
        <Name>{name}</Name>
      </StyledLink>
      <Description>{truncate(description, 18)}</Description>
      <Footer {...service} />
    </Outer>
  )
}

export default ServiceCard
