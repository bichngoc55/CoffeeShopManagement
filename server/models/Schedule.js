import mongoose from "mongoose";
const { Schema } = mongoose;

const scheduleSchema = new Schema({
  mon: [["", "", ""], ["", "", ""], ["", "", ""]],
  tue: [["", "", ""], ["", "", ""], ["", "", ""]],
  wed: [["", "", ""], ["", "", ""], ["", "", ""]],
  thu: [["", "", ""], ["", "", ""], ["", "", ""]],
  fri: [["", "", ""], ["", "", ""], ["", "", ""]],
  sat: [["", "", ""], ["", "", ""], ["", "", ""]],
  sun: [["", "", ""], ["", "", ""], ["", "", ""]],
});

const Schedule = mongoose.model("workSchedule", scheduleSchema);
export default Schedule;