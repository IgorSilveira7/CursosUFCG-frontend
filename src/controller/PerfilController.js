import { BASEURL } from "../services/api.js";
import { getEmail, getPerfil, getToken } from "../services/auth.js";
import "../components/Comentarios/LstComentarios.js";

let Perfil = {};
let token = getToken();

// botões
const btnLike = document.getElementById("likeBtn");
const btnComment = document.getElementById("commentBtn");

btnLike.onclick = () => like();
btnComment.onclick = () => comentar();

const idPerfil = getPerfil() || 1;
let ps = document.getElementById("ps-comentarios");
ps.setAttribute("id_perfil", idPerfil);


async function api() {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    };
    
    let config = {
        method: 'GET',
        headers:  headers,
        mode: "cors"
    };

    try {
        const url = BASEURL + "/v1/perfil/" + idPerfil + "/" + getEmail();
        let response = await fetch(url, config);
        if (!response.ok) {
            throw response;
        }

        let perfil = await response.json();
        Perfil = perfil;
        console.log(Perfil);
    } catch (error) {
        let e = await error.json();
        console.log(e);
    }

}

async function render() {
    await api();
    if (Perfil.usuarioAutenticadoCurtiu) {
        btnLike.style.color = "black";
        btnLike.style.backgroundColor = "white";
        btnLike.style.borderStyle = "solid";
    } else {
        btnLike.style.color = "white";
        btnLike.style.backgroundColor = "black";
        btnLike.style.borderStyle = "none";
    }

    const $id = document.getElementById("id");
    const $nome = document.getElementById("nome");
    const $like = document.getElementById("like");
    const $media = document.getElementById("media");

    $id.innerText = "ID: " + Perfil.id;
    $nome.innerText = "Nome: " + Perfil.disciplina.nome;
    $like.innerText = "Curtidas: " + Perfil.curtidas.length;
    $media.innerText = "Média: " + Perfil.media;
}

async function like() {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
    };

    let config = {
        method: 'POST',
        headers:  headers,
        mode: "cors"
    };

    try {
        const url = BASEURL + "/v1/perfil/curtir/" + idPerfil + "/" + getEmail();
        let response = await fetch(url, config);
        if (!response.ok) {
            throw response;
        }

        let perfil = await response.json();
        Perfil = perfil;
        render();
    } catch (error) {
        let e = await error.json();
        console.log(e);
    }
}

async function comentar() {
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
    };

    let comentario = {
        "conteudo": document.getElementById("commentText").value
    };

    let config = {
        method: 'POST',
        headers:  headers,
        body: JSON.stringify(comentario),
        mode: "cors"
    };

    try {
        const url = BASEURL + "/v1/comentario/" + idPerfil + "/" + getEmail();
        let response = await fetch(url, config);
        if (!response.ok) {
            throw response;
        }

        let comentario = await response.json();
    } catch (error) {
        let e = await error.json();
        console.log(e);
    }
}

render();