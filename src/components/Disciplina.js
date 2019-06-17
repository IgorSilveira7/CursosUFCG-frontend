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
        let html = `
            <div>
                <p>${this.nome}</p>
                <p>${this.id}</p>
            </div>
        `;
    }
}

customElements.define("ps-disciplina", Disciplina);