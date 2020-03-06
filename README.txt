---------ncu
//instala o ncu ou npm check update
    npm install -g npm-check-updates
//verifica as atualizações dos pacotes
    ncu
//modifica o arquivo package.json com as novas versões
    ncu -u
//excluir a pasta node_modules
//Angular V8 trabalha com "typescript": "~3.5.3" ultima versão disponivel no repositorio https://www.npmjs.com/package/typescript, 
//apôs sobe para 3.7, a 3.6 ficou na beta, e entao subiu para 3.7
//executar o npm install para instalar os novos pacotes
    npm install 

---------ng update
//instala a ultima versão do angular/cli
    npm install -g @angular/cli
//executar o comando acima dentro da pasta do projeto para verificar as possiveis atualizações
    ng update
//processar os comandos solicitados para atualizar os pacotes sugeridos

---------node.js
//para atualizar no windows, realizar o download da ultima versão no site https://nodejs.org/en/ e então instalar.

---------plugins
    Angular Language Service - Desenvolvedor Angular
//adiciona funcionalidades ao editor com base nas diretivas e interpolação do Angular.
    Angular Snippets (Version 8) - Desenvolvedor John Papa
//adiciona funcionalidades para criação dos templates dos principais arquivos, usando atalhos como a-ngif, a-ngfor e etc
    Atom One Dark Theme
//defini um novo thema para o visual studio code baseado no IDE Atom
    Auto Import
//Adiciona a funcionalidade de auto import ao declarar uma classe
    Bracket Pair Colorizer 2
//Pinta os conchetes ou chaves de um metodo, classe ou função para facilitar na visualização
    HTML Snippets
//Adiciona funcionalidades do html como fechamento de tag automaticamente
    JavaScript (ES6) code Snippets
//Adiciona funcionalidades de atalho baseado na ecmascript 6 para linguagem JavaScript
    vscode-icons
//atualiza os icones do vscode
    IntelliSense for CSS class names in HTML
//Adiciona funcionalidade de intellisense para classes css ao escrever um template html
    rest client
//funcionalidade para testar os end-point de api
//criar arquivo com o nome exemplo.http na pasta root do projeto
//exemplos de commandos
    GET http://localhost:3000/cursos

    ###

    GET http://localhost:3000/cursos/1

    ###

    POST http://localhost:3000/cursos HTTP/1.1
    content-type: application/json

    {
        "curso": "ANGULAR"
    }

    ###

    PUT http://localhost:3000/cursos/2 HTTP/1.1
    content-type: application/json

    {
        "curso": "C++"
    }

    ###

    DELETE http://localhost:3000/cursos/1
    Docker from microsoft
//extenções para trabalhar com imagens Docker
    Azure Tools
//extenções para trabalhar com microsoft Azure


---------simulando JSON server
// procurar no site npm json-server
    npm install -g json-server
//criar arquivo do banco de dados na pasta root do projeto com o nome db.json
//exemplo:
    {
        "cursos": [
        { "id": 1, "curso": "Angular" }
        ]
    }
//executar o servidor com o comando
    json-server --watch db.json

---------Opções interessantes para app-routing.module.ts
//scrollPositionRestoration faz com que quando o usuario navegar para uma pagina e clicar em voltar, volte para a mesma altura da pagina que havia saido
//malformedUriErrorHandler função que podemos utilizar para capturar url's mal formatadas e então fazer um pars, ou seja, substituir a informação errada pela certa
    @NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled', 
        malformedUriErrorHandler: (error: URIError, urlSerializer: UrlSerializer, url: string) => {      
        return urlSerializer.parse('/not-found')
        }
    })],
    exports: [RouterModule]
    })
    export class AppRoutingModule {}

--------PreserveWhitespaces
//Interessante colocar "preserveWhitespaces: true" no componente pare manter os espaços em brancos entre botoes por exemplo
@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [],
  preserveWhitespaces: true
})

--------Firebase
    npm install -g firebase-tools
    firebase login
//Serviço de hosting do firebase Google
//Para fazer o deploy
//se for a primeira vez
    ng add @angular/fire
//deploy
    ng deploy

--------Servidor HTTP NGINX
    https://www.nginx.com/
//Servidor para compilar imagem Docker

--------Configurações NGINX
//https://github.com/DanWahlin/Angular-Core-Concepts/blob/master/config/nginx.conf
//Configurações interessantes para o servidor NGINX


--------Usar o guarda de rota Resolver
//utilizado para carregar o objeto antes de inicializar o componente.
//exemplo em angularApp/request-app/cursos/guards
