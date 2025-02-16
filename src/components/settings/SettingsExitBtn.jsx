import React from "react";

function SettingsExitBtn({ setShowSettings }) {
  return (
    <button type="submit" onClick={() => setShowSettings(false)} className="settings__exit">
      x
    </button>
  );
}
export default SettingsExitBtn;