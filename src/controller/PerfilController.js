import { BASEURL } from "../services/api.js";
import { getEmail, getPerfil } from "../services/auth.js";
import "../components/Comentarios/LstComentarios.js";

let Perfil = {};

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
        btnLike.style.color = "red";
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
        console.log(Perfil);
    } catch (error) {
        let e = await error.json();
        console.log(e);
    }
}

async function comentar() {
    
}

render();