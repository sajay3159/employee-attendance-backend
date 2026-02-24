import cron from "node-cron";
import dayjs from "dayjs";
import AttendanceModel from "../models/Attendance.model.js";
import UserModel from "../models/User.model.js";
import logger from "../utils/logger.js";

const runAttendanceCron = () => {
  cron.schedule("59 23 * * *", async () => {
    try {
      const today = dayjs().format("YYYY-MM-DD");

      const employees = await UserModel.find({ role: "employee" });

      for (let emp of employees) {
        const exists = await AttendanceModel.findOne({
          employee: emp._id,
          date: today,
        });

        if (!exists) {
          await AttendanceModel.create({
            employee: emp._id,
            date: today,
            status: "absent",
          });
        }
      }
      logger.info(`Absent marking done for ${today}`);
    } catch (err) {
      console.error("Cron error:", err.message);
    }
  });
};

export default runAttendanceCron;
