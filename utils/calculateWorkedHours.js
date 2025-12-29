import dayjs from "../utils/dayjs.js";

const calculateWorkedHours = (punchIn, punchOut) => {
  const start = dayjs(punchIn);
  const end = dayjs(punchOut);

  const diffMinutes = end.diff(start, "minute");
  return Number((diffMinutes / 60).toFixed(2));
};

export default calculateWorkedHours;
