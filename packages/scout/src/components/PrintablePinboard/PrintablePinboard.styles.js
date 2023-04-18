import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  }

  html{
      max-width: 600px;
      margin: 0 auto;
  }

  ul{
      list-style: none;
      padding-left: 0px;
  }
  li{
      border: 2px solid black;
      margin-bottom: 25px;
      padding: 25px;
      *:first-child{
          margin-top: 0px;
      }
      *:last-child{
          margin-bottom: 0px;
      }
  }
`
