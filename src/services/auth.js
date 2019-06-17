const TOKEN_KEY = "@token_user";
const EMAIL_USUARIO = "@email_user"

const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

const getToken = () => localStorage.getItem(TOKEN_KEY);

const getEmail = () => localStorage.getItem(EMAIL_USUARIO);

const login = (login, emailUsuario) => {
    localStorage.setItem(TOKEN_KEY, login);
    localStorage.setItem(EMAIL_USUARIO, emailUsuario);
};

const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_USUARIO);
};

export { isAuthenticated, getToken, getEmail, login, logout };