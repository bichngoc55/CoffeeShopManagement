// import axios from "axios";
import { updateUserInfo } from "../redux/authSlice";

const updateUser = async (user, id, navigate, dispatch) => {
  try {
    const resultAction = await dispatch(updateUserInfo({ user, id }));
    if (updateUserInfo.fulfilled.match(resultAction)) {
      navigate("/staff");
    } else if (updateUserInfo.rejected.match(resultAction)) {
      navigate("/login");
      console.error("Update failed:", resultAction.payload);
      // Hiển thị thông báo lỗi cho người dùng nếu cần
    }
  } catch (error) {
    console.error("Update user error:", error);
  }
};
export { updateUser };
