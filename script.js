//You can edit ALL of the code here
const state = {
  episodes: [],
  searchTerm: "",
  selectedEpisode: null,
};

const elements = {};

function setup() {
  elements.searchInput = document.getElementById("episode-search");
  elements.episodeSelect = document.getElementById("episode-selector");
  elements.episodeCount = document.getElementById("episode-count");
  elements.root = document.getElementById("root");
  state.episodes = getAllEpisodes();
  createEpisodeOptions(state.episodes);
  setupSearch();
  setupSelector();
  render();
}

function createEpisodeOptions(episodes) {
  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "All Episodes";
  elements.episodeSelect.appendChild(allOption);

  episodes.forEach((episode) => {
    const option = document.createElement("option");

    option.value = episode.id;
    option.textContent = `${formatEpisodeCode(
      episode.season,
      episode.number,
    )} - ${episode.name}`;

    elements.episodeSelect.appendChild(option);
  });
}

function setupSearch() {
  elements.searchInput.addEventListener("input", (event) => {
    state.searchTerm = elements.searchInput.value.toLowerCase();
    state.selectedEpisode = null;
    elements.episodeSelect.value = "";
    render();
  });
}

function setupSelector() {
  elements.episodeSelect.addEventListener("change", (event) => {
    state.selectedEpisode =
      event.target.value === "" ? null : Number(event.target.value);
    state.searchTerm = "";
    elements.searchInput.value = "";
    render();
  });
}

function getDisplayedEpisodes() {
  const displayedEpisodes =
    state.selectedEpisode !== null
      ? [state.episodes.find((e) => e.id === state.selectedEpisode)]
      : state.episodes.filter(
          (episode) =>
            episode.name.toLowerCase().includes(state.searchTerm) ||
            episode.summary?.toLowerCase().includes(state.searchTerm),
        );
  return displayedEpisodes;
}

function render() {
  const displayedEpisodes = getDisplayedEpisodes();
  elements.episodeCount.textContent = `Displaying ${displayedEpisodes.length} / ${state.episodes.length} episodes`;
  const cards = displayedEpisodes.map(createEpisodeCard);
  elements.root.replaceChildren(...cards);
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
  title.textContent = name + ` - S${formatEpisodeCode(season, number)}`;

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

function formatEpisodeCode(season, number) {
  const seasonCode = String(season).padStart(2, "0");
  const episodeCode = String(number).padStart(2, "0");
  return `S${seasonCode}E${episodeCode}`;
}

window.onload = setup;
