import axios from "axios";
import { appConfig } from "@/app/config/config.js";

export const http = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // sends the httpOnly refresh-token cookie
});

// --- Auth hooks -------------------------------------------------------------
// shared/ must not import from features/. The auth feature injects its
// behaviour at app start via configureAuthHooks() (see src/main.js).

let authHooks = {
  getAccessToken: () => null,
  refreshSession: () => Promise.reject(new Error("Auth hooks not configured")),
  onSessionExpired: () => { },
};

export function configureAuthHooks(hooks) {
  authHooks = { ...authHooks, ...hooks };
}

// --- Request: attach the access token ---------------------------------------

http.interceptors.request.use((config) => {
  const token = authHooks.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Response: refresh once on 401, then retry the request ------------------

// Auth endpoints that must never trigger a refresh (prevents loops).
const NO_REFRESH_URLS = ["/auth/sign-in", "/auth/sign-up", "/auth/refresh"];

let refreshRequest = null;

// Single flight: parallel 401s share one refresh call.
// The promise clears itself, so a later refresh cycle is never affected.
function refreshOnce() {
  refreshRequest ??= authHooks.refreshSession().finally(() => {
    refreshRequest = null;
  });
  return refreshRequest;
}

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const shouldSkip =
      !request ||
      error.response?.status !== 401 ||
      request._retry ||
      request.skipAuthRefresh ||
      NO_REFRESH_URLS.some((url) => request.url?.startsWith(url));

    if (shouldSkip) {
      return Promise.reject(error);
    }

    request._retry = true;

    try {
      await refreshOnce();
    } catch (refreshError) {
      authHooks.onSessionExpired();
      return Promise.reject(refreshError);
    }

    // The request interceptor attaches the new access token on this retry.
    return http(request);
  },
);
