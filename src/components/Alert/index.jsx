import Alert from "@reach/alert"
import styled from "styled-components"
import theme from "../_theme"

const StyledAlert = styled(Alert)`
    position: fixed;
    background: ${theme.text};
    padding: 15px;
    color: ${theme.white};
    font-weight: bold;
    width: 100%;
    border-radius: 2px;
    max-width: 400px;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    margin: 20px;
    box-shadow: 0px 2px 12px ${theme.textBackground};
    animation: popIn 5s ease-out;
    z-index: 999;

    @keyframes popIn{
        0%{
            opacity: 0;
            transform: translate(-50%, 10px);
        }
        3%{
            opacity: 1;
            transform: translate(-50%, 0px);
        }
        97%{
            opacity: 1;
            transform: translate(-50%, 0px);
        }
        100%{
            opacity: 0;
            transform: translate(-50%, 10px);
        }
    }
`

export default StyledAlert