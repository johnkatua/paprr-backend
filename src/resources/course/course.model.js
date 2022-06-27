import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["degree", "diploma"],
      default: "degree",
    },
    faculty: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "faculty",
      required: true,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("course", courseSchema);
