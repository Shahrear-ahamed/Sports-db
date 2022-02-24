window.onload = () => {
  loadMainData();
};
const loadMainData = () => {
  fetch("https://www.thesportsdb.com/api/v1/json/2/all_sports.php")
    .then((response) => response.json())
    .then((data) => loadSports(data.sports.slice(0, 9)));
};
const playerNameSearch = (pName) => {
  fetch(
    `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${pName}`
  )
    .then((response) => response.json())
    .then((data) => loadPlayer(data.player));
};
const loadSports = (sports) => {
  const addContainer = document.getElementById("section");
  sports.forEach((sport) => {
    const div = document.createElement("div");
    div.classList.add("col-4");
    div.innerHTML = `
        <img
            class="w-100"
            src="${sport.strSportThumb}"
            alt=""
          />
          <h3>${sport.strSport}</h3>
          <p>${sport.strSportDescription.slice(0, 150)} ....</p>
        </div>`;
    addContainer.appendChild(div);
  });
};
const loadPlayer = (players) => {
  console.log(players);
  const mainContainer = document.getElementById("main-container");
  mainContainer.innerHTML = "";
  const playerContainer = document.getElementById("player-container");
  const player = players[0];
  const result = document.getElementById("player-name");
  result.innerText = `Your result is: ${player.strPlayer}`;
  const div = document.createElement("div");
  div.classList.add("mt-4");
  div.innerHTML = `
    <div class="container mx-auto row">
            <div class="col-5">
                <img class="w-100" src="${player.strRender}" alt="">
            </div>
            <div class="col-7">
                <h6>Name: ${player.strPlayer}</h6>
                <h6>Team: ${player.strTeam2}</h6>
                <h6>Date of Birth: ${player.dateBorn}</h6>
                <h6>Location: ${player.strBirthLocation}</h6>
                <h6>Height: ${player.strHeight}</h6>
                <h6>Weight: ${player.strWeight}</h6>
                <h6>Net Worth: ${player.strWage}</h6>
                <p>${player.strDescriptionEN.slice(0, 400)}</p>
            </div>
        </div>
    `;
  playerContainer.appendChild(div);
};
const searchBtn = document.getElementById("search-btn");
const serchPlayerInput = document.getElementById("search-player");
searchBtn.addEventListener("click", () => {
  const searchPlayer = serchPlayerInput.value;
  playerNameSearch(searchPlayer);
  serchPlayerInput.value = "";
});
