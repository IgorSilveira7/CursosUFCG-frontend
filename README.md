# [Cursos UFCG](https://igorsilveira7.github.io/CursosUFCG/src/view/index.html)
> Repositório para o Front-end do projeto da disciplina de Projeto de Software

## Bibliotecas utilizadas:

Nome           | Utilizada para
:-------------- | :------:
Fetch          | Para realizar as requisições para o banco.
Custom Elements| Para criar os WebComponents da aplicação.


## Explicação sobre os diretórios:
> Uma explicação sobre cada arquivo e pasta do projeto.

- `src/components` Diretório onde encontra-se todos os WebComponents da aplicação.
    - `/Comentario` Diretório onde encontra-se os WebComponents de comentários.
        - `/Comentario.js` Arquivo responsável pela lógica de um comentário: Renderizar, renderizar respostas, evento de adicionar uma resposta e apagar o comentário.

        - `LstComentarios.js` Arquivo responsável pela lógica da listagem de comentários: acessa API e captura os comentários daquele perfil selecionado.

        - `Resposta.js` Arquivo responsável pela lógica de uma resposta a um comentário: Apagar essa resposta(caso seja o dono da resposta).
        
        - `comentario.css` Arquivo de estilização do WebComponent `comentario.js`.
        
        - `comentarios.css` Arquivo de estilizaço do WebComponent `LstComentarios.js`.
    
    - `/Disciplinas` Diretório onde encontra-se os WebComponents de comentários.
        - `/Disciplina.js` Arquivo responsável pela lógica de uma disciplina: Renderizar o Id e Nome da disciplina.
        
        - `/LstDisciplinas.js` Arquivo responsável pela lógica de listagem de disciplinas: Acessa a API, e captura uma Lista de disciplinas e renderiza para cada WebComponent `Disciplina.js`.

    - `/Perfil` Diretório onde encontra-se os WebComponents de listagem de perfil e permite abrir a página especifica sobre um Perfil.
        - `/InfoPerfil.js.js` Arquivo responsável pela lógica de um perfil: Renderizar o Id, Nome da disciplina e um botão que ao clicar irá abrir a página do Perfil selecionado.
        
        - `/LstPerfils.js.js` Arquivo responsável pela lógica de listagem de perfis: Acessa a API, e captura uma Lista de perfis e renderiza para cada WebComponent `InfoPerfil.js`. E permite que o usuário faça uma listagem pela quantidade de likes ou quantidade de comentários.
        
        - `perfil.css`Arquivo de estilização do WebCompnent `InfoPerfil.js`.

- `src/controller` Diretório onde encontra-se todos os Controllers da aplicação
    - `/ConvidadoController.js` Arquivo responsável por controlar a página de `view/convidado.html`, na qual é permitido um usuário não autenticado fazer buscas pelas disciplinas cadastradas no sistema. E ele renderiza o WebComponent de listagem de todas as disciplinas `components/Disciplinas/LstDisciplinas.js`.
    
    - `/LoginController.js` Arquivo responsável por controlar a página de login para usuário. Após o usuário digitar seus dados, o controller irá verificar as credenciais informadas e passar para a API, caso seja bem sucedida a autenticação, será salvo o `Email` e `token` do usuário e irá redirecionar o usuário para a página de `view//login_index.html`. Caso dê algo de errado, a mensagem de erro será devidamente tratada e mostrada ao usuário.
    
    - `/loginIndex.js` Arquivo responsável por controlar a página de index quando o usuário realiza o login, na qual será listado todos os perfis cadastrados no sistema, usando o WebComponent `components/Perfil/LstPerfils.js`. E é quem repassa para o WebComponent qual o tipo d ordenação o usuário escolheu(inofmração repassada através de um atributo do Componente.
  
    - `/PerfilController.js` Arquivo responsável por controlar a página de informaçes de um perfil. Irá acessar a API e capturar o perfil e renderizar as informaçes de: ID, nome da disciplina e quantidade de likes. E também é quem controla a ação de dar like e comentar no perfil.
    
    - `/SignUp.js` Arquivo responsável por controlar a página de cadastro para um novo usuário. Após o usuário digitar seus dados, o controller irá verificar os dados informados e passar para a API, caso seja bem sucedida a requisição, o usuário será cadastrado e irá redirecionar o usuário para a página de `view/index.html` para que ele possa realizar o login. Caso dê algo de errado, a mensagem de erro será devidamente tratada e mostrada ao usuário.
    
- `src/model` Diretório onde encontra-se todos os Controllers da aplicação
    
- `src/services` Diretório onde encontra-se todos os arquivos de serviços de nossa aplicação, URL Base do BackEnd e funções de salvar dados no localStorage do navegador.
    - `/api.js` Arquivo responsável por exportar a URL Base da aplicação do BackEnd para que possa realizar as requisições de maneira mais fácil.

    - `/auth.js` Arquivo responsável por salvar os dados necessários no localStorage do navegador: Salvar o `token` e `email` ao realizar login, remove caso eu faça logout. Salvar o ID do perfil na qual o usuário selecionou. E verifica se o usuário está autenticado. O arquivo exporta todos essas funcções.

- `src/view` Diretório onde encontra-se todos os arquivos de Views e Estilização das páginas da aplicação.
    - `/convidado.html` Arquivo responsável pela estrutura da página `convidado`, página para um usuário não autenticado procurar pelas disciplinas. Onde importa o script do controller responsável pela funcionalidade.
    
    - `/index.html` Arquivo responsável pela estrutura da página `login`, essa é a página inicial da nossa aplicação. Onde importa o script do controller responsável pela funcionalidade de login.

    - `/login_index.html` Arquivo responsável pela estrutura da página `login Index`, página na qual o usuário é levado após fazer login, onde ele iŕa poderá listar todos os perfis, procurando por substring) ou ordenando por quantidade de likes ou comentários, e também ele irá poder ir para a página especifica de um perfil. Onde importa o script do controller responsável pela funcionalidade.

    - `/perfilD.html` Arquivo responsável pela estrutura da página `perfil`, página que mostra as informações de um perfil de uma disciplina: ID, nome da disciplina, quantidades de like, botão de curtir e comentar um perfil, a listagem de comentários é feita pelo WebComponent `components/LstComentarios.js`. Onde importa o script do controller responsável pela funcionalidade.

    - `/signup.html` Arquivo responsável pela estrutura da página `cadastrar` um usuário. Onde importa o script do controller responsável pela funcionalidade.

    - `/styles` Diretório onde encontra-se os arquivos de estilização das páginas.
        - `/convidade.css` Arquivo de estilização da página `convidado`.
        - `/estilo.css` Arquivo de estilização de `footer` e `header` para todas as páginas.
        - `/loginIndex.css` Arquivo de estilização da página `Login Index`.
        - `/perfilD.css` Arquivo de estilização da página `Perfil`.
        - `/signup.css` Arquivo de estilização da página `Cadastro`.
