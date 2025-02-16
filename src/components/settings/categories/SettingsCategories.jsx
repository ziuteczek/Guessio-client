// import { serialize } from "bson";
import React from "react";

function SettingsCategories({ categoriesList, send }) {
  // const sendCheckedCategories = (form) => {
  //   const formData = new FormData(form);
  //   const checkedCategories = Array.from(formData.keys());
  //   send(serialize({ type: "categories change", categories: checkedCategories }));
  // };

  return (
    <form
      className="settings__form settings__form--categories"
      onSubmit={(e) => e.preventDefault()}
    >
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
export default SettingsCategories