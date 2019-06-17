import { BASEURL } from "../services/api.js";
import { getToken } from "../services/auth.js";
import "../components/Disciplina.js";

class LstDisciplinas extends HTMLElement {
    constructor() {
        super();
        this.$shadowRoot = this.attachShadow({"mode": "open"});
        this.disciplinas = [];
    }

    async connectedCallback() {
        this.query = this.getAttribute("query");
        await this.render();
    }

    async consomeAPI() {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        };
    
        let config = {
            method: 'GET',
            headers:  headers,
            mode: "cors"
        };
    
        const url = BASEURL + "/v1/disciplina/buscar/" + this.query;
        try {
            let response = await fetch(url, config);
            if (!response.ok) {
                throw response;
            }

            this.disciplinas = await response.json();
            console.log(this.disciplinas);
        } catch (error) {
            let e = await error.json();
            console.log(e);
        }
    }

    async render() {
        await this.consomeAPI();
        this.$shadowRoot.innerHTML = "";
        let $dsp = document.createElement("div");

        this.disciplinas.map(disciplina => {
            let $html = `
                <ps-disciplina nome="${disciplina.nome}" id="${disciplina.id}"></ps-disciplina>
            `;

            let $div = document.createElement("div");
            $div.innerHTML = $html;

            $dsp.appendChild($div);
        });

        this.$shadowRoot.appendChild($dsp);
    }

    static get observedAttributes() {
        return ['query'];
    }

    async attributeChangedCallback(name, oldValue, newValue) {
        this.query = newValue;
        await this.render();
    }
}

customElements.define("ps-disciplinas", LstDisciplinas);