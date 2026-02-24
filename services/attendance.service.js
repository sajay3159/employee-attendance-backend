import dayjs from "dayjs";
import Attendance from "../models/Attendance.model.js";
import calculatePunctuality from "../utils/calculatePunctuality.js";
import calculateWorkedHours from "../utils/calculateWorkedHours.js";
import User from "../models/User.model.js";

export const punchInService = async (userId) => {
  const today = dayjs().format("YYYY-MM-DD");

  const existing = await Attendance.findOne({
    employee: userId,
    date: today,
  });

  if (existing) {
    throw new Error("Already punched in today");
  }

  const now = new Date();

  const attendance = await Attendance.create({
    employee: userId,
    date: today,
    punchIn: now,
    status: calculatePunctuality(now),
  });

  return attendance;
};

export const punchOutService = async (userId) => {
  const today = dayjs().format("YYYY-MM-DD");

  const attendance = await Attendance.findOne({
    employee: userId,
    date: today,
  });

  if (!attendance || !attendance.punchIn) {
    throw new Error("Punch-in required before punch-out");
  }

  if (attendance.punchOut) {
    throw new Error("Already punched out");
  }

  const punchOutTime = new Date();

  attendance.punchOut = punchOutTime;

  const workedHours = calculateWorkedHours(attendance.punchIn, punchOutTime);
  if (workedHours < 4) {
    attendance.status = "half-day";
  }

  attendance.totalWorkedHours = workedHours;
  const STANDARD_HOURS = 8;

  attendance.overtimeHours =
    workedHours > STANDARD_HOURS
      ? Number((workedHours - STANDARD_HOURS).toFixed(2))
      : 0;

  await attendance.save();
  return attendance;
};

export const getAttendanceService = async (filters) => {
  const { date, status, search } = filters;

  const query = {};

  // Date filter
  if (date) {
    query.date = date; // YYYY-MM-DD
  }

  // Status filter
  if (status) {
    query.status = status;
  }

  // Employee name search
  if (search) {
    const users = await User.find({
      name: { $regex: search, $options: "i" },
    }).select("_id");

    query.employee = { $in: users.map((u) => u._id) };
  }

  const attendanceList = await Attendance.find(query)
    .populate("employee", "name email role")
    .sort({ date: -1, punchIn: -1 });

  return attendanceList;
};
