export const TOKEN_KEY = "@transactions-manager-Token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const register = data => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(data.email));
  localStorage.setItem('user', JSON.stringify(data));
}

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};