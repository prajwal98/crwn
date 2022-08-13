import "./App.css";
import {
  createUserDocumentFromAuth,
  signInWithFacebookPopup,
  signInWithGooglePopup,
} from "./utils/firebase/firebase.utils";

function App() {
  const logGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      console.log(user);
      createUserDocumentFromAuth(user);
    } catch (error) {
      console.error(error);
    }
  };
  const logFacebookUser = async () => {
    try {
      const response = await signInWithFacebookPopup();
      console.log(response);
      // createUserDocumentFromAuth(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <button onClick={logGoogleUser}>Sign with google</button>
      <button onClick={logFacebookUser}>Sign with facebook</button>
    </div>
  );
}

export default App;
