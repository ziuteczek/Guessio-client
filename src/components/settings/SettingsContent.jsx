import SettingsGeneral from "./categories/SettingsGeneral";
import SettingsGame from "./categories/SettingsGame";
import SettingsCategories from "./categories/SettingsCategories";

function SettingsContent({ category, contentProps }) {
  const Content = [SettingsGeneral, SettingsGame, SettingsCategories].find(
    (el) => category === el.name
  );
  console.log("elo" + Content);
  return <Content {...contentProps} />;
}
export default SettingsContent;
