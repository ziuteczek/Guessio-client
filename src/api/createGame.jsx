// Creates game and returns game admin userID
const createGame = async (nick) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}/create-game?nick=${nick}`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(String(response.status));
    }

    const userData = await response.json();

    return userData;
  } catch (err) {
    console.log(err);
    return { status: "error" };
  }
};
export default createGame;
