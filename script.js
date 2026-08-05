//You can edit ALL of the code here
const state = {
  episodes: [],
  searchTerm: "",
  selectedEpisodeId: "",
};

function setup() {
  state.episodes = getAllEpisodes();
  setupSearch();
  setupSelector();
  render();
}
function setupSearch() {
  const input = document.getElementById("episode-search");

  input.addEventListener("input", function () {
    state.searchTerm = input.value.toLowerCase();
    state.selectedEpisodeId = "";
    render();
  });
}

function setupSelector() {
  const selector = document.getElementById("episode-selector");
  state.episodes.forEach((ep) => {
    const option = document.createElement("option");
    option.value = ep.id;
    option.textContent = `S${String(ep.season).padStart(2, "0")}E${String(
      ep.number,
    ).padStart(2, "0")} - ${ep.name}`;
    selector.appendChild(option);
  });

  selector.addEventListener("change", () => {
    state.selectedEpisodeId = selector.value;
    state.searchTerm = "";
    render();
  });
}
function render() {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  let episodesToShow = state.episodes;

  if (state.selectedEpisodeId) {
    episodesToShow = episodesToShow.filter(
      (ep) => ep.id == state.selectedEpisodeId,
    );
  } else {
    episodesToShow = episodesToShow.filter((episode) => {
      const nameMatch = episode.name.toLowerCase().includes(state.searchTerm);
      const summaryMatch = episode.summary
        .toLowerCase()
        .includes(state.searchTerm);
      return nameMatch || summaryMatch;
    });
  }

  const episodeCards = episodesToShow.map(createEpisodeCard);
  rootElem.append(...episodeCards);

  updateEpisodeCount(episodesToShow.length);
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
