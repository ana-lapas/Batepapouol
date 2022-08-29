let usuariosOnline = [];
const novoUsuario = prompt("Olá, qual seu nome?");

function mostrarSidebar(){
    const mostrar = document.querySelector(".sidebar");
    const contem = mostrar.classList.contains("escondido");
    if(contem === true){
        mostrar.classList.remove("escondido");
    } else {
        mostrar.classList.add("escondido");
    }
}
function selecaoPessoa(pessoaSelecionada){
    const pessoaSelecionadaAnteriormente = document.querySelector(".usuariosOnline .selecionado");
    if(pessoaSelecionadaAnteriormente !== null){
        pessoaSelecionadaAnteriormente.classList.remove("selecionado");
    }
    pessoaSelecionada.classList.add("selecionado");
}
function selecaoVisibilidade(visibilidadeSelecionada){
    const visibilidadeSelecionadaanteriormente = document.querySelector(".inferior .selecionado");
    if (visibilidadeSelecionadaanteriormente !== null){
        visibilidadeSelecionadaanteriormente.classList.remove("selecionado");
    }
    visibilidadeSelecionada.classList.add("selecionado");
}
function cadastroUsuariosOn() {
    const cadastroUsuario = {
        name: novoUsuario
    };
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", cadastroUsuario);    
    promessa.then(pegarUsuarios);//se der certo
    promessa.catch(mostraErro);//se der errado
}
/*function entreiNaSala(){
    const mensagemFormato = {from: novoUsuario,
        to: "Todos",
        text: "entra na sala...",
        type: "status"
    }
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",mensagemFormato);
    promessa.then(buscarMensagens);
    promessa.catch(mostraErro);
}*/
function enviarMensagens(){
    const mensagemDigitada = document.querySelector("input").value;
    const mensagemFormato = {from: novoUsuario,
	to: "Todos",
	text: mensagemDigitada,
	type: "message"}
    
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagemFormato);
    promessa.then(buscarMensagens);
    promessa.catch(mostraErro);
}
function buscarMensagens(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(renderizarMensagens);
    //promessa.catch(window.location.reload());

}
function renderizarMensagens(resposta){
    const dadosMensagens = resposta.data;
    const inserirMensagens = document.querySelector(".espacoMensagens");
    for(let i =0; i <dadosMensagens.length; i++){
        if((dadosMensagens[i].text === "entra na sala...") || (dadosMensagens[i].text === "sai da sala...") ){
            let msg = `<span class="p3">(${dadosMensagens[i].time})</span> &nbsp;&nbsp;<span class="p1"> ${dadosMensagens[i].from} </span>&nbsp;&nbsp;<span class="p2"> para </span>&nbsp;&nbsp;<span class="p1"> ${dadosMensagens[i].to}</span><span class="p2">:&nbsp;&nbsp; ${dadosMensagens[i].text}</span>`;
            inserirMensagens.innerHTML += `<li class="status">${msg}</li>`;
            inserirMensagens.scrollIntoView();
        } else {
            let msg = `<span class="p3">(${dadosMensagens[i].time})</span> &nbsp;&nbsp;<span class="p1"> ${dadosMensagens[i].from} </span>&nbsp;&nbsp;<span class="p2"> para </span>&nbsp;&nbsp;<span class="p1"> ${dadosMensagens[i].to}</span><span class="p2">:&nbsp;&nbsp; ${dadosMensagens[i].text}</span>`;
            
            inserirMensagens.innerHTML += `<li class="normal">${msg}</li>`;
            inserirMensagens.scrollIntoView();
        }
    }
}
function pegarUsuarios(){
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promessa.then(verificarUsuarios);//se der certo
    promessa.catch(mostraErro);//se der errado
}
let listaUsers;
function verificarUsuarios(resposta1){
    listaUsers = resposta1.data;
    console.log("aqui lita")
    console.log(listaUsers)
    for (let i = 0; i < listaUsers.length; i++){
        if (novoUsuario === listaUsers[i].name){
            novoUsuario = prompt("Usuário já online, escolha outro nome");
        } else {
            console.log("Nome não repetido")
            renderizarUsuarios();
        }
    }
}
function renderizarUsuarios(res){
    usuariosOnline.push(res);
    const users = res;
    const listaUsuariosOnline = document.querySelector(".usuariosOnline");
    for(let i = 0; i < listaUsers.length; i++){
        const usuario = `<li class="linhaSidebar"><ion-icon class="iconeS" name="person-circle"></ion-icon><p>${listaUsers[i].name}</p></li>`
        listaUsuariosOnline.innerHTML += usuario;
        listaUsuariosOnline.scrollIntoView();
    }
}
function mostraErro(err){
    if(err.response.status === 400){
        novoUsuario = prompt("Usuário já online, escolha outro nome");
        pegarUsuarios();
    }
}
cadastroUsuariosOn();
pegarUsuarios();
buscarMensagens();
setInterval(buscarMensagens, 5000);