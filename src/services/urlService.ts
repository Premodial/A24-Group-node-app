import validator from 'validator';
import { randomBytes } from 'crypto';

/**
 * Validates the given URL to ensure it conforms to a valid format. This service
 * utilizes the `validator` library, which provides a comprehensive suite of string validations.
 * 
 * URL validation is crucial for the URL shortening service to prevent the creation of shortened
 * links to malformed or potentially malicious URLs. By centralizing validation logic within this service,
 * we maintain a single source of truth for URL validation criteria, which can be updated or extended
 * as necessary without affecting other parts of the application.
 * 
 * @param {string} url - The URL to validate.
 * @returns {boolean} True if the URL is valid, false otherwise. This boolean response enables
 * straightforward checking within controllers or other parts of the application that require URL validation.
 */
export const validateUrl = (url: string): boolean => {
  return validator.isURL(url, {
    protocols: ['http','https'],
    require_protocol: true
  });
};

/**
 * Generates a URL-safe, unique ID string.
 * 
 * @param {number} length - The length of the ID string.
 * @returns {string} The generated unique ID.
 */
export const generateUniqueId = (length: number = 6): string => {
  return randomBytes(length)
    .toString('base64')
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .substring(0, length); // Ensure the string is of the desired length
}
