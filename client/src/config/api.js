/**
 * API Configuration
 * 
 * - Development: Falls back to localhost:4000
 * - Production: Uses VITE_API_URL environment variable
 */

export const API_URL = import.meta.env.VITE_API_URL || 'https://project-axiom.onrender.com';
