import SettingsSectionBtn from "./SettingsNavBtn";

function SettingsNav({ settingsSection, setSettingsSection }) {
  return (
    <nav className="settings__select-section-buttons-container">
      {["General", "Game", "Categories"].map((text) => (
        <SettingsSectionBtn
          key={text}
          text={text}
          settingsSection={settingsSection}
          setSettingsSection={setSettingsSection}
        />
      ))}
    </nav>
  );
}
export default SettingsNav;
