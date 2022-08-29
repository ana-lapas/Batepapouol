let usuariosOnline = [];
const novoUsuario = prompt("Olá, qual seu nome?");

console.log(usuariosOnline);
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
    console.log(visibilidadeSelecionada)
}
function cadastroUsuariosOn() {
    const cadastroUsuario = {
        name: novoUsuario
    };
    console.log("vai vir o cadastro usuario");
    console.log(cadastroUsuario);
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", cadastroUsuario);    
    promessa.then(entreiNaSala);//se der certo
    promessa.catch(mostraErro);//se der errado
}
/*function entreiNaSala(){
    const mensagemFormato = {from: novoUsuario,
        to: "Todos",
        text: "entra na sala...",
        type: "status"
    }
    console.log("vai vir o entrei na sala");
    console.log(mensagemFormato);
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",mensagemFormato);
    promessa.then(buscarMensagens);
    promessa.catch(mostraErro);
}*/
function enviarMensagens(){
    const mensagemDigitada = document.querySelector("input").value;
    console.log("aq vai a msg digitada")
    console.log(mensagemDigitada)
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
    console.log("Pegando as mensagens")
    const dadosMensagens = resposta.data;
    console.log(dadosMensagens);
    const inserirMensagens = document.querySelector(".espacoMensagens");
    console.log(inserirMensagens);
    for(let i =0; i <dadosMensagens.length; i++){
        console.log(dadosMensagens[i])
        if((dadosMensagens[i].text === "entra na sala...") || (dadosMensagens[i].text === "sai da sala...") ){
            let msg = `<div class="p3">(${dadosMensagens[i].time})</div> <div class="p1"> ${dadosMensagens[i].from} </div> para <div class="p1"> Todos</div>: ${dadosMensagens[i].text}`;
            console.log(msg);
            inserirMensagens.innerHTML += `<li class="status">${msg}</li>`;}
         else {
            let msg = `<div class="p3">(${dadosMensagens[i].time})</div> <div class="p1"> ${dadosMensagens[i].from} </div> para <div class="p1"> Todos</div>: ${dadosMensagens[i].text}`;
            console.log(msg);
            inserirMensagens.innerHTML += `<li class="normal">${msg}</li>`;
        }
    }

}
function pegarUsuarios(){
    console.log("Pegando usuarios");
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    console.log(promessa);
    promessa.then(renderizarUsuarios);//se der certo
    promessa.catch(mostraErro);//se der errado
}
function renderizarUsuarios(res){
    console.log("Deu certo");
    usuariosOnline.push(res.data);
    const users = res.data;
    console.log("vai vir os usuarios")
    console.log(users);
    const listaUsuariosOnline = document.querySelector(".usuariosOnline");
    console.log(listaUsuariosOnline);
    for(let i = 0; i < usuariosOnline.length; i++){
        listaUsuariosOnline.innerHTML += `<li class="linhaSidebar"><ion-icon class="iconeS" name="person-circle"></ion-icon><p>${users[i].name}</p></li>`
    }
}
function mostraErro(err){
    console.log("não deu certo");
    if(err.response.status === 400){
        alert("Usuário já online, escolha outro nome");
        console.log(err.response);
    }
}
cadastroUsuariosOn();
buscarMensagens();
setInterval(buscarMensagens, 5000);