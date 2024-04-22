import mongoose from "mongoose";
import { Time } from "mongoose-time";

const scheduleSchema = new mongoose.Schema({
  day: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Time,
    required: true,
  },
  endTime: {
    type: Time,
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
