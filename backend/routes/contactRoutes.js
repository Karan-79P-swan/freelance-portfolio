
import { Router } from "express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import Message from "../models/Message.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// Public: submit a contact message
router.post("/", contactLimiter, async (req, res) => {
  try {
    const { name, email, subject = "", message } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        message: "Please provide valid contact details.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    if (cleanName.length < 2 || cleanName.length > 80) {
      return res.status(400).json({ message: "Invalid name." });
    }

    if (
      cleanEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        message: "Invalid email address.",
      });
    }

    if (cleanSubject.length > 120) {
      return res.status(400).json({
        message: "Subject is too long.",
      });
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 3000) {
      return res.status(400).json({
        message: "Message must contain 10 to 3000 characters.",
      });
    }

    const savedMessage = await Message.create({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
    });

    res.status(201).json({
      message: "Contact message saved successfully.",
      id: savedMessage._id,
    });
  } catch (error) {
    console.error("Contact submission error:", error.message);
    res.status(500).json({
      message: "Unable to save the message.",
    });
  }
});

// Admin only: list contact messages
router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(200);

    res.json(messages);
  } catch (error) {
    console.error("Fetch messages error:", error.message);
    res.status(500).json({
      message: "Unable to fetch contact messages.",
    });
  }
});

// Admin only: delete a contact message
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid message ID.",
      });
    }

    const deletedMessage = await Message.findByIdAndDelete(
      req.params.id
    );

    if (!deletedMessage) {
      return res.status(404).json({
        message: "Contact message not found.",
      });
    }

    res.json({
      message: "Contact message deleted successfully.",
    });
  } catch (error) {
    console.error("Delete message error:", error.message);
    res.status(500).json({
      message: "Unable to delete contact message.",
    });
  }
});

export default router;
