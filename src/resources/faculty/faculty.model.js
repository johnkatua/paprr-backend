import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    acronym: String,
    description: String,
  },
  { timestamps: true }
);

export const Faculty = mongoose.model("faculty", facultySchema);
