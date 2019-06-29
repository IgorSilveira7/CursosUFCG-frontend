import { BASEURL } from "../services/api.js";
import { getToken } from "../services/auth.js";
import "../components/Perfil/LstPerfils.js";

document.getElementById("btnBuscar").onclick = render;
document.getElementById("btnPorLikes").onclick = buscarPorLikes;
document.getElementById("btnPorComentarios").onclick = buscarPorComentarios;

var dados;

async function render() {
    document.getElementsByClassName("content")[0].style.backgroundColor = "white";
    let queryD = document.getElementById("txtDisciplina").value;
    let ps = document.getElementById("ps-perfils");
    ps.style.visibility = "visible";
    ps.setAttribute("ordenation", "");
    ps.setAttribute("query", queryD);
}

async function buscarPorLikes() {
    document.getElementsByClassName("content")[0].style.backgroundColor = "white";
    let ps = document.getElementById("ps-perfils");
    ps.style.visibility = "visible";
    ps.setAttribute("ordenation", "likes");
}

async function buscarPorComentarios() {
    document.getElementsByClassName("content")[0].style.backgroundColor = "white";
    let ps = document.getElementById("ps-perfils");
    ps.style.visibility = "visible";
    ps.setAttribute("ordenation", "comentarios");
}