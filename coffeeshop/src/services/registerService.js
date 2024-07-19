// import axios from "axios";

const registerUser = async (user, dispatch, navigate) => {
  try {
    const response = await fetch("http://localhost:3005/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      if (response.status === 500) {
        alert("Lỗi kết nối đến máy chủ");
        navigate("/login");
      } else return response;
      throw new Error("Something went wrong during registration.");
    } else {
      return response;
    }
    // navigate("/home");
  } catch (error) {
    console.error("Registration error:", error);
  }
};
export { registerUser };
