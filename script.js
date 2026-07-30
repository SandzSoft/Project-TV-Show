//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const episodeCards = episodeList.map(createEpisodeCard);

  rootElem.append(...episodeCards);
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
