import styled from "styled-components";

const spinnerWidth = 4;
const spinnerBox = 24;

interface Props {
    containerBox?: number;
}

const LoaderLayout = styled.div<Props>`
  height: ${p => (p.containerBox ? `${p.containerBox}px` : "100%")};
  width: ${p => (p.containerBox ? `${p.containerBox}px` : "100%")};
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    border: ${spinnerWidth}px solid transparent;
    border-top: ${spinnerWidth}px solid ${p => p.theme.colors.red};
    border-right: ${spinnerWidth}px solid ${p => p.theme.colors.red};
    border-radius: 50%;
    width: ${spinnerBox}px;
    height: ${spinnerBox}px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoaderLayout;
