import { BASEURL } from "../services/api.js";
import { login } from "../services/auth.js";

document.getElementById("btn_entrar").onclick = realizaLogin;

async function realizaLogin() {
    let email = document.getElementById("email");
    let senha = document.getElementById("password");

    email.onmousedown = _=> document.getElementById("errorMsg").style.visibility = "hidden";
    senha.onmousedown = _=> document.getElementById("errorMsg").style.visibility = "hidden";
    

    if (email.value.trim() === "" || senha.value.trim() === "") { 
        document.getElementById("errorMsg").style.visibility = "visible";
        document.getElementById("errorMsg").innerText = "E-mail/Senha vazio!";
        email.value = "";
        senha.value = "";
    }

    let credenciais = {
        "email": email.value,
        "senha": senha.value
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

    try {
        let response = await fetch(BASEURL + '/v1/login/', config);
        if (!response.ok) {
            throw response;
        }
        let data = await response.json();

        login(data.token, credenciais.email);   
    } catch (error) {
        let e = await error.json();
        document.getElementById("errorMsg").style.visibility = "visible";
        document.getElementById("errorMsg").innerText = e.message;
    }
}

