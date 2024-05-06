// import { axios } from "../redux/cartSlice";
import axios from "axios";
export const saveBills = async () => {
  try {
    const response = await axios.post("http://localhost:3005/history/add");
    
  } catch (error) {
    console.error("Error creating new bill:", error);
    throw error;
  }
};
