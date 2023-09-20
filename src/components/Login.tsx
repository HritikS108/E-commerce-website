import Button from "./Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeUser } from "../store";
import { UserDetails } from "../TypeDefinations/types";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmail,
  signInWithGooglePopup,
} from "../firebase/firebaseAuth";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleEmailLogin = async () => {
    try {
      const { user } = await signInWithEmail(email, password);
      const loggedUser: UserDetails = {
        email: user.email!,
        photoURL: user.photoURL!,
      };
      dispatch(changeUser(loggedUser));
      navigate("/");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
  const logUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      const loggedUser: UserDetails = {
        email: user.email!,
        photoURL: user.photoURL!,
      };
      dispatch(changeUser(loggedUser));
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="grid  text-2xl grid-cols-1 items-center w-1/3 m-auto mt-[100px] border border-gray-400 p-5 rounded shadow-lg shadow-gray-400">
      <div className="text-center">
        <input
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className=" mt-5 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
        />
      </div>
      <div className="text-center">
        <input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className=" mt-5 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
        />
      </div>
      <div className="mt-5">
        <Button onClick={handleEmailLogin}>LOGIN</Button>
        <Button onClick={logUser}>LOGIN WITH GOOGLE</Button>
      </div>
    </div>
  );
};

export default Login;
