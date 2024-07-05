import HomeContent from "../models/Home.js";

export const getDetailContent = async (req, res) => {
  try {
    const content = await HomeContent.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    const content = await HomeContent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};