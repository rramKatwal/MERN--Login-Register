export const LandingPage = () => {
  const loginUser = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="homeContainer">
        <div className="home">
          <h1>Welcome user:{loginUser.name}!!</h1>
          <img src="./welcome.png" alt="" width="80px" />
          <p>We wish u all the comfort using our services.</p>
        </div>
      </div>
    </>
  );
};
