import { BASEURL } from "../services/api.js";

document.getElementById("btn_cadastrar").onclick = CadastrarUsuario;

async function CadastrarUsuario() {
    const primeiroNome = document.getElementById("name").value;
    const ultimoNome = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    const usuario = {
        "email": email,
        "primeiroNome": primeiroNome,
        "ultimoNome": ultimoNome,
        "senha": senha
    };

    var headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };

    let config = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(usuario),
        mode: "cors"
    };

    let response = await fetch(BASEURL + "/v1/usuario/", config);
    let dados = await response.json();

    console.log(dados);
}