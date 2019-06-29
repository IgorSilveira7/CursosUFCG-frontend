import { setPerfil } from "../../services/auth.js";

class Perfil extends HTMLElement {
    constructor() {
        super();
        this.$shadowRoot = this.attachShadow({"mode": "open"});
    }

    connectedCallback() {
        this.nome = this.getAttribute('nome');
        this.id = this.getAttribute('id');
        this.render();
    }

    render() {
        let div = document.createElement("div");
        
        let info = document.createElement("p");
        info.innerHTML = this.id + " - " + this.nome;
        
        let a = document.createElement("a");
        a.innerHTML = "Ir para perfil";
        a.href = "./perfilD.html";
        a.onclick = () => this.perfil();

        div.appendChild(info);
        div.appendChild(a);

        this.$shadowRoot.appendChild(div);
    }

    perfil () {
        setPerfil(this.id);
    }
}

customElements.define("ps-perfil", Perfil);