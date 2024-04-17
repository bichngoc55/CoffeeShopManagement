import axios from "axios";
import { loginStart, setLoginSuccess, setLoginFail } from "../redux/authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      `http://localhost:{process.env.PORT}/auth/login`,
      user
    );
    dispatch(setLoginSuccess(res.data));
    navigate("/inventory");
  } catch (err) {
    dispatch(setLoginFail());
  }
};
