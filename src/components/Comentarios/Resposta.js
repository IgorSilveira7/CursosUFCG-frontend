import { getEmail } from "../../services/auth.js";
import { BASEURL } from "../../services/api.js";
import { getPerfil, getToken } from "../../services/auth.js";


class Resposta extends HTMLElement {
    constructor() {
        super();
        this.$shadowRoot = this.attachShadow({"mode": "open"});
    }

    connectedCallback() {
        this.id = this.getAttribute('id');
        this.username = this.getAttribute('usuario');
        this.data = this.getAttribute('data');
        this.texto = this.innerHTML;
        this.autenticado = this.getAttribute('autenticado');
        this.render();
    }

    render() {
        let div = document.createElement("div");
        div.innerHTML = `<link rel="stylesheet" href="../components/Comentarios/comentario.css">`;
        let info_username_data = document.createElement("p");
        let texto = document.createElement("p");
        info_username_data.innerHTML = this.username + " - " + this.data;
        texto.innerHTML = this.texto;
        div.appendChild(info_username_data);
        div.appendChild(texto);

        if (this.autenticado == "true") {
            let button = document.createElement("button");
            button.innerHTML = "Apagar";
            button.className = "botao";
            button.onclick = () => this.apagarComentario();

            div.appendChild(button);
        }

        this.$shadowRoot.appendChild(div);
    }

    async apagarComentario() {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        };
    
        let config = {
            method: 'DELETE',
            headers:  headers,
            mode: "cors"
        };

        try {
            const url = BASEURL + "/v1/comentario/apagarComentario/"+ getPerfil() + "/" + this.id + "/" + getEmail();
            let response = await fetch(url, config);
            
            if (!response.ok) {
                throw response;
            }
            let comentario = await response.json();

            this.$shadowRoot.innerHTML = "";
        } catch (error) {
            let e = await error.json();
            console.log(e);
        }
    }
}

customElements.define("ps-resposta", Resposta);