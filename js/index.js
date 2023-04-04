
const gitForm = document.querySelector("#github-form");
// add event listener to form submit
document.addEventListener("DOMContentLoaded", () => {
   gitForm.addEventListener("submit", searchGitHubUser);
});

  // make API request to search for users
const searchGitHubUser = (e) => {
   e.preventDefault();
   const username = document.querySelector('#search').value;
   fetch(`https://api.github.com/search/users?q=${username}`)
   .then(resp => resp.json())
   .then(users => { renderUserDetails(users.items) })
   .catch(error => { alert("error!") })
   
}
// display search results

const renderUserDetails = users => {
   users.forEach(user => { createGitUserCardElement(user) })
}

const createGitUserCardElement = user => {
   const gitUserCard = document.createElement("div");
   gitUserCard.className = "user-card";
   document.querySelector("#user-list").appendChild(gitUserCard);
   gitUserCard.innerHTML = `<img src="${user.avatar_url}" >`
                           + `<h2>${user.login}</h2>`
                           + `<a class="fs11" href="${user.html_url}" target="_blank">Go to Github Profile</a><br>`
                           + `<button class="submit-btn fs11">View ${user.login}'s Repos</button>`
   gitUserCard.querySelector(".submit-btn").addEventListener('click', () => {
      fetchRepositories(user)
   })
}

const fetchRepositories = username => {
   fetch(`https://api.github.com/users/${username.login}/repos`)
   .then(resp => resp.json())
   .then(repos => { renderRepositoryDetails(repos) })
   .catch(error => { alert("error!") });
}
const renderRepositoryDetails = repos => {
   repos.forEach(repo => createReposCardElement(repo) )
}


const createReposCardElement = repo => {
   const repositoryCard = document.createElement("div");
   repositoryCard.className = "repo-card"
   document.querySelector("#repos-list").appendChild(repositoryCard);
   repositoryCard.innerHTML = `<h2 class="margin-none">${repo.name}</h2>`
   + `<a class="fs11" href="${repo.html_url}" target="_blank">Go to Github Profile</a><br>`
}