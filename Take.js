document.addEventListener("DOMContentLoaded", function () {
  const baseURL = "https://picsum.photos/367/300";
  const gallery = document.getElementById("gallery");
  const fetchButton = document.getElementById("refetch");
  const greyscaleToggle = document.getElementById("graytoggle");
  const addMoreButton = document.getElementById("morephotos");
  let tracer = 0;

  function fetchAndAppendImages(container, count) {
    for (let i = 0; i < count; i++) {
      fetch(baseURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
          }
          return response;
        })
        .then((data) => {

          const photoItem = document.createElement("span");
          photoItem.classList.add("photo");

          const imageElement = document.createElement("img");
          imageElement.src = data.url;
          let newURL = `https://picsum.photos/id/${data.headers.get("picsum-id")}/info`;

          fetch(newURL)
          .then(response => response.text()) 
          .then((dataStr) => {
            
            let response = JSON.parse(dataStr);
            console.log(response)
            const overlay = document.createElement("span");
            overlay.classList.add("overlay");
  
            const line1 = document.createElement("div");
            line1.innerText = response.author;
            line1.classList.add("big-text");
  
            const line2 = document.createElement("div"); 
            line2.innerText = response.url;
            line2.classList.add("small-text"); 
  
            overlay.appendChild(line1);
            overlay.appendChild(line2);
  
            photoItem.appendChild(imageElement);
            photoItem.appendChild(overlay);
            container.appendChild(photoItem);
            tracer += 1;
          })
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }
  }

  fetchAndAppendImages(gallery, 4); 

  fetchButton.addEventListener("click", function (temp = 0) {
    temp = tracer;
    gallery.innerHTML = ""; 
    fetchAndAppendImages(gallery, tracer);
    tracer -= temp;
  });

  greyscaleToggle.addEventListener("change", function () {
    gallery.classList.toggle("greyscale", greyscaleToggle.checked);
  });

  addMoreButton.addEventListener("click", function () {
    fetchAndAppendImages(gallery, 4);
  });
});