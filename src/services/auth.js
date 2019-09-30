export const TOKEN_KEY = "@transactions-manager-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const currentUser = () => localStorage.getItem(TOKEN_KEY);

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};