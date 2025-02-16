import React from "react";

export function SettingsSectionBtn({ text, setSettingsSection, settingsSection }) {
  const selectionClass = settingsSection === text ? "settings__select-section-button--current" : "";
  return (
    <button
      className={`settings__select-section-button ${selectionClass}`}
      onClick={() => setSettingsSection("Settings" + text)}
    >
      {text}
    </button>
  );
}
export default SettingsSectionBtn;
