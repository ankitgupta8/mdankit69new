import React from 'react';
import styled from 'styled-components';
import { Header, Markdown } from './Components';
import { Provider } from 'nonaction';
import { TextContainer, ThemeContainer, PdfSettingsContainer } from './Container';
const App = ({ className }) => {
  return (
    <div className={className} id="md2pdf-app">
      <Provider inject={[TextContainer, ThemeContainer, PdfSettingsContainer]}>
        <Header />
        <Markdown />
      </Provider>
    </div>
  );
};
export default styled(App)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family:  "Just Another Hand", cursive;
  @media print {
    &,
    div {
      display: block;
      height: auto;
      /* Reset to normalize for FireFox */
    }
    .no-print,
    .no-print * {
      display: none !important;
    }
  }
`;
