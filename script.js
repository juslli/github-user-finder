const input = document.getElementById("username");
const button = document.getElementById("searchBtn");
const statusText = document.getElementById("status");
const result = document.getElementById("result");

const avatar = document.getElementById("avatar");
const nameEl = document.getElementById("name");
const loginEl = document.getElementById("login");
const bioEl = document.getElementById("bio");
const reposEl = document.getElementById("repos");
const followersEl = document.getElementById("followers");
const followingEl = document.getElementById("following");
const profileLink = document.getElementById("profileLink");

function showStatus(message) {
  statusText.textContent = message;
}

function clearStatus() {
  statusText.textContent = "";
}

function hideResult() {
  result.classList.add("hidden");
}

function showResult() {
  result.classList.remove("hidden");
}

async function buscarUsuario() {
  const username = input.value.trim();

  if (username === "") {
    showStatus("Digite um nome de usuário.");
    hideResult();
    return;
  }

  showStatus("Buscando...");
  hideResult();

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("Usuário não encontrado.");
    }

    const data = await response.json();

    avatar.src = data.avatar_url;
    avatar.alt = `Avatar de ${data.login}`;
    nameEl.textContent = data.name || "Sem nome disponível";
    loginEl.textContent = `@${data.login}`;
    bioEl.textContent = data.bio || "Este usuário não possui bio.";
    reposEl.textContent = data.public_repos;
    followersEl.textContent = data.followers;
    followingEl.textContent = data.following;
    profileLink.href = data.html_url;

    clearStatus();
    showResult();
  } catch (error) {
    showStatus("Usuário não encontrado. Tente novamente.");
    hideResult();
  }
}

button.addEventListener("click", buscarUsuario);

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    buscarUsuario();
  }
});
