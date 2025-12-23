/**
 * Type definitions for your React hook library
 */

/**
 * Example: Configuration options for your hook
 */
export interface HookOptions {
  /**
   * Enable/disable the hook functionality
   */
  enabled?: boolean;

  /**
   * Callback function when something happens
   */
  onEvent?: (data: unknown) => void;
}

/**
 * Example: Return type of your hook
 */
export interface HookResult {
  /**
   * Current state value
   */
  value: string | null;

  /**
   * Loading state
   */
  isLoading: boolean;

  /**
   * Error state
   */
  error: Error | null;

  /**
   * Function to update the value
   */
  setValue: (newValue: string) => void;

  /**
   * Function to reset the state
   */
  reset: () => void;
}

// Add more type definitions as needed for your hook
