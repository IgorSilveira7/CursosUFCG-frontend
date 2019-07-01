import { BASEURL } from "../../services/api.js";
import { getToken } from "../../services/auth.js";
import "./InfoPerfil.js";

class LstPerfils extends HTMLElement {
    constructor() {
        super();
        this.$shadowRoot = this.attachShadow({"mode": "open"});
        this.perfils = [];
    }

    async connectedCallback() {
        console.log("Oi");
        this.query = this.getAttribute("query");
        this.ordenation = this.getAttribute("ordenation");
        await this.render();
    }

    async consomeAPI() {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        };
    
        let config = {
            method: 'GET',
            headers:  headers,
            mode: "cors"
        };
        var url;

        if (this.ordenation === "likes") {
            url =  BASEURL + "/v1/perfil/ordenarPorLikes";
        } else if (this.ordenation === "comentarios") {
            url =  BASEURL + "/v1/perfil/ordenarPorComentarios";
        } else {
            url = BASEURL + "/v1/perfil/buscar/" + this.query;
        }

        try {
            let response = await fetch(url, config);
            if (!response.ok) {
                throw response;
            }

            this.perfils = await response.json();
            console.log(this.perfils);
        } catch (error) {
            let e = await error.json();
            console.log(e);
        }
    }

    async render() {
        await this.consomeAPI();
        this.$shadowRoot.innerHTML = "";
        let $dsp = document.createElement("div");

        this.perfils.map(perfil => {
            let $html = `
                <ps-perfil nome="${perfil.disciplina.nome}" id="${perfil.id}"></ps-disciplina>
            `;

            let $div = document.createElement("div");
            $div.innerHTML = $html;

            $dsp.appendChild($div);
        });

        this.$shadowRoot.appendChild($dsp);
    }

    static get observedAttributes() {
        return ['query', 'ordenation'];
    }

    async attributeChangedCallback(name, oldValue, newValue) {
        if (name === "ordenation") {
            this.ordenation = newValue;
        } else {
            this.query = newValue;
        }

        await this.render();
    }
}

customElements.define("ps-perfils", LstPerfils);