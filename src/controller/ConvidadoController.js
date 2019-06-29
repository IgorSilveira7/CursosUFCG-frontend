import { BASEURL } from "../services/api.js";
import { getToken } from "../services/auth.js";
import "../components/Disciplinas/Disciplina.js";
import "../components/Disciplinas/LstDisciplinas";

document.getElementById("btnBuscar").onclick = render;
var dados;

async function render() {
    document.getElementsByClassName("content")[0].style.backgroundColor = "white";
    let queryD = document.getElementById("txtDisciplina").value;
    let ps = document.getElementById("ps-disciplinas");
    ps.style.visibility = "visible";
    ps.setAttribute("query", queryD);
}