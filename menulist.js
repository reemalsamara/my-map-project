let lightboxTittle = "Available prperties for sale";
let imgFiles = ["richmond hill.jpeg", "toronto.jpeg",
  "mississauge.jpeg", "brampton.jpeg",
  "oakville.jpeg", "hepburn.jpeg", "longmoor.jpeg",
  "Kitchener.jpeg", "Burlington.jpeg", "Hamilton.jpeg"
];

let imgCaptions = [
  "$1,449,000 /43 Addison St /Richmond Hill, Ontario",
  "$2,749,000 /89 Parkside Dr /Toronto, Ontario",
  "$1,349,000 /2155 Windsor Way /Mississaugue, Ontario",
  "$1,049,000 /223 Morningmist St /Brampton, Ontario",
  "$2,049,000 /1401 Gulledge Trail /Oakville, Ontario",
  "$1,049,000 /684 Hepburn Road /Milton, Ontario",
  "$1,200,000 /4514 Longmoor road /Mississaugue, Ontario",
  "$949,000 /238 BRIARMEADOW DRIVE /Kitchener, Ontario N2A4C4",
  "$2,399,000 /4069 LAKESHORE ROAD /Burlington (Shoreacres), Ontario L7L1A2",
  "$1,100,000 /107 Hazelton Avenue /Hamilton - Sheldon"
];

let imgCount = imgFiles.length;
const favoritesList = document.getElementById("favoritesList");
const favoriteMessage = document.getElementById("favoriteMessage");

window.addEventListener("load", () => {
  createLightbox();
  loadFavoritesFromCookie();
});

function createLightbox() {
  let lightbox = document.getElementById("lightbox");

  let lbTitle = document.createElement("h1");
  lbTitle.id = "lbTitle";
  lbTitle.textContent = lightboxTittle;
  lightbox.appendChild(lbTitle);

  let lbCounter = document.createElement("div");
  lbCounter.id = "lbCounter";
  let currentImg = 1;
  lbCounter.textContent = currentImg + " / " + imgCount;
  lightbox.appendChild(lbCounter);

  let lbPrev = document.createElement("div");
  lbPrev.id = "lbPrev";
  lbPrev.innerHTML = "&#9664;";
  lbPrev.onclick = showPrev;
  lightbox.appendChild(lbPrev);

  let lbNext = document.createElement("div");
  lbNext.id = "lbNext";
  lbNext.innerHTML = "&#9654;";
  lbNext.onclick = showNext;
  lightbox.appendChild(lbNext);

  let lbPlay = document.createElement("div");
  lbPlay.id = "lbPlay";
  lbPlay.innerHTML = "&#9199;";
  let timeID;
  lbPlay.onclick = function () {
    if (timeID) {
      clearInterval(timeID);
      timeID = undefined;
    } else {
      showNext();
      timeID = setInterval(showNext, 1500);
    }
  };
  lightbox.appendChild(lbPlay);

  let lbImages = document.createElement("div");
  lbImages.id = "lbImages";
  lightbox.appendChild(lbImages);

  for (let i = 0; i < imgCount; i++) {
    let image = document.createElement("img");
    image.src = imgFiles[i];
    image.alt = imgCaptions[i];
    image.onclick = createOverlay;
    lbImages.appendChild(image);
  }

  function showNext() {
    lbImages.appendChild(lbImages.firstElementChild);
    currentImg = (currentImg < imgCount) ? currentImg + 1 : 1;
    lbCounter.textContent = currentImg + " / " + imgCount;
  }

  function showPrev() {
    lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
    currentImg = (currentImg > 1) ? currentImg - 1 : imgCount;
    lbCounter.textContent = currentImg + " / " + imgCount;
  }

  function createOverlay() {
    let overlay = document.createElement("div");
    overlay.id = "lbOverlay";

    let figureBox = document.createElement("figure");
    overlay.appendChild(figureBox);

    let overlayImage = this.cloneNode(true);
    figureBox.appendChild(overlayImage);

    let overlayCaption = document.createElement("figcaption");
    overlayCaption.textContent = this.alt;
    figureBox.appendChild(overlayCaption);

    let favButton = document.createElement("button");
    favButton.textContent = "Add to Favorites";
    favButton.className = "fav-button";
    favButton.onclick = () => {
      if (favoritesList.children.length >= 5) {
        favoriteMessage.textContent = "Maximum 5 favorites allowed. Remove one to add more.";
        return;
      }
      addToFavorites(this.src, this.alt);
      document.body.removeChild(overlay);
    };
    figureBox.appendChild(favButton);

    let closeBox = document.createElement("div");
    closeBox.id = "lbOverlayclose";
    closeBox.innerHTML = "&times;";
    closeBox.onclick = function () {
      document.body.removeChild(overlay);
    };
    overlay.appendChild(closeBox);

    document.body.appendChild(overlay);
  }
}

function addToFavorites(src, alt) {
  favoriteMessage.textContent = "";

  let container = document.createElement("div");
  container.className = "favorite-item";

  let img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.className = "favorite-img";

  img.onclick = () => {
    if (!container.querySelector("button")) {
      let removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.className = "remove-button";
      removeButton.onclick = () => {
        favoritesList.removeChild(container);
        removeFromCookie(src);
        updateFavoriteMessage();
        favoriteMessage.textContent = "";
      };
      container.appendChild(removeButton);
    }
  };

  container.appendChild(img);
  favoritesList.appendChild(container);
  updateFavoriteMessage();

  saveToCookie(src, alt);
}

function updateFavoriteMessage() {
  let count = favoritesList.children.length;
  const titleElement = document.getElementById("favoriteTitle");
  titleElement.textContent = `Your Favorite Properties (${count} of 5)`;
}


function saveToCookie(src, alt) {
  let cookieData = readCookie();
  let favArray = cookieData.favorites ? JSON.parse(cookieData.favorites) : [];

  if (!favArray.find(item => item.src === src)) {
    favArray.push({ src, alt });
    document.cookie = "favorites=" + encodeURIComponent(JSON.stringify(favArray)) + "; path=/; max-age=" + (60 * 60 * 24 * 30);
  }
}


function removeFromCookie(srcToRemove) {
  let cookieData = readCookie();
  if (cookieData.favorites) {
    let favArray = JSON.parse(cookieData.favorites);
    favArray = favArray.filter(item => item.src !== srcToRemove);
    document.cookie = "favorites=" + encodeURIComponent(JSON.stringify(favArray)) + "; path=/; max-age=" + (60 * 60 * 24 * 30);
  }
}


function loadFavoritesFromCookie() {
  const cookieData = readCookie();
  if (cookieData.favorites) {
    try {
      const favArray = JSON.parse(cookieData.favorites);
      favArray.forEach(item => {
        addToFavorites(item.src, item.alt);
      });
    } catch (e) {
      console.error("Error parsing favorites cookie:", e);
    }
  }
}

function readCookie() {
  let fields = {};
  if (document.cookie) {
    let cookieList = document.cookie.split(";");
    for (let item of cookieList) {
      let [name, value] = item.split("=");
      name = name.trim();
      fields[name] = decodeURIComponent(value);
    }
  }
  return fields;
}
