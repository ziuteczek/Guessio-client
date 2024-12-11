// Creates user in existing game
const createUser = async (nick, code) => {
  try {
    const nickComputed = nick.trim().replaceAll(" ", "+");

    const response = await fetch(
      `${process.env.REACT_APP_SERVER}/create-user?nick=${nickComputed}&code=${code}`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const userData = await response.json();

    return userData;
  } catch (err) {
    console.log(err);
    return { status: "error" };
  }
};
export default createUser;
