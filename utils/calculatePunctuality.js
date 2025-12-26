import dayjs from "dayjs";
import businessHours from "../config/businessHours.js";

const calculatePunctuality = (punchInTime) => {
  const punchIn = dayjs(punchInTime);

  const officeStart = dayjs(
    punchIn.format("YYYY-MM-DD") + " " + businessHours.startTime
  );
  const graceEnd = officeStart.add(businessHours.graceMinutes, "minute");

  if (punchIn.isBefore(officeStart)) return "early";
  if (punchIn.isAfter(graceEnd)) return "late";

  return "on-time";
};

export default calculatePunctuality;
