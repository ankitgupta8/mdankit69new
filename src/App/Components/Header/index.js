import React from "react";
import styled from "styled-components";
import UploadButton from "./Upload.js";
import ThemeSelector from "./ThemeSelector.js";
import PdfSettings from "./PdfSettings.js";
import downloadimage from '../../assets/img/downloadpdf.png'

const Header = ({ className }) => {
  const onTransfrom = () => {
    // get the file name
    let candidateTitle = "";
    const previewEl = document.querySelector(".preview");
    const candidateTitleEl = previewEl.querySelector("h1");
    if (candidateTitleEl) {
      candidateTitle = candidateTitleEl.innerText;

      // do the effect change the title
      const currentTitle = document.title;
      document.title = candidateTitle;
      window.requestAnimationFrame(() => {
        // schedule resume back in next frame
        document.title = currentTitle;
      });
    }
    window.print();
  };
  return (
    <header className={className + " no-print header"}>
      <p className="project"> MD</p>
       
      <div className="menu">
        <UploadButton className="button upload" />
      </div>
      <div className="buttons">
        <PdfSettings />
        <ThemeSelector />
        <button onClick={onTransfrom} className="shadow download-btn">Download <img src={downloadimage} alt="Download Icon"  height={"20px"} style={{  filter: "invert(100%)", paddingLeft: "5px"}} rel="noreferrer" /></button>  
      </div>
    </header>
  );
};

export default styled(Header)`
  * {
    box-sizing: border-box;
  }
  flex-shrink: 0;
  -webkit-overflow-scrolling: touch;
  user-select: none;
  padding-left: 5px;
  padding-right: 5px;
  color: black;
  background-color: rgb(233, 233, 233);
  display: flex;
  align-items: center;
  height: 70px;
  .header{
    width: 100%;
  }
  .project {
    font-weight: 900;
    flex-shrink: 0;
    font-size: 50px;
    letter-spacing: 2px;
    font-family: 'Arial', sans-serif;
    color: black;
  }
  @media (max-width: 1500px) {
    .project {
      padding-left: 20px;
    }
  }
  @media (max-width: 768px) {
    .project {
      padding-left: 10px; 
    }
  }
  div.menu {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .button {
      height: 80%;
      margin: 0;
      display: flex;
      align-items: center;
      margin-left: 3px;
      border-radius: 3px;
      border: 1px solid black;
      padding: 10px;
      cursor: pointer;
      background-color: black;
      color: white;
      border-radius: 5px;
    }
  }

  .buttons {
    position: fixed;
    bottom: 14px;
    right: 20px;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .buttons .download-btn {
      color: white;
      background-color: #2d3142;
      height: 42px;
      padding: 0 20px;
      border-radius: 8px;
      border: none;
      outline: none;
      font-size: 15px;
      font-family: 'Inter', 'Segoe UI', sans-serif;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
  }
  .buttons .download-btn:hover {
      background-color: #3d4258;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  @keyframes dance {
    0% {
      transform: rotate(3deg);
    }
    100% {
      transform: rotate(-2deg);
    }
  }
`;
