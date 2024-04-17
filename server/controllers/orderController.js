import Bill from "../models/Bill.js";
// Get all orders
export const getAllOrder = async (req, res) => {
  try {
    const orders = await Bill.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to get orders" });
  }
};

// Get order details
export const getDetailOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Bill.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to get order details" });
  }
};
