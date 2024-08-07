import axios from "axios";
import { loginStart, setLoginSuccess, setLoginFail } from "../redux/authSlice";
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3005/auth/login", user);
    dispatch(setLoginSuccess(res.data));
    navigate("/home");
  } catch (err) {
    dispatch(setLoginFail());
  }
};
