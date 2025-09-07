import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    ${({ theme }) =>
      theme &&
      Object.entries(theme)
        .map(([key, value]) => `${key}: ${value};`)
        .join("\n")}
  }

  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background-color: var(--background);
    color: var(--dark-text);
    min-height: 100vh;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .cta-button {
    background-color: var(--primary-blue);
    color: var(--soft-white);
    border: none;
    border-radius: 6px;
    padding: 12px 24px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 8px var(--box-shadow);

    &:hover {
      background-color: var(--secondary-blue);
      box-shadow: 0 6px 12px var(--box-shadow);
    }
  }
  
  .card-container {
    background-color: var(--card-background);
    border-radius: 12px;
    box-shadow: 0 4px 12px var(--box-shadow);
    padding: 30px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 18px var(--box-shadow);
    }
  }
`;

export default GlobalStyle;
