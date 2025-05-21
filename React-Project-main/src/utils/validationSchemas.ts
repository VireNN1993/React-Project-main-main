// src/utils/validationSchemas.ts
import Joi from "joi";

// Signup schema
export const signupSchema = Joi.object({
  first: Joi.string().min(2).max(255).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
  }),
  middle: Joi.string().allow("").optional(),
  last: Joi.string().min(2).max(255).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
  }),
  phone: Joi.string()
    .pattern(/^0[2-9]\d{7,8}$/)
    .min(9)
    .required()
    .messages({
      "string.empty": "Phone is required",
      "string.pattern.base":
        "Phone must be a valid Israeli phone number (starting with 0 followed by 2-9 digits)",
      "string.min": "Phone length must be at least 9 characters long",
    }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*-]).{8,}$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character (!@#$%^&*-)",
    }),
  imageUrl: Joi.string().uri().allow("").optional(),
  imageAlt: Joi.string().allow("").optional(),
  state: Joi.string().allow("").optional(),
  country: Joi.string().min(2).required().messages({
    "string.empty": "Country is required",
  }),
  city: Joi.string().min(2).required().messages({
    "string.empty": "City is required",
  }),
  street: Joi.string().min(2).required().messages({
    "string.empty": "Street is required",
  }),
  houseNumber: Joi.number().required().messages({
    "number.base": "House number must be a number",
    "any.required": "House number is required",
  }),
  zip: Joi.number().allow(null).optional(),
  biz: Joi.boolean().optional(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});

export const cardSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  subtitle: Joi.string().min(2).max(255).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string()
    .pattern(/^0[2-9]\d{7,8}$/)
    .min(9)
    .required()
    .messages({
      "string.empty": "Phone is required",
      "string.pattern.base":
        "Phone must be a valid Israeli phone number (starting with 0 followed by 2-9 digits)",
      "string.min": "Phone length must be at least 9 characters long",
    }),
  email: Joi.string().email({ tlds: false }).required(),
  web: Joi.string().uri().allow("").optional(),
  imageUrl: Joi.string().uri().allow("").optional(),
  imageAlt: Joi.string().allow("").optional(),
  state: Joi.string().allow("").optional(),
  country: Joi.string().min(2).required(),
  city: Joi.string().min(2).required(),
  street: Joi.string().min(2).required(),
  houseNumber: Joi.number().required(),
  zip: Joi.number().allow(null).optional(),
});

// User edit schema
export const userEditSchema = Joi.object({
  first: Joi.string().min(2).max(255).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
  }),
  middle: Joi.string().allow("").optional(),
  last: Joi.string().min(2).max(255).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
  }),
  phone: Joi.string()
    .pattern(/^0[2-9]\d{7,8}$/)
    .min(9)
    .required()
    .messages({
      "string.empty": "Phone is required",
      "string.pattern.base":
        "Phone must be a valid Israeli phone number (starting with 0 followed by 2-9 digits)",
      "string.min": "Phone length must be at least 9 characters long",
    }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  imageUrl: Joi.string().uri().allow("").optional(),
  imageAlt: Joi.string().allow("").optional(),
  state: Joi.string().allow("").optional(),
  country: Joi.string().min(2).required().messages({
    "string.empty": "Country is required",
  }),
  city: Joi.string().min(2).required().messages({
    "string.empty": "City is required",
  }),
  street: Joi.string().min(2).required().messages({
    "string.empty": "Street is required",
  }),
  houseNumber: Joi.number().required().messages({
    "number.base": "House number must be a number",
    "any.required": "House number is required",
  }),
  zip: Joi.number().allow(null).optional(),
  // Password is optional in profile editing
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*-]).{8,}$/)
    .allow("")
    .optional()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character (!@#$%^&*-)",
    }),
});
