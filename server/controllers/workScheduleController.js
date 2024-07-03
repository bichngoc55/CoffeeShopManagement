import Schedule from "../models/Schedule.js";

// Lấy toàn bộ lịch làm việc trong tuần
const getWeekSchedule = async (req, res) => {
  try {
    const workschedules = await Schedule.find();
    res.status(200).json(workschedules);
  } catch (error) {
    res.status(500).json({ error: "Failed to get schedule" });
  }
};

// // Cập nhật lịch làm việc của cả tuần
// const updateWeekSchedule = async (req, res) => {
//   try {
//     const { schedule } = req.body;

//     // Kiểm tra tính hợp lệ của dữ liệu đầu vào
//     const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
//     if (!daysOfWeek.every(day => 
//       Array.isArray(schedule[day]) && schedule[day].length === 3 &&
//       schedule[day].every(shift => Array.isArray(shift) && shift.length === 3)
//     )) {
//       return res.status(400).json({ error: "Invalid schedule data format" });
//     }

//     const updatedSchedule = await Schedule.findByIdAndUpdate(
//       req.params.id,
//       { $set: schedule },
//       { new: true }
//     );

//     if (!updatedSchedule) {
//       return res.status(404).json({ error: "Schedule not found" });
//     }
//     res.status(200).json(updatedSchedule);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update schedule" });
//   }
// };

// Hàm cập nhật toàn bộ lịch làm việc trong tuần
const updateWeekSchedule = async (req, res) => {
  try {
    const newSchedule = req.body;

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { $set: newSchedule },
      { new: true }
    );

    if (!updatedSchedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ error: "Failed to update schedule" });
  }
};

// // Xóa lịch làm việc của một nhân viên trong một ca cụ thể (thay thế bằng khoảng trắng)
// const deleteStaffSchedule = async (req, res) => {
//   try {
//     const { day, shiftIndex, employeeIndex } = req.body;

//     const schedule = await Schedule.findById(req.params.id);
//     if (!schedule) {
//       return res.status(404).json({ error: "Schedule not found" });
//     }

//     const daySchedule = schedule[day];
//     if (!daySchedule || !daySchedule[shiftIndex]) {
//       return res.status(404).json({ error: "Shift not found" });
//     }

//     if (daySchedule[shiftIndex][employeeIndex] === undefined) {
//       return res.status(404).json({ error: "Employee not found in shift" });
//     }

//     // Thay thế ID nhân viên bằng khoảng trắng
//     daySchedule[shiftIndex][employeeIndex] = "";

//     await schedule.save();

//     res.status(200).json(schedule);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete staff" });
//   }
// };

export {
  getWeekSchedule,
  updateWeekSchedule,
};