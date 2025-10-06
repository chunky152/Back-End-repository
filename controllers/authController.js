import Student from "../models/studentModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT token
const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

// =========================
// REGISTER
// =========================
export const registerStudent = async (req, res) => {
  try {
    const { firstName, lastName, studentWebmail, password } = req.body;

    // Validate input
    if (!firstName || !lastName || !studentWebmail || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // Check if email already exists
    const existingStudent = await Student.findOne({ studentWebmail });
    if (existingStudent) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new student
    const student = await Student.create({
      firstName,
      lastName,
      studentWebmail,
      password: hashedPassword,
    });

    res.status(201).json({
      student: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        studentWebmail: student.studentWebmail,
      },
      token: genToken(student._id),
    });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

// =========================
// LOGIN
// =========================
export const loginStudent = async (req, res) => {
  try {
    const { studentWebmail, password } = req.body;

    // Validate input
    if (!studentWebmail || !password) {
      return res.status(400).json({ msg: "Email & password required" });
    }

    // Find student
    const student = await Student.findOne({ studentWebmail });
    if (!student) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Success
    res.json({
      student: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        studentWebmail: student.studentWebmail,
      },
      token: genToken(student._id),
    });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

// =========================
// LOGOUT
// =========================
export const logoutStudent = async (req, res) => {
  try {
    // With JWT, logout = client removes token from localStorage/cookies
    // (Optional: maintain a blacklist of invalidated tokens in DB/Redis)
    res.json({ msg: "Logged out successfully" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};
