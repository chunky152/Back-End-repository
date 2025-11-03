import Student from "../models/studentModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT token
const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

// REGISTER
export const registerStudent = async (req, res) => {
  try {
    const { name, studentWebmail, password } = req.body;

    // Check if email already exists
    const existingStudent = await Student.findOne({ 
      studentWebmail: studentWebmail?.toLowerCase()
    });
    
    if (existingStudent) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    // Create new student with trimmed and lowercase email
    const student = await Student.create({
      name: name.trim(),
      studentWebmail: studentWebmail.toLowerCase().trim(),
      password
    });

    // Return student data
    res.status(201).json({
      success: true,
      data: {
        name: student.name,
        studentWebmail: student.studentWebmail,
        createdAt: student.createdAt
      },
    });

  } catch (e) {
    // Log the full error server-side for debugging
    console.error('Registration error:', e);

    // Handle Mongoose validation errors (bad input)
    if (e.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        msg: 'Validation failed',
        errors: e.errors,
        error: e.message
      });
    }

    // Handle duplicate key error (unique index) - e.g., email already exists
    if (e.code === 11000) {
      const field = Object.keys(e.keyValue || {})[0] || 'field';
      return res.status(409).json({
        success: false,
        msg: `${field} already registered`,
        error: e.message
      });
    }

    // Fallback: internal server error
    res.status(500).json({
      success: false,
      msg: 'An error occurred during registration',
      error: e.message
    });
  }
};

// LOGIN
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
        name: student.name,
        studentWebmail: student.studentWebmail,
      },
     });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

// LOGOUT
export const logoutStudent = async (req, res) => {
  try {
    res.json({ msg: "Logged out successfully" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};
