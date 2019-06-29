class Disciplina extends HTMLElement {
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
        let $html = `
            <div>
                <p>${this.id} - ${this.nome}</p>
            </div>
        `;
        this.$shadowRoot.innerHTML = $html;
    }
}

customElements.define("ps-disciplina", Disciplina);