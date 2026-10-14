
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    // Existing contact form fields
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    subject: {
      type: String,
      default: "",
      trim: true,
      maxlength: 120,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 3000,
    },

    // Mini CRM fields
    isRead: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["new", "in-progress", "completed"],
      default: "new",
    },
    notes: {
      type: String,
      default: "",
      maxlength: 2000,
      trim: true,
    },
    budget: {
      type: Number,
      default: null,
      min: 0,
      max: 100000000,
    },
    followUpDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
