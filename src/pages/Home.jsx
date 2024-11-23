import { Link } from "react-router-dom";

function LinkBtn({ text, link, create }) {
  const createGameStorage = () =>
    localStorage.setItem("user", JSON.stringify({ create: true }));

  return (
    <Link
      to={link}
      className="play-btns__btn"
      onClick={create && createGameStorage()}
    >
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
