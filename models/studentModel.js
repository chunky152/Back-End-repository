import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// student schema
const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  studentWebmail: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+\.[a-zA-Z0-9]+@students\.mak\.ac\.ug$/.test(v);
      },
      message: props => `${props.value} is not a valid student email!`
    }
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  }
}, {
  timestamps: true
});

// Hash password before save
studentSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Student = mongoose.model("students", studentSchema);
export { Student, joiSchema };