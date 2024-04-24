import Bill from "../models/Bill.js";
 
// Get all bills
const getAllBills = async (req, res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ error: "Failed to get bills" });
    }
};

// Update a bill
const updateBill = async (req, res) => {
    const { id } = req.params;
    const { /* update fields */ } = req.body;

    try {
        const updatedBill = await Bill.findByIdAndUpdate(id, { /* update fields */ }, { new: true });
        res.status(200).json(updatedBill);
    } catch (error) {
        res.status(500).json({ error: "Failed to update bill" });
    }
};

// Create a new bill
const createBill = async (req, res) => {
    const { /* bill data */ } = req.body;

    try {
        const newBill = await Bill.create({ /* bill data */ });
        res.status(201).json(newBill);
    } catch (error) {
        res.status(500).json({ error: "Failed to create bill" });
    }
};

// Delete a bill
const deleteBill = async (req, res) => {
    const { id } = req.params;

    try {
        await Bill.findByIdAndDelete(id);
        res.status(200).json({ message: "Bill deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete bill" });
    }
};

export { getAllBills, updateBill, createBill, deleteBill };