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
// Create a new order
export const createBill = async (req, res) => {
  try {
    const bill = new Bill(req.body);
    await booking.save();
    await bill.save();
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Delete an order
export const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);

    if (!bill) {
      return res.status(404).json({ error: "Bill not found" });
    }
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete bill" });
  }
};
export const updateBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id);
    if (!bill) {
      return res.status(404).json({ error: "Bill not found" });
    }
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ error: "Failed to update bill" });
  }
};
