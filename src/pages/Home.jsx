import { Link } from "react-router-dom";
import createGame from "../api/createGame";

function LinkBtn({ text, create }) {
  const link = `/join/${create ? "create" : "join"}`;

  return (
    <Link to={link} className="play-btns__btn">
      {text}
      <div className="play-btns__btn-bg"></div>
      <div className="play-btns__btn-bg"></div>
      <div className="play-btns__btn-bg"></div>
      <div className="play-btns__btn-bg"></div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="play-btns__container">
      <div className="play-btns">
        <LinkBtn text="create lobby" link="/play" create={true} />
        <LinkBtn text="join lobby" link="/join" />
      </div>
    </div>
  );
}
