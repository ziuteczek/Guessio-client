import React, { useState } from "react";

function SettingsGame({ send }) {
  const [roundsQuantity, setRoundsQuantity] = useState("");

  return (
    <form
      className="settings__form settings__form--game"
      onSubmit={(e) => e.preventDefault()}
      onChange={(e) => console.log(e.target.parentElement)}
    >
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
export default SettingsGame;