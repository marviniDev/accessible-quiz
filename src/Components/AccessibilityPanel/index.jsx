/* eslint-disable react/prop-types */
import { useState } from "react";
import "./styles.css";
import ImageAccessibility from "../../assets/acessibilidade.png";
import ImageAumentarFonte from "../../assets/aumentarfonte.png";
import ImageDiminuirFonte from "../../assets/diminuirfonte.png";
import ImageMaisZoom from "../../assets/maiszoom.png";
import ImageMenosZoom from "../../assets/menoszoom.png";
// import ImageContraste from "../../assets/contraste.png";
// import ImageModoNoturno from "../../assets/modonoturno.png";
import ImageTalkBack from "../../assets/falar.png";
import {useAccessibility} from '../../Contexts/AccessibilityContext'

const AccessibilityPanel = ({ children }) => {
  const {accessibilitySettings, updateAccessibilitySettings} = useAccessibility()

  const [fontSize, setFontSize] = useState(accessibilitySettings.fontSize);
  const [zoomLevel, setZoomLevel] = useState(accessibilitySettings.zoomLevel);
  const [letterSpacing, setLetterSpacing] = useState(accessibilitySettings.letterSpacing);
  const [lineHeight, setLineHeight] = useState(accessibilitySettings.lineHeight);
  // const [highContrast, setHighContrast] = useState(accessibilitySettings.highContrast);
  // const [darkMode, setDarkMode] = useState(accessibilitySettings.darkMode);
  const [expanded, setExpanded] = useState(false);
  const [talkBack, setTalkBack] = useState(accessibilitySettings.talkBack);

  // const toggleHighContrast = () => {
  //   setHighContrast(!highContrast);
  // };

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  // };

  const togglePanel = () => {
    setExpanded(!expanded);
  };

  const toggleTalkBack = () => {
    updateAccessibilitySettings({talkBack: !talkBack})
    setTalkBack(!talkBack)
  };

  const styles = {
    fontSize: `${fontSize}px`,
    zoom: zoomLevel / 10,
    // transform: `scale(${zoomLevel / 100})`,
    letterSpacing: `${letterSpacing}px`,
    lineHeight: `${lineHeight}`,
    // color: highContrast ? "#fff" : "#000",
    // backgroundColor: darkMode ? "#333" : "#fff",
  };

  return (
    <>
      <div className={`accessibility-panel ${expanded ? "expanded" : ""}`}>
        <button className="panel-toggle" onClick={togglePanel}>
          <img
            style={{ width: "40px" }}
            src={ImageAccessibility}
            alt=""
          />
        </button>
        <div className="panel-content">
          {expanded && (
            <div className="options">
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <button onClick={() => setFontSize((prev) => prev + 1)}>
                  <img
                    src={ImageAumentarFonte}
                    alt="aumentar tamanho da fonte"
                  />
                </button>
                <button onClick={() => setFontSize((prev) => prev - 1)}>
                  <img
                    src={ImageDiminuirFonte}
                    alt="diminuir tamanho da fonte"
                  />
                </button>
                <button onClick={() => setZoomLevel((prev) => prev + 1)}>
                  <img
                    src={ImageMaisZoom}
                    alt="aumentar ampliação da tela"
                  />
                </button>
                <button onClick={() => setZoomLevel((prev) => prev - 1)}>
                  <img
                    src={ImageMenosZoom}
                    alt="diminuir ampliação da tela"
                  />
                </button>
                {/* <button onClick={toggleHighContrast}>
                  <img
                    src={ImageContraste}
                    alt="alternar contraste"
                  />
                </button>
                <button onClick={toggleDarkMode}>
                  <img
                    src={ImageModoNoturno}
                    alt="alternar modo noturno"
                  />
                </button> */}
                <button onClick={toggleTalkBack} style={{border: `${talkBack ? "2px solid red": ""}`}}>
                  <img
                    src={ImageTalkBack}
                    alt="alternar talkback"
                  />
                </button>
              </div>

              <div style={{display: 'grid'}}>
              <label htmlFor="letter-spacing">Espaçamento de Letras:</label>
              <input
                id="letter-spacing"
                type="range"
                min="-2"
                max="10"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(e.target.value)}
              />
              <label htmlFor="line-height">Altura de Linha:</label>
              <input
                id="line-height"
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(e.target.value)}
              />
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={styles}>{children}</div>
    </>
  );
};

export default AccessibilityPanel;
