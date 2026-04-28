import React, { Suspense, lazy, useEffect } from 'react';
import styled from 'styled-components';
import { useProvided } from 'nonaction';
import { ThemeContainer, PdfSettingsContainer } from '../../../Container';
import { injectThemeStyle } from '../../../Lib/themeStyles';
import Loading from './Loading';
import ErrorBoundary from './ErrorBoundary.js';
import 'github-markdown-css';
const Wrapper = styled.div`
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  padding: 10px;
  @media print {
    padding: 0;
    overflow-y: hidden;
  }
`;
const LazyPreview = lazy(() => import('./Preview.js'));
const MarkdownPreviewerBody = ({ source, children }) => {
  const [currentTheme] = useProvided(ThemeContainer);
  const [pdfSettings] = useProvided(PdfSettingsContainer);

  // Inject theme CSS on mount and when theme or settings change
  useEffect(() => {
    injectThemeStyle(currentTheme, pdfSettings);
  }, [currentTheme, pdfSettings]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading duration={0.5} />}>
        <Wrapper className="preview themed markdown-body">
          <LazyPreview source={source}>{children}</LazyPreview>
        </Wrapper>
      </Suspense>
    </ErrorBoundary>
  );
};

export default MarkdownPreviewerBody;

