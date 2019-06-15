export const TOKEN_KEY = "@token_user";

export const isAuthenticated = () => localStorage.getItem(TOKEN) !== null;

export const getToken = () => localStorage.getItem(TOKEN);

export const login = (login) => {
    localStorage.setItem(TOKEN, token);
}

export const logout = () => {
    localStorage.removeItem(TOKEN);
}