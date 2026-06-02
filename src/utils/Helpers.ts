/**
 * Resolves the public base URL of the application.
 * @returns The configured public app URL or the local development URL.
 */
export const getBaseUrl = () => process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
