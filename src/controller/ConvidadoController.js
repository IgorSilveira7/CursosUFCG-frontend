import { BASEURL } from "../services/api.js";
import { getToken } from "../services/auth.js";
import "../components/Disciplina.js";

document.getElementById("btnBuscar").onclick = render();
var dados;

async function render() {
    await consumeAPI();
    let $dsp = document.getElementById("lstDisciplinas");

    dados.map(disciplina => {
        let $html = `
            <ps-disciplina name="${disciplina.nome}" id="${disciplina.id}"></ps-disciplina>
        `;

        let $div = document.createElement("div");
        $div.innerHTML = $html;

        $dsp.appendChild($div);
    });
}

async function consumeAPI() {
    let $dsp = document.getElementById("lstDisciplinas");
    let queryD = document.getElementById("txtDisciplina").value;

    let headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };

    let config = {
        method: 'GET',
        headers:  headers,
        body: JSON.stringify(credenciais),
        mode: "cors"
    };

    const url = BASEURL + "/v1/disciplina/buscar/" + queryD;
    try {
        let response = await fetch(url, config);
        if (!response.ok) {
            throw response;
        }
        dados = await response.json();
        
        console.log(dados);
    } catch (error) {
        let e = await error.json();
        console.log(e);
    }
}