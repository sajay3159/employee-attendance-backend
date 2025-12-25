import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    punchIn: {
      type: Date,
    },

    punchOut: {
      type: Date,
    },

    totalWorkedHours: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["early", "on-time", "late"],
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });
export default mongoose.model("Attendance", attendanceSchema);
