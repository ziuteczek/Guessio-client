// Creates game and returns game admin userID
const createGame = async () => {
  try {
    const response = await fetch(`http://localhost:4000/create-game`, {
      method: "POST",
    });

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
