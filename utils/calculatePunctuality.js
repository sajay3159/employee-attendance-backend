import dayjs from "../utils/dayjs.js";
import businessHours from "../config/businessHours.js";

const calculatePunctuality = (punchInTime) => {
  const punchIn = dayjs(punchInTime).tz("Asia/Kolkata");

  const [startHour, startMinute] = businessHours.startTime
    .split(":")
    .map(Number);

  const officeStart = punchIn
    .startOf("day")
    .hour(startHour)
    .minute(startMinute);

  const graceEnd = officeStart.add(businessHours.graceMinutes, "minute");

  if (punchIn.isBefore(officeStart)) return "early";
  if (punchIn.isAfter(graceEnd)) return "late";

  return "on-time";
};

export default calculatePunctuality;
