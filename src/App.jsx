import React from "react"
import theme from "./components/_theme"
import { createGlobalStyle } from "styled-components"
import Layout from "./components/Layout"

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  }
`

const App = () =>
  <>
    <GlobalStyle/>
    <Layout>
      Test
    </Layout>
  </>

export default App