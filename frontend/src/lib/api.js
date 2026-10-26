import axios from 'axios';

/**
 * Central API client for the MyLinkSpace backend.
 *
 * Endpoint source of truth: backend/routes/api.php (all routes are exposed
 * under the `api` prefix via RouteServiceProvider).
 */

// VITE_API_BASE_URL example: http://localhost:8000 (no trailing slash needed).
const API_ROOT = import.meta.env.VITE_API_BASE_URL || '';

export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

export const client = axios.create({
  baseURL: `${API_ROOT}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Attach the Sanctum personal access token to every request.
client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const extractError = (error, fallback) =>
  error?.response?.data?.message ||
  (error?.response?.data?.errors
    ? Object.values(error.response.data.errors).flat().join(' ')
    : null) ||
  error?.message ||
  fallback;

/** Read the authenticated user (id, name, ...) from localStorage. */
export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null;
  } catch {
    return null;
  }
};

export const getStoredUserId = () => getStoredUser()?.id ?? null;

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const persistSession = ({ user, token }) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/** POST /api/login — { status, user, token } */
export async function login(email, password) {
  try {
    const { data } = await client.post('/login', { email, password });
    persistSession(data);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: extractError(error, 'Unable to log in') };
  }
}

/** POST /api/register — expects name/email/password(+confirmation), returns { user, token } */
export async function register(name, email, password) {
  try {
    const { data } = await client.post('/register', {
      name,
      email,
      password,
      password_confirmation: password,
    });
    persistSession(data);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: extractError(error, 'Unable to create an account') };
  }
}

/** POST /api/logout */
export async function logout() {
  try {
    await client.post('/logout');
  } catch {
    // Token already invalid — clear locally regardless.
  }
  clearAuth();
}

/** GET /api/users/{userId}/links */
export async function getLinks(userId) {
  try {
    const { data } = await client.get(`/users/${userId}/links`);
    return { data: Array.isArray(data) ? data : data?.data ?? [], error: null };
  } catch (error) {
    return { data: null, error: extractError(error, 'Unable to load links') };
  }
}

/** POST /api/users/{userId}/links — payload: { title, url, is_active?, ... } */
export async function createLink(userId, payload) {
  try {
    const { data } = await client.post(`/users/${userId}/links`, payload);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: extractError(error, 'Unable to create link') };
  }
}

/** PUT /api/users/{userId}/links/{id} */
export async function updateLink(userId, id, payload) {
  try {
    const { data } = await client.put(`/users/${userId}/links/${id}`, payload);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: extractError(error, 'Unable to update link') };
  }
}

/** DELETE /api/users/{userId}/links/{id} */
export async function deleteLink(userId, id) {
  try {
    await client.delete(`/users/${userId}/links/${id}`);
    return { data: null, error: null };
  } catch (error) {
    return { data: null, error: extractError(error, 'Unable to delete link') };
  }
}
