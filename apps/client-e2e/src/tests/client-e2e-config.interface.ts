/**
 * Test configuration with constants to easily change timeouts and delays when running tests
 *
 * These occasionally need to change so tests pass 100% of the time
 */
export const CLIENT_E2E_CONFIG = {
  /** Test delays */
  DELAYS: {
    /** Problem delay for PRO files and anything else */
    DEFAULT: 1000,
    /** Delay for tests using problem reporting and notebooks */
    PROBLEMS_NOTEBOOK: 2000,
  },
};
