import { BASEURL } from "../../services/api.js";
import { getEmail, getToken } from "../../services/auth.js";
import "./Comentario.js";

class LstComentarios extends HTMLElement {
    constructor() {
        super();
        this.$shadowRoot = this.attachShadow({"mode": "open"});
        this.comentarios = [];
    }

    async connectedCallback() {
        this.atualiza = this.getAttribute("atualiza");
        this.idPerfil = this.getAttribute("id_perfil");
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

    
        const url = BASEURL + "/v1/perfil/" + this.idPerfil + "/" + getEmail();
        try {
            let response = await fetch(url, config);
            if (!response.ok) {
                throw response;
            }

            const r = await response.json();
            this.comentarios = r.comentarios;
        } catch (error) {
            let e = await error.json();
            console.log(e);
        }
    }

    async render() {
        await this.consomeAPI();
        console.log(this.comentarios);
        this.$shadowRoot.innerHTML = "";
        let $dsp = document.createElement("div");
        $dsp.innerHTML = `<link rel="stylesheet" href="../components/Comentarios/comentarios.css">`

        this.comentarios.map(comentario => {
            let $html = `
                <ps-comentario id="${comentario.id}" usuario="${comentario.usuario.primeiroNome}" data=${comentario.date} autenticado=${comentario.comentarioDoUsuarioAutenticado}>${comentario.conteudo}</ps-comentario>
            `;

            let $div = document.createElement("div");
            $div.innerHTML = $html;

            $dsp.appendChild($div);
        });

        this.$shadowRoot.appendChild($dsp);
    }

    static get observedAttributes() {
        return ['id_perfil', 'atualiza'];
    }

    async attributeChangedCallback(name, oldValue, newValue) {
        console.log("OI");
        if (name === "atualiza") {
            this.atualiza = newValue;
            await this.render();
        } else {
            console.log(newValue);
            this.idPerfil = newValue;
            await this.render();
        }
    }
}

customElements.define("ps-comentarios", LstComentarios);