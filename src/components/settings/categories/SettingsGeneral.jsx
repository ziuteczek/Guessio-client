function SettingsGeneral({ send }) {
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
export default SettingsGeneral;
