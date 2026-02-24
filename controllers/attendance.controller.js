import {
  getAttendanceService,
  punchInService,
  punchOutService,
} from "../services/attendance.service.js";
import dayjs from "dayjs";
import Attendance from "../models/Attendance.model.js";

export const punchIn = async (req, res) => {
  try {
    const attendance = await punchInService(req.user._id);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const punchOut = async (req, res) => {
  try {
    const attendance = await punchOutService(req.user._id);
    res.json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const { date, status, search } = req.query;

    const attendance = await getAttendanceService({
      date,
      status,
      search,
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodayAttendance = async (req, res) => {
  const today = dayjs().format("YYYY-MM-DD");

  const attendance = await Attendance.findOne({
    employee: req.user._id,
    date: today,
  });

  res.json(attendance || null);
};

export const getMonthlyReport = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const startDate = `${month}-01`;
    const endDate = dayjs(startDate).add(1, "month").format("YYYY-MM-DD");

    const report = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: "$employee",

          presentDays: {
            $sum: {
              $cond: [
                {
                  $in: ["$status", ["on-time", "late", "early", "half-day"]],
                },
                1,
                0,
              ],
            },
          },

          absentDays: {
            $sum: {
              $cond: [{ $eq: ["$status", "absent"] }, 1, 0],
            },
          },

          lateDays: {
            $sum: {
              $cond: [{ $eq: ["$status", "late"] }, 1, 0],
            },
          },

          totalWorkedHours: { $sum: "$totalWorkedHours" },
          overtimeHours: { $sum: "$overtimeHours" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "employee",
        },
      },
      { $unwind: "$employee" },
      {
        $project: {
          _id: 1,
          employeeName: "$employee.name",
          presentDays: 1,
          absentDays: 1,
          lateDays: 1,
          totalWorkedHours: 1,
          overtimeHours: 1,
        },
      },
    ]);

    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
