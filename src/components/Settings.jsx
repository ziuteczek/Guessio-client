import React, { useEffect, useRef, useState } from "react";

function General() {
  return (
    <form className="settings__form settings__form--general" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="nick">nick</label>
      <input type="text" name="nick" id="nick" maxLength={10} autoComplete="off" />
      <label htmlFor="music-volume">Music volume</label>
      <input type="range" name="music-volume" id="music-volume" max={100} />
      <label htmlFor="effects-volume">Effects volume</label>
      <input type="range" name="effects-volume" id="effects-volume" max={100} />
    </form>
  );
}
function Game() {
  const [roundsQuantity, setRoundsQuantity] = useState("");

  return (
    <form className="settings__form settings__form--game">
      <label htmlFor="rounds-quantity">rounds quantity</label>
      <input
        type="number"
        name="rounds-quantity"
        id="rounds-quantity"
        value={roundsQuantity}
        onChange={(e) => setRoundsQuantity(e.target.value)}
      />
    </form>
  );
}
function Categories({ categoriesList }) {
  console.log(categoriesList);
  return (
    <form className="settings__form settings__form--categories">
      {categoriesList &&
        Object.keys(categoriesList).map((category) => (
          <>
            <input
              className="settings__category-checkbox"
              type="checkbox"
              name={category}
              id={category}
            />
            <label className="settings__category-label" htmlFor={category}>
              {category}
            </label>
          </>
        ))}
    </form>
  );
}

function SettingsSectionBtn({ text, setSettingsSection, settingsSection }) {
  const selectionClass = settingsSection === text ? "settings__select-section-button--current" : "";
  return (
    <button
      className={`settings__select-section-button ${selectionClass}`}
      onClick={() => setSettingsSection(text)}
    >
      {text}
    </button>
  );
}

function ExitBtn({ setShowSettings }) {
  return (
    <button type="submit" onClick={() => setShowSettings(false)} className="settings__exit">
      x
    </button>
  );
}
const formDataToObj = (formData) => {
  const formObj = {};
  formData.forEach((value, key) => {
    formObj[key] = value;
  });
  return formObj;
};

function Settings({ categoriesList,send }) {
  const [showSettings, setShowSettings] = useState(false);
  const [settingsSection, setSettingsSection] = useState("General");

  const settingsRef = useRef();

  useEffect(() => {
    if (showSettings) {
      settingsRef.current.showModal();
    } else {
      settingsRef.current.close();
    }
  }, [showSettings]);

  const settingsCategories = {
    General: General(),
    Game: Game(),
    Categories: Categories({ categoriesList }),
  };

  return (
    <>
      <dialog ref={settingsRef} className="settings" onClose={() => console.log()}>
        <ExitBtn setShowSettings={setShowSettings} />
        <nav className="settings__select-section-buttons-container">
          {Object.keys(settingsCategories).map((text) => (
            <SettingsSectionBtn
              key={text}
              text={text}
              settingsSection={settingsSection}
              setSettingsSection={setSettingsSection}
            />
          ))}
        </nav>
        {settingsCategories[settingsSection]}
      </dialog>
      <button onClick={() => setShowSettings((state) => !state)}>settings</button>
    </>
  );
}

export default Settings;
