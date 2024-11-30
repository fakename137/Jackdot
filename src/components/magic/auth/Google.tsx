import { magic } from "../magicGoogle";
// import { FcGoogle } from "react-icons/fc";

const Google = () => {
  const handleSocialLogin = async () => {
    try {
      if (magic) {
        await magic.oauth.loginWithRedirect({
          provider: "google",
          redirectURI: new URL("/wallet", window.location.origin).href,
        });
      } else {
        console.error("Magic instance is not available");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Magic + Google</h1>
      <button onClick={handleSocialLogin}>
        {/* <FcGoogle size={"2.5rem"} /> */}
        Log in with Google
      </button>
    </div>
  );
};

export default Google;
