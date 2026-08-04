//You can edit ALL of the code here
const state = {
  episodes: [],
  searchTerm: "",
};

function setup() {
  state.episodes = getAllEpisodes();

  const selector = document.getElementById("episode-selector");

  state.episodes.forEach((ep) => {
    const option = document.createElement("option");
    option.value = ep.id;
    option.textContent = `S${String(ep.season).padStart(2, "0")}E${String(
      ep.number,
    ).padStart(2, "0")} - ${ep.name}`;
    selector.appendChild(option);
  });

  selector.addEventListener("change", function () {
    const selectedId = selector.value;

    if (!selectedId) {
      state.searchTerm = "";
      render();
      return;
    }

    const selectedEpisode = state.episodes.find((ep) => ep.id == selectedId);

    const rootElem = document.getElementById("root");
    rootElem.innerHTML = "";

    const card = createEpisodeCard(selectedEpisode);
    rootElem.appendChild(card);

    updateEpisodeCount(1);
  });

  const input = document.getElementById("episode-search");
  input.addEventListener("input", function () {
    state.searchTerm = input.value.toLowerCase();
    render();
  });
  render();
}

function render() {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  const filteredEpisodes = state.episodes.filter((episode) => {
    const nameMatch = episode.name.toLowerCase().includes(state.searchTerm);
    const summaryMatch = episode.summary
      .toLowerCase()
      .includes(state.searchTerm);
    return nameMatch || summaryMatch;
  });

  const episodeCards = filteredEpisodes.map(createEpisodeCard);
  rootElem.append(...episodeCards);

  updateEpisodeCount(filteredEpisodes.length);
}

function updateEpisodeCount(count) {
  const countElem = document.getElementById("display-episodes");
  countElem.textContent = `Displaying ${count} episode(s)`;
}

function createEpisodeCard({
  url,
  name,
  season,
  number,
  image: { medium },
  summary,
}) {
  const episodeCard = document.createElement("article");

  const title = document.createElement("h2");
  title.textContent =
    name +
    ` - S${String(season).padStart(2, "0")}E${String(number).padStart(2, "0")}`;

  const img = document.createElement("img");
  img.src = medium;
  img.alt = `${name} episode image`;
  img.width = 210;
  img.height = 118;
  img.loading = "lazy";

  const aElement = document.createElement("a");
  aElement.href = url;
  aElement.textContent = "View on TVMaze";
  aElement.target = "_blank";
  aElement.rel = "noopener noreferrer";

  const summaryElement = document.createElement("div");
  summaryElement.classList.add("summary");
  summaryElement.innerHTML = summary;

  episodeCard.append(title, img, summaryElement, aElement);

  return episodeCard;
}

window.onload = setup;
