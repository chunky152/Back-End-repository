import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  studentWebmail: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^\S+@\S+\.\S+$/ 
  },
  password: { type: String, required: true, minlength: 6 },
}, { timestamps: true });

// Hash password before save
studentSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
studentSchema.methods.matchPassword = async function(pw) {
  return bcrypt.compare(pw, this.password);
};

export default mongoose.model("Student", studentSchema);
