import { isAuthenticated, getToken, getEmail } from "../services/auth.js";

const redirectMenu  = () => {
    if (isAuthenticated()) {
        window.location.href = "../view/login_index.html";
    } else {
        window.location.href = "../view/index.html";
    }
}

export { redirectMenu };