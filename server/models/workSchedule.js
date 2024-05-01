import mongoose from "mongoose";

const workScheduleSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const WorkSchedule = mongoose.model("WorkSchedule", workScheduleSchema);

module.exports = WorkSchedule;
