import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
      enum: ["firstYear", "secondYear", "thirdYear", "fourthYear"],
      default: "firstYear",
    },
    academicYear: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["mainExam", "cat"],
      default: "mainExam",
    },
    due: Date,
    course: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "course",
      required: true,
    },
    faculty: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "faculty",
      required: true,
    },
  },
  { timestamps: true }
);

paperSchema.index({ name: 1, academicYear: 1, status: 1 }, { unique: true });

export const Paper = mongoose.model("paper", paperSchema);
