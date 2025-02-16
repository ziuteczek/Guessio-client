import React, { useContext, useEffect, useRef, useState } from "react";
import { sendContex } from "../../pages/Play";

import SettingsNav from "./SettingsNav";
import SettingsExitBtn from "./SettingsExitBtn";
import SettingsContent from "./SettingsContent";

function Settings({ categoriesList, settingsRef }) {
  const [showSettings, setShowSettings] = useState(false);
  const [settingsSection, setSettingsSection] = useState("SettingsGeneral");

  const settingsElRef = useRef(null);
  const send = useContext(sendContex);

  useEffect(() => {
    if (showSettings) {
      settingsElRef.current.showModal();
    } else {
      settingsElRef.current.close();
    }
  }, [showSettings]);

  return (
    <>
      <dialog ref={settingsElRef} className="settings">
        <SettingsExitBtn setShowSettings={setShowSettings} />
        <SettingsNav settingsSection={settingsSection} setSettingsSection={setSettingsSection} />
        <SettingsContent category={settingsSection} contentProps={{ categoriesList, send }} />
      </dialog>
      <button onClick={() => setShowSettings((prev) => !prev)}>settings</button>
    </>
  );
}

export default Settings;
