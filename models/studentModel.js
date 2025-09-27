import mongoose from "mongoose";
import Joi from "joi";

// student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true,}
});

// joi validation
joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': `"name" should be a type of 'text'`,
    'string.empty': `"name" cannot be an empty field`,
    'string.min': `"name" should have a minimum length of 2`,
    'string.max': `"name" should have a maximum length of 50`
 }),
  email: Joi.string().email().required()
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

const Student = mongoose.model("Student", studentSchema);
export { Student, joiSchema };