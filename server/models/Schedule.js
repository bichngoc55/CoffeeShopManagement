import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;
