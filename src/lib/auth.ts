export const AUTH_KEYS = {
  TOKEN: "auth_token",
};

export const auth = {
  getToken: () => localStorage.getItem(AUTH_KEYS.TOKEN),
  setToken: (token: string) => localStorage.setItem(AUTH_KEYS.TOKEN, token),
  clearToken: () => localStorage.removeItem(AUTH_KEYS.TOKEN),
  isAuthenticated: () => !!localStorage.getItem(AUTH_KEYS.TOKEN),
};
