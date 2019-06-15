const TOKEN_KEY = "@token_user";

const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

const getToken = () => localStorage.getItem(TOKEN_KEY);

const login = (login) => {
    localStorage.setItem(TOKEN_KEY, login);
};

const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export { isAuthenticated, getToken, login, logout };