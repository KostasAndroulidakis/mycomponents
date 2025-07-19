/**
 * Error handling utilities following SSOT principle
 * Centralizes error handling patterns to eliminate duplication
 */

import { UI_TEXT } from "~/constants/ui-text";

/**
 * Type-safe error message extractor
 * Handles unknown error types and provides consistent error messaging
 * @param error The caught error of unknown type
 * @returns Human-readable error message
 */
export function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return UI_TEXT.ERRORS.UNKNOWN_ERROR;
}

/**
 * Creates an enhanced error with additional context
 * @param originalError The original error that occurred
 * @param context Descriptive context for where the error occurred
 * @returns Enhanced Error with context and original message
 */
export function createEnhancedError(originalError: unknown, context: string): Error {
  const originalMessage = extractErrorMessage(originalError);
  return new Error(`${context}: ${originalMessage}`);
}

/**
 * Standardized error logging utility
 * Provides consistent error logging format across the application
 * @param context Description of the operation that failed
 * @param error The error that occurred
 */
export function logError(context: string, error: unknown): void {
  const errorMessage = extractErrorMessage(error);
  console.error(`Error ${context}:`, errorMessage);
}

/**
 * Wrapper for data service operations that handles errors with fallback values
 * Centralizes the try-catch-log-fallback pattern used throughout data services
 * @param operation The operation to execute
 * @param fallback The fallback value to return on error
 * @param context Description of the operation for error logging
 * @returns The operation result or fallback value on error
 */
export function withServiceErrorHandling<T>(
  operation: () => T,
  fallback: T,
  context: string
): T {
  try {
    return operation();
  } catch (error) {
    logError(context, error);
    return fallback;
  }
}

/**
 * Async version of withServiceErrorHandling for Promise-based operations
 * @param operation The async operation to execute
 * @param fallback The fallback value to return on error
 * @param context Description of the operation for error logging
 * @returns Promise resolving to operation result or fallback value on error
 */
export async function withAsyncServiceErrorHandling<T>(
  operation: () => Promise<T>,
  fallback: T,
  context: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    logError(context, error);
    return fallback;
  }
}

/**
 * Wrapper for operations that should fail fast with enhanced error messages
 * Used for critical operations where fallbacks are not appropriate
 * @param operation The operation to execute
 * @param context Description of the operation for error enhancement
 * @returns The operation result
 * @throws Enhanced error with context if operation fails
 */
export function withFailFastErrorHandling<T>(
  operation: () => T,
  context: string
): T {
  try {
    return operation();
  } catch (error) {
    throw createEnhancedError(error, context);
  }
}

/**
 * Safe property accessor with default value
 * Provides type-safe access to potentially undefined properties
 * @param value The value to access safely
 * @param defaultValue The default value if access fails
 * @returns The value or default
 */
export function safeAccess<T>(value: T | undefined | null, defaultValue: T): T {
  return value ?? defaultValue;
}

/**
 * Safe array element accessor with default value
 * @param array The array to access
 * @param index The index to access
 * @param defaultValue The default value if index is out of bounds
 * @returns The array element or default value
 */
export function safeArrayAccess<T>(array: T[], index: number, defaultValue: T): T {
  return array[index] ?? defaultValue;
}