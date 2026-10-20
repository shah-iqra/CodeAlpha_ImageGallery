// 1. Elements
const items = Array.from(document.querySelectorAll(".gallery-item"));
const filterBtns = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const counter = document.getElementById("counter");

// 2. State
let visible = [...items];
let current = 0;

// 3. Filter
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.filter;
    items.forEach((item) => {
      const show = category === "all" || item.dataset.category === category;
      item.classList.toggle("hidden", !show);
    });

    visible = items.filter((item) => !item.classList.contains("hidden"));
  });
});

// 4. Lightbox
function showImage() {
  const img = visible[current].querySelector("img");
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  counter.textContent = `${current + 1} / ${visible.length}`;
}

function openLightbox(index) {
  current = index;
  showImage();
  lightbox.classList.add("open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
}

function nextImage() {
  current = (current + 1) % visible.length;
  showImage();
}

function prevImage() {
  current = (current - 1 + visible.length) % visible.length;
  showImage();
}

// 5. Event listeners
items.forEach((item) => {
  item.addEventListener("click", () => {
    openLightbox(visible.indexOf(item));
  });
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Dark background-এ ক্লিক করলে বন্ধ হবে
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
});