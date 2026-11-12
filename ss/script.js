const galleryItems = {
	icons: Array.from({ length: 29 }, (_, index) => ({
		file: `images/icons/icono-${String(index + 2).padStart(2, "0")}.svg`,
		alt: `Icono de ave ${index + 1}`,
		ratio: "1"
	})),
	"sparro-photo": Array.from({ length: 5 }, (_, index) => ({
		file: `images/stickers/sparro/calcomania-fotografica-${String(index + 1).padStart(2, "0")}.png`,
		alt: `Calcomanía fotográfica de SPARRO ${index + 1}`,
		ratio: "8 / 11"
	})),
	"sparro-silhouette": Array.from({ length: 4 }, (_, index) => ({
		file: `images/stickers/sparro/calcomania-silueta-${String(index + 1).padStart(2, "0")}.png`,
		alt: `Calcomanía de silueta de SPARRO ${index + 1}`,
		ratio: "8 / 11"
	})),
	posters: [
		{ file: "images/posters/cartel-gorrion-serrano-01.png", alt: "Cartel 01 del gorrión serrano", ratio: "5291 / 4535" },
		{ file: "images/posters/cartel-gorrion-serrano-02.png", alt: "Cartel 02 del gorrión serrano", ratio: "3024 / 6803" },
		{ file: "images/posters/cartel-gorrion-serrano-03.png", alt: "Cartel 03 del gorrión serrano", ratio: "2268 / 6047" },
		{ file: "images/posters/cartel-gorrion-serrano-04.png", alt: "Cartel 04 del gorrión serrano", ratio: "6047 / 2268" }
	],
	templates: Array.from({ length: 22 }, (_, index) => ({
		file: `images/templates/plantilla-${String(index + 1).padStart(2, "0")}.png`,
		alt: `Plantilla para investigadores ${index + 1}`,
		ratio: "4 / 5"
	})),
	"faculty-stickers": Array.from({ length: 6 }, (_, index) => ({
		file: `images/stickers/faculty/calcomania-ave-${String(index + 1).padStart(2, "0")}.png`,
		alt: `Calcomanía de identificación de ave ${index + 1}`,
		ratio: null
	}))
};

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const closeButton = lightbox.querySelector(".lightbox-close");
const previousButton = lightbox.querySelector(".lightbox-previous");
const nextButton = lightbox.querySelector(".lightbox-next");
let lastFocusedElement;
let currentGallery;
let currentArtwork;

function showPlaceholder(container, ratio) {
	const placeholder = document.createElement("span");
	placeholder.className = "artwork-placeholder";
	if (ratio) placeholder.style.setProperty("--placeholder-ratio", ratio);
	placeholder.textContent = "Imagen pendiente";
	container.disabled = true;
	container.removeAttribute("aria-label");
	container.replaceChildren(placeholder);
}

function addArtwork(container, item) {
	const button = document.createElement("button");
	button.className = "artwork-item";
	button.type = "button";
	button.setAttribute("aria-label", `Ampliar: ${item.alt}`);

	const image = document.createElement("img");
	image.src = item.file;
	image.alt = item.alt;
	image.loading = "lazy";
	image.decoding = "async";
	image.addEventListener("error", () => showPlaceholder(button, item.ratio), { once: true });
	image.addEventListener("load", () => button.classList.add("has-image"), { once: true });

	button.append(image);
	container.append(button);
}

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
	galleryItems[gallery.dataset.gallery].forEach((item) => addArtwork(gallery, item));
});

document.addEventListener("click", (event) => {
	const button = event.target.closest(".artwork-item.has-image");
	if (!button) return;

	currentGallery = button.parentElement;
	lastFocusedElement = button;
	showArtwork(button);
	lightbox.showModal();
	closeButton.focus();
});

function showArtwork(button) {
	const image = button.querySelector("img");
	currentArtwork = button;
	lightboxImage.src = image.currentSrc || image.src;
	lightboxImage.alt = image.alt;
}

function moveGallery(direction) {
	if (!currentGallery || !currentArtwork) return;
	const artworks = Array.from(currentGallery.querySelectorAll(".artwork-item:not(:disabled)"));
	if (artworks.length < 2) return;
	const currentIndex = artworks.indexOf(currentArtwork);
	const nextIndex = (currentIndex + direction + artworks.length) % artworks.length;
	showArtwork(artworks[nextIndex]);
}

previousButton.addEventListener("click", () => moveGallery(-1));
nextButton.addEventListener("click", () => moveGallery(1));
closeButton.addEventListener("click", () => lightbox.close());

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && lightbox.open) {
		event.preventDefault();
		lightbox.close();
	} else if (lightbox.open && event.key === "ArrowLeft") {
		event.preventDefault();
		moveGallery(-1);
	} else if (lightbox.open && event.key === "ArrowRight") {
		event.preventDefault();
		moveGallery(1);
	}
});

let touchStartX;

lightbox.addEventListener("touchstart", (event) => {
	touchStartX = event.touches[0].clientX;
}, { passive: true });

lightbox.addEventListener("touchend", (event) => {
	if (touchStartX === undefined) return;
	const distance = event.changedTouches[0].clientX - touchStartX;
	touchStartX = undefined;
	if (Math.abs(distance) > 48) moveGallery(distance < 0 ? 1 : -1);
}, { passive: true });

lightbox.addEventListener("click", (event) => {
	if (event.target === lightbox) lightbox.close();
});

lightbox.addEventListener("close", () => {
	lightboxImage.removeAttribute("src");
	currentGallery = null;
	currentArtwork = null;
	lastFocusedElement?.focus();
});
