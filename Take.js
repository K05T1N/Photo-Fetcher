document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://picsum.photos/367/300";
  const gallery = document.getElementById("gallery");
  const fetchButton = document.getElementById("refetch");
  const greyscaleToggle = document.getElementById("graytoggle");
  const addMoreButton = document.getElementById("morephotos");

  function fetchAndAppendImages(container, count) {
    for (let i = 0; i < count; i++) {
      fetch(baseURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.url;
        })
        .then((imageUrl) => {
          const photoItem = document.createElement("div");
          photoItem.classList.add("photo");

          const imageElement = document.createElement("img");
          imageElement.src = imageUrl;

          const overlay = document.createElement("div");
          overlay.classList.add("overlay");

          const line1 = document.createElement("div");
          line1.innerText = "Lucas Budimaier";

          const line2 = document.createElement("div");
          line2.innerText = "https://unsplash.com/photos/pwaaqfoMibl";
          line2.classList.add("small-text"); 

          overlay.appendChild(line1);
          overlay.appendChild(line2);

          photoItem.appendChild(imageElement);
          photoItem.appendChild(overlay);
          container.appendChild(photoItem);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }
  }

  fetchAndAppendImages(gallery, 4); //initial fetch

  fetchButton.addEventListener("click", function () {
    gallery.innerHTML = ""; //remove current images
    fetchAndAppendImages(gallery, 4);
  });

  greyscaleToggle.addEventListener("change", function () {
    gallery.classList.toggle("greyscale", greyscaleToggle.checked);
  });

  addMoreButton.addEventListener("click", function () {
    fetchAndAppendImages(gallery, 4);
  });

  function toggleAddMoreButtonVisibility() {
    const lastImage = document.querySelector(".photo-item:last-child");
    const lastImageBottom = lastImage.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    if (lastImageBottom <= windowHeight) {
      addMoreButton.style.display = "block";
    } else {
      addMoreButton.style.display = "none";
    }
  }

  window.addEventListener("scroll", toggleAddMoreButtonVisibility);
  toggleAddMoreButtonVisibility();
});