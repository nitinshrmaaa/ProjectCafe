import api, { setToken, getToken } from "./api";
import { sleep } from "../utils/helpers";

const USER_KEY = "brewhaven.user";

/**
 * The backend is not wired up yet, so when the API cannot be reached these
 * calls fall back to a local session. Everything below the `offline` branch
 * is the real implementation and needs no changes once the server is live.
 */

export async function register({ name, email, password }) {
  try {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    persistSession(data);

    return data.user;
  } catch (error) {
    if (!error.offline) throw error;

    return localSession({ name, email });
  }
}

export async function login({ email, password }) {
  try {
    const { data } = await api.post("/auth/login", { email, password });

    persistSession(data);

    return data.user;
  } catch (error) {
    if (!error.offline) throw error;

    return localSession({ name: email.split("@")[0], email });
  }
}

export function logout() {
  setToken(null);
  localStorage.removeItem(USER_KEY);
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);

    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getToken() && getCurrentUser());
}

function persistSession({ token, user }) {
  setToken(token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

async function localSession({ name, email }) {
  await sleep(600);

  const user = {
    id: `local-${Date.now()}`,
    name: name || "Guest",
    email,
    local: true,
  };

  persistSession({ token: `local.${btoa(email)}`, user });

  return user;
}
