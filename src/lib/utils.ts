import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Form validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Basic phone validation - can be enhanced for specific formats
  const phoneRegex = /^\+?[0-9]{8,15}$/;
  return phoneRegex.test(phone);
}

export function isStrongPassword(password: string): boolean {
  // Password should be at least 8 characters
  return password.length >= 8;
}
