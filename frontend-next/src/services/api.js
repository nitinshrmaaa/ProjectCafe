import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export const TOKEN_KEY = "brewhaven.token";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

/** Attach the stored bearer token to every outgoing request. */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/** Normalise every failure into an Error with a human-readable message. */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }

    const normalised = new Error(
      error.response?.data?.message ??
        error.response?.data?.error ??
        (isOffline(error)
          ? "Could not reach the server."
          : "Something went wrong. Please try again.")
    );

    normalised.status = error.response?.status ?? 0;
    normalised.offline = isOffline(error);

    return Promise.reject(normalised);
  }
);

/**
 * The API is unreachable rather than unhappy — no response came back at all.
 * Callers use this to fall back to local handling so the UI stays usable
 * while the backend is still being built.
 */
export function isOffline(error) {
  return (
    !error?.response ||
    error.code === "ECONNABORTED" ||
    error.code === "ERR_NETWORK"
  );
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export default api;
