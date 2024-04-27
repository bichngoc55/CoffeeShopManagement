import { addToCart, removeFromCart, clearCart } from "../redux/cartSlice";
import axios from "axios";
async function getDrinkInformation() {
  try {
    const response = await axios.get("http://localhost:3005/menu");
    return response.data;
  } catch (error) {
    console.error("Error fetching drink information:", error);
    throw error;
  }
}

module.exports = {
  getDrinkInformation,
};
