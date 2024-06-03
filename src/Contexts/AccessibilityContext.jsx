/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// AccessibilityContext.js
import { createContext, useContext, useState } from "react";

const AccessibilityContext = createContext();

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider = ({ children }) => {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 16,
    zoomLevel: 10,
    letterSpacing: 0,
    lineHeight: 1.5,
    highContrast: false,
    darkMode: false,
    talkBack: false
  });

  const updateAccessibilitySettings = (newSettings) => {
    setAccessibilitySettings({ ...accessibilitySettings, ...newSettings });
  };

  return (
    <AccessibilityContext.Provider
      value={{ accessibilitySettings, updateAccessibilitySettings }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
