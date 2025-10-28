import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Joi from "joi";

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

// joi validation
const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': `"name" should be a type of 'text'`,
    'string.empty': `"name" cannot be an empty field`,
    'string.min': `"name" should have a minimum length of 3`,
    'string.max': `"name" should have a maximum length of 30`
  }),
  studentWebmail: Joi.string().email().required()
    .pattern(new RegExp('^[a-zA-Z0-9._%+-]+\\.[a-zA-Z0-9]+@students\\.mak\\.ac\\.ug$'))
    .messages({
    'string.empty': `"email" cannot be an empty field`,
    'string.email': `"email" must be a valid email`,
    'string.pattern.base': `"email" must be follow the format: john.doe@students.mak.ac.ug`,
   }),
  password: Joi.string().min(8).required().messages({
    'string.empty': `"password" cannot be an empty field`,
    'string.min': `"password" should have a minimum length of 8`,
  }),
});

// Hash password before save
studentSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Student = mongoose.model("Student", studentSchema);
export { Student, joiSchema };