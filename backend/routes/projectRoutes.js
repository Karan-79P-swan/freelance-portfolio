import { Router } from "express";
import mongoose from "mongoose";
import Project from "../models/Project.js";
import authMiddleware from "../middleware/authMiddleware.js";

function isValidOptionalUrl(value) {
  if (value === undefined || value === null || value === "") {
    return true;
  }

  if (typeof value !== "string" || value.length > 2048) {
    return false;
  }

  try {
    const url = new URL(value);

    return (
      ["http:", "https:"].includes(url.protocol) &&
      Boolean(url.hostname) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

const router = Router();

// Public: fetch portfolio projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(projects);
  } catch (error) {
    console.error("Fetch projects error:", error.message);
    res.status(500).json({ message: "Unable to fetch projects." });
  }
});

// Admin only: create a project
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, tech, github, demo } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      title.trim().length > 100 ||
      typeof description !== "string" ||
      !description.trim() ||
      description.trim().length > 1000 ||
      (tech !== undefined &&
        (!Array.isArray(tech) ||
          tech.length > 30 ||
          !tech.every(
            (item) =>
              typeof item === "string" &&
              item.trim().length > 0 &&
              item.trim().length <= 50
          ))) ||
      (github !== undefined && typeof github !== "string") ||
      (demo !== undefined && typeof demo !== "string") ||
      !isValidOptionalUrl(github) ||
      !isValidOptionalUrl(demo)
    ) {
      return res.status(400).json({
        message:
          "Please provide valid project details and HTTP or HTTPS links.",
      });
    }

    const project = await Project.create({
      title: title.trim(),
      description: description.trim(),
      tech: (tech || []).map((item) => item.trim()),
      github: github?.trim() || "",
      demo: demo?.trim() || "",
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error.message);
    res.status(500).json({ message: "Unable to create project." });
  }
});

// Admin only: update a project
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid project ID." });
    }

    const { title, description, tech, github, demo } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      title.trim().length > 100 ||
      typeof description !== "string" ||
      !description.trim() ||
      description.trim().length > 1000 ||
      (tech !== undefined &&
        (!Array.isArray(tech) ||
          tech.length > 30 ||
          !tech.every(
            (item) =>
              typeof item === "string" &&
              item.trim().length > 0 &&
              item.trim().length <= 50
          ))) ||
      (github !== undefined && typeof github !== "string") ||
      (demo !== undefined && typeof demo !== "string") ||
      !isValidOptionalUrl(github) ||
      !isValidOptionalUrl(demo)
    ) {
      return res.status(400).json({
        message:
          "Please provide valid project details and HTTP or HTTPS links.",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        description: description.trim(),
        tech: (tech || []).map((item) => item.trim()),
        github: github?.trim() || "",
        demo: demo?.trim() || "",
      },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error("Update project error:", error.message);
    res.status(500).json({ message: "Unable to update project." });
  }
});

// Admin only: delete a project
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid project ID." });
    }

    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Delete project error:", error.message);
    res.status(500).json({ message: "Unable to delete project." });
  }
});

export default router;
