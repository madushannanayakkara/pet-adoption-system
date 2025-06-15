import { emptyLoginDetails, emptyRegistrationDetails } from "../utils/utils";

export const validateRegistrationDetails = (
  details: typeof emptyRegistrationDetails
) => {
  const errors: Record<string, string> = {};

  // Required field check
  for (const [key, value] of Object.entries(details)) {
    if (!value.trim()) {
      errors[key] = `${key} is required`;
    }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (details.email && !emailRegex.test(details.email)) {
    errors.email = "Invalid email";
  }

  // Contact number validation (10 digits, all numeric)
  const contactRegex = /^\d{10}$/;
  if (details.contactNo && !contactRegex.test(details.contactNo)) {
    errors.contactNo = "Invalid contact number";
  }

  // Password match check
  if (details.password !== details.confirmPassword) {
    errors.main = "Passwords do not match";
  }

  return errors;
};

export const validateLoginDetails = (details: typeof emptyLoginDetails) => {
  const errors: Record<string, string> = {};

  // Required field check
  for (const [key, value] of Object.entries(details)) {
    if (!value.trim()) {
      errors[key] = `${key} is required`;
    }
  }

  return errors;
};
