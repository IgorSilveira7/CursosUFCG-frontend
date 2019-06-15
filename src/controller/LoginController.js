import { BASEURL } from "../services/api.js";
import { login } from "../services/auth.js";

document.getElementById("btn_entrar").onclick = realizaLogin;

async function realizaLogin() {
    let credenciais = {
        "email": document.getElementById("email").value,
        "senha": document.getElementById("password").value
    };

    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };

    let config = {
        method: 'POST',
        headers:  headers,
        body: JSON.stringify(credenciais),
        mode: "cors"
    };

    let response = await fetch(BASEURL + '/v1/login/', config);
    let data = await response.json();

    login(data.token);
}