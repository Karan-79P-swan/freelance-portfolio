
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

/* Admin only: update CRM details for a contact message */
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid message ID.",
      });
    }

    const allowedFields = [
      "isRead",
      "status",
      "notes",
      "budget",
      "followUpDate",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid CRM fields provided.",
      });
    }

    if (
      "isRead" in updates &&
      typeof updates.isRead !== "boolean"
    ) {
      return res.status(400).json({
        message: "isRead must be true or false.",
      });
    }

    if (
      "status" in updates &&
      !["new", "in-progress", "completed"].includes(
        updates.status
      )
    ) {
      return res.status(400).json({
        message: "Invalid message status.",
      });
    }

    if (
      "notes" in updates &&
      (typeof updates.notes !== "string" ||
        updates.notes.length > 2000)
    ) {
      return res.status(400).json({
        message: "Notes must be a string of at most 2000 characters.",
      });
    }

    if ("notes" in updates) {
      updates.notes = updates.notes.trim();
    }

    if ("budget" in updates) {
      const budget = updates.budget;

      if (
        budget !== null &&
        (typeof budget !== "number" ||
          !Number.isFinite(budget) ||
          budget < 0 ||
          budget > 100000000)
      ) {
        return res.status(400).json({
          message: "Budget must be between 0 and 100000000.",
        });
      }
    }

    if ("followUpDate" in updates) {
      if (updates.followUpDate === null || updates.followUpDate === "") {
        updates.followUpDate = null;
      } else {
        const date = new Date(updates.followUpDate);

        if (Number.isNaN(date.getTime())) {
          return res.status(400).json({
            message: "Invalid follow-up date.",
          });
        }

        updates.followUpDate = date;
      }
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        message: "Contact message not found.",
      });
    }

    res.json({
      message: "Contact message updated successfully.",
      data: updatedMessage,
    });
  } catch (error) {
    console.error("Update message error:", error.message);

    res.status(500).json({
      message: "Unable to update contact message.",
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
