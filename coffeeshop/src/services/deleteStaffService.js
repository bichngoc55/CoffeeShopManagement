import axios from "axios";
import {
  deleteStaffStart,
  deleteStaffFail,
  deleteStaffSuccess,
} from "../redux/staffSlice";
const deleteUser = async (accessToken, dispatch, id, navigate) => {
  dispatch(deleteStaffStart());
  try {
    const res = await axios.delete("http://localhost:3005/staff/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteStaffSuccess(res.data));
    navigate("/home");
  } catch (err) {
    console.log(err);
    dispatch(deleteStaffFail());
  }
};
export { deleteUser };
