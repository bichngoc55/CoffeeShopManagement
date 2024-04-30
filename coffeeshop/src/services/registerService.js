import axios from "axios";
import {
  registerStart,
  registerFail,
  registerSuccess,
} from "../redux/authSlice";
const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("http://localhost:3005/auth/register", user);
    dispatch(registerSuccess(res.data));
    navigate("/staff");
  } catch (err) {
    console.log(err);
    dispatch(registerFail());
  }
};
export { registerUser };
