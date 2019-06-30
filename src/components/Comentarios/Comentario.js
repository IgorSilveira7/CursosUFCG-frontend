import { getEmail } from "../../services/auth.js";
import { BASEURL } from "../../services/api.js";
import { getPerfil } from "../../services/auth.js";
import "./Resposta.js";

class Comentario extends HTMLElement {
    constructor() {
        super();
        this.$shadowRoot = this.attachShadow({"mode": "open"});
        this.respostas = [];
    }

    connectedCallback() {
        this.id = this.getAttribute('id');
        this.username = this.getAttribute('usuario');
        this.data = this.getAttribute('data');
        this.texto = this.innerHTML;
        this.autenticado = this.getAttribute('autenticado');
        this.render();
    }

    async render() {
        let divPrincipal = document.createElement('div');
        divPrincipal.id = "divPrincipal";

        let div = document.createElement("div");
        div.innerHTML = `<link rel="stylesheet" href="../components/Comentarios/comentario.css">`;

        var html = `
            <div>
                <p id="autor">${this.username} - ${this.data}</p>
                <p id="texto">${this.texto}</p>
            </div>
        `;

        let button1 = document.createElement("button");
        button1.innerHTML = "Ver respostas";
        button1.onclick = async () => await this.carregarRespostas();
        div.appendChild(button1);

        if (this.autenticado == "true") {
            let button = document.createElement("button");
            button.innerHTML = "Apagar";
            button.onclick = () => this.apagarComentario();

            div.appendChild(button);
        }
        
        let divRespostas = document.createElement('div');
        divRespostas.id = "respostas";
        if (this.respostas) {
            this.respostas.map(resposta => {
                let html1 = `
                    <ps-resposta id="${resposta.id}" usuario="${resposta.usuario.primeiroNome}" data=${resposta.date} autenticado=${resposta.comentarioDoUsuarioAutenticado}>${resposta.conteudo}</ps-resposta>
                `;
                divRespostas.innerHTML += html1;
            });
        }

        divPrincipal.innerHTML += html;
        divPrincipal.appendChild(div);
        divPrincipal.appendChild(divRespostas);
        this.$shadowRoot.appendChild(divPrincipal);
        this.renderDivResposta();
    }

    renderDivResposta() {
        // Div Principal.
        let divAddResposta = document.createElement('div');
        divAddResposta.id = "addResposta";

        // Botão de responder.
        let btnResponder = document.createElement('button');
        btnResponder.id = "btnResponder";
        btnResponder.innerHTML = "Responder";
        btnResponder.onclick = () => this.adicionarResposta();

        // Área de texto.
        let html = `
            <textarea id="commentAswerText"></textarea>
        `;

        // Adicionando elementos no 'shadowRoot'.
        divAddResposta.innerHTML = html;
        divAddResposta.appendChild(btnResponder);
        divAddResposta.style.display = "grid";
        

        this.$shadowRoot.getElementById("divPrincipal").appendChild(divAddResposta);
    }

    async adicionarResposta() {
        const text = this.$shadowRoot.getElementById("commentAswerText").value;
        let comentario = {
            "conteudo": text
        }

        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        };
    
        let config = {
            method: 'POST',
            headers:  headers,
            body: JSON.stringify(comentario),
            mode: "cors"
        };

        try {
            const url = BASEURL + "/v1/comentario/responderComentario/" + this.id + "/" + getEmail();
            let response = await fetch(url, config);

            if (!response.ok) {
                throw response;
            }
            this.respostas = await response.json();
            this.carregarRespostas();
        } catch (error) {
            let e = await error.json();
            console.log(e);
        }
    }

    async apagarComentario() {
        let headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
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

    async carregarRespostas() {
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
            const url = BASEURL + "/v1/comentario/respostas/" + this.id + "/" + getEmail();
            let response = await fetch(url, config);

            if (!response.ok) {
                throw response;
            }
            this.respostas = await response.json();
            this.$shadowRoot.innerHTML = "";
            this.render();
        } catch (error) {
            let e = await error.json();
            console.log(e);
        }
    }
}

customElements.define("ps-comentario", Comentario);