import dayjs from "dayjs";
import User from "../models/User.model.js";
import Attendance from "../models/Attendance.model.js";

export const getDashboardAnalyticsService = async () => {
  const today = dayjs().format("YYYY-MM-DD");

  const totalEmployees = await User.countDocuments({
    role: "employee",
  });

  const todayAttendance = await Attendance.find({
    date: today,
  });

  const presentToday = todayAttendance.length;

  const onTimeCount = todayAttendance.filter(
    (a) => a.status === "on-time"
  ).length;

  const lateCount = todayAttendance.filter((a) => a.status === "late").length;

  const attendanceRate =
    totalEmployees === 0
      ? 0
      : Number(((presentToday / totalEmployees) * 100).toFixed(2));

  return {
    totalEmployees,
    presentToday,
    onTimeCount,
    lateCount,
    attendanceRate,
  };
};
