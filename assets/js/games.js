if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./e/sw.js", { scope: __uv$config.prefix });
    });
}

const imageContainer = document.getElementById('image-container');

fetch('./assets/json/g.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(image => {
            const imageElement = document.createElement('a');
            imageElement.href = image.src;

            const imgContainer = document.createElement('div');
            imgContainer.className = "image-container";

            const img = document.createElement('img');
            img.src = image.logo;
            img.alt = image.title || 'ERROR';
            img.style.width = "150px";
            img.style.height = "150px";
            img.className = "classy";

            imageElement.addEventListener("click", (event) => {
                event.preventDefault();
                if (!image.alert) {
                    const url = image.link || image.src;
                    localStorage.setItem("Iframe", __uv$config.prefix + __uv$config.encodeUrl(url));
                    window.location.href = image.link ? "go.html" : url;
                } else {
                    alert(image.alert);
                }
            });

            imgContainer.appendChild(img);
            imageElement.appendChild(imgContainer);
            imageContainer.appendChild(imageElement);
        });

        updateGridLayout();
    })
    .catch(error => console.error('Error fetching JSON data:', error));

const searchBox = document.getElementById("search-box");

searchBox.addEventListener("keyup", function() {
    const searchTerm = this.value.toLowerCase();
    const images = imageContainer.querySelectorAll("img");

    images.forEach(image => {
        const parentLink = image.parentElement.parentElement;
        parentLink.style.display = image.alt.toLowerCase().includes(searchTerm) ? "block" : "none";
    });

    updateGridLayout();
});

function updateGridLayout() {
    const containerWidth = imageContainer.clientWidth;
    const imageWidth = 150;
    imageContainer.style.gridTemplateColumns = `repeat(auto-fill, minmax(${imageWidth}px, 1fr))`;
}
