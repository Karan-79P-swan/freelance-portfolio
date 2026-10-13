
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    tech: {
      type: [String],
      default: [],
    },
    github: {
      type: String,
      default: "",
    },
    demo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
