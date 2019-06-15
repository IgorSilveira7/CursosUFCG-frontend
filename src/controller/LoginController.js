import { BASEURL } from "../services/api.js";

document.getElementById("btn_entrar").onclick = login;

async function login() {
    let login = {
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
        body: JSON.stringify(login),
        mode: "cors"
    };

    let response = await fetch(BASEURL + '/v1/login/', config);
    let data = await response.json();

    console.log(data.token);
}