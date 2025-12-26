import {
  getAttendanceService,
  punchInService,
  punchOutService,
} from "../services/attendance.service.js";

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
