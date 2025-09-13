import axios from 'axios';

// Extend the axios config type to include metadata
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
  }
}

// Environment configuration
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// API Base URL configuration
const getApiBaseUrl = (): string => {
  // Check for explicit environment variable first
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Default URLs based on environment
  if (isDevelopment) {
    console.log('Using development default URL: http://localhost:3001');
    return 'http://localhost:3001';
  }

  if (isProduction) {
    // In production, you would use your deployed backend URL
    console.log('Using production URL');
    return 'https://resume-builder-backend.happyground-25b79e78.eastus.azurecontainerapps.io';
  }

  // Fallback
  console.log('Using fallback URL: http://localhost:3001');
  return 'http://localhost:3001';
};

const API_BASE_URL = getApiBaseUrl();

// Token cache to avoid repeated auth calls
let tokenCache: { token: string; expires: number; userKey: string } | null =
  null;

// Create axios instance with proper configuration
export const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Function to get backend JWT token using NextAuth session
async function getBackendToken(session: any): Promise<string | null> {
  if (!session?.user) {
    console.log('No session available');
    return null;
  }

  // Check if we have a valid cached token for this user
  const userKey = session.user.email;
  if (
    tokenCache &&
    tokenCache.expires > Date.now() &&
    tokenCache.userKey === userKey
  ) {
    console.log('Using cached token for user:', userKey);
    return tokenCache.token;
  }

  try {
    console.log('Getting fresh backend token for user:', userKey);

    // Use the actual logged-in user from NextAuth session
    const authResponse = await axios.post(
      `${API_BASE_URL}/api/v1/auth/register`,
      {
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      },
      {
        timeout: 10000, // 10 second timeout for auth
      }
    );

    if (authResponse.data.access_token) {
      const token = authResponse.data.access_token;
      // Cache token for 1 hour with user key
      tokenCache = {
        token,
        expires: Date.now() + 60 * 60 * 1000, // 1 hour
        userKey: userKey,
      };
      console.log(
        '✅ Successfully obtained and cached backend token for user:',
        userKey
      );
      return token;
    } else {
      console.error('No access token in auth response:', authResponse.data);
    }
  } catch (error: any) {
    console.error('❌ Failed to get backend token:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      code: error.code,
    });

    // Clear any invalid cache
    tokenCache = null;
  }

  return null;
}

// Request interceptor for debugging (no auth - use api-client.ts for authenticated requests)
api.interceptors.request.use(
  async config => {
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    return config;
  },
  error => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  response => {
    // Log successful requests in development
    if (isDevelopment && response.config.metadata?.startTime) {
      const duration =
        new Date().getTime() - response.config.metadata.startTime.getTime();
      console.log(
        `✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`
      );
    }
    return response;
  },
  error => {
    // Enhanced error logging
    const errorInfo = {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    };

    console.error('API Error:', errorInfo);

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Clear token cache on 401
      tokenCache = null;
      console.log('Authentication failed, clearing token cache');
    } else if (error.response?.status === 403) {
      console.error('Access forbidden - insufficient permissions');
    } else if (error.response?.status === 404) {
      console.error('API endpoint not found:', error.config?.url);
    } else if (error.response?.status >= 500) {
      console.error('Server error - backend may be down');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused - backend is not running');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('Request timeout - backend is slow or unresponsive');
    }

    return Promise.reject(error);
  }
);

// Export configuration for debugging
export const apiConfig = {
  baseURL: API_BASE_URL,
  isDevelopment,
  isProduction,
};

export default api;
