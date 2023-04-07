import styled from "styled-components"

const Outer = styled.div`
  /* display: none; */
  padding: 45px;
  min-height: 250px;
  position: relative;
  margin-bottom: 0px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    /* margin-bottom: 45px; */
    display: block;
  }
`

const Inner = styled.div`
  display: block;
  position: relative;
  background: ${props => props.theme.styles.white};
  padding: 25px;
  width: 100%;
  max-width: 270px;
`

const Crosshead = styled.h2`
  margin-bottom: 5px;
  color: ${props => props.theme.styles.text};
`

const MapContainer = styled.section`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  /* pointer-events: none; */
  background: ${props => props.theme.styles.pale};
  .map {
    height: 100%;
  }
`

const StaticMapContainer = styled.section`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  /* pointer-events: none; */
  background: ${props => props.theme.styles.pale};
  .map {
    height: 100%;
  }
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
  }
`

export { Outer, MapContainer, Inner }
