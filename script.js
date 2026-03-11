function buscar(){

let usuario = document.getElementById("username").value

fetch(`https://api.github.com/users/${usuario}`)
.then(resposta => resposta.json())
.then(dados => {

document.getElementById("resultado").innerHTML = `

<img src="${dados.avatar_url}" width="120">

<h2>${dados.name}</h2>

<p>${dados.bio || ""}</p>

<a href="${dados.html_url}" target="_blank">Ver perfil no GitHub</a>

<h3>Repositórios</h3>

<div id="repos"></div>

`

buscarRepos(usuario)

})

}

function buscarRepos(usuario){

fetch(`https://api.github.com/users/${usuario}/repos`)
.then(res => res.json())
.then(repos => {

let reposHTML = ""

repos.slice(0,5).forEach(repo => {

reposHTML += `

<div class="repo-card">
<a href="${repo.html_url}" target="_blank">
${repo.name}
</a>
</div>

`

})

document.getElementById("repos").innerHTML = reposHTML

})

}