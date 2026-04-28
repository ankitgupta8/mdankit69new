import React, { useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import styled from 'styled-components';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/gfm/gfm.js';
import { initialText } from '../../../Container/Hooks/InitialText';
const Editor = ({ className, setText }) => {
  const [theme, setTheme] = useState('darcula');
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const Dropdown = styled.select`
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: blue;
  color: white;
  z-index: 1000;
  margin: 0;
  padding: 0;
`;


  return (
      <>
        <Dropdown value={theme} onChange={(e) => handleThemeChange(e.target.value)}>
          <option value="darcula">Darcula</option>
          <option value="material">Material</option>
          <option value="default">Default</option>
          <option value="monokai">Monokai</option>
        </Dropdown> 

        <CodeMirror
          className={className}
          value={initialText}
          options={{
            mode: 'gfm',
            theme: theme,
            lineNumbers: true,
            lineWrapping: true
          }}
          onChange={(editor, data, value) => {
            setText(value);
          }}
        />
      </>
  );
};
export default styled(Editor)`
  height: 100%;
  .CodeMirror {
    height: 100%;
    line-height: 1.5;
  }
`;