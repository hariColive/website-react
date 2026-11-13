import type { ContactFormValues } from "./formTypes";

export type FormValidationErrors = Partial<Record<keyof ContactFormValues, string>>;

export function validateContactForm(values: ContactFormValues): FormValidationErrors {
  const errors: FormValidationErrors = {};

  const trimmedName = values.name.trim();
  const trimmedMobile = values.mobile.trim();
  const trimmedEmail = values.email.trim();
  const trimmedMessage = values.message.trim();

  if (!trimmedName) {
    errors.name = "Name is required.";
  }

  if (!trimmedMobile) {
    errors.mobile = "Mobile number is required.";
  } else if (!/^\d{10}$/.test(trimmedMobile)) {
    errors.mobile = "Enter a valid 10-digit mobile number.";
  }

  if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = "Enter a valid email address.";
  }

  if (!trimmedMessage) {
    errors.message = "Message is required.";
  }

  if (!values.select.trim()) {
    errors.select = "Please select an option.";
  }

  return errors;
}
