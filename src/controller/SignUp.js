import { BASEURL } from "../services/api.js";

document.getElementById("btn_cadastrar").onclick = CadastrarUsuario;

async function CadastrarUsuario() {
    const primeiroNome = document.getElementById("name");
    const ultimoNome = document.getElementById("lastname");
    const email = document.getElementById("email");
    const senha = document.getElementById("password");
    const confirmSenha = document.getElementById("confirmPassword");

    if(primeiroNome.value.trim() === "" || ultimoNome.value.trim() === "" || email.value.trim() === "" || senha.value.trim() === ""){
        showErrorMsg();
        document.getElementById("errorMsg").innerText = "Todas as informações são obrigatórias!"; 
    }

    primeiroNome.onmousedown =  hiddeErrorMsg;
    ultimoNome.onmousedown = hiddeErrorMsg;
    email.onmousedown = hiddeErrorMsg;
    senha.onmousedown = hiddeErrorMsg;
    confirmSenha.onmousedown = hiddeErrorMsg;

    const usuario = {
        "email": email.value,
        "primeiroNome": primeiroNome.value,
        "ultimoNome": ultimoNome.value,
        "senha": senha.value
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

    try {
        let response = await fetch(BASEURL + "/v1/usuario/", config);
        if (!response.ok) {
            throw response;
        }

        let dados = await response.json();
        window.location.href = "../view/index.html";
    } catch (error) {
        let e = await error.json();
        document.getElementById("errorMsg").style.visibility = "visible";
        document.getElementById("errorMsg").innerText = e.message;
    }
}

function showErrorMsg(){
    document.getElementById("errorMsg").style.position = "relative";
    document.getElementById("errorMsg").style.visibility = "visible";
    document.getElementById("errorMsg").style.color = "red";
}

function hiddeErrorMsg(){
    document.getElementById("errorMsg").style.visibility = "hidden";
    document.getElementById("errorMsg").style.position = "absolute";
}