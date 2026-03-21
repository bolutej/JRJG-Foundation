const menuToggle = document.querySelector(".menu-toggle");
const sides = document.querySelector(".sides");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  sides.classList.toggle("open");
});

// Close menu when a link is clicked
document.querySelectorAll(".sides a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    sides.classList.remove("open");
  });
});

// const images = document.querySelectorAll(".slides-track img");

// images.forEach(img => {
//     const max = 10;
//     const deg = (Math.random() * max * 2) - max;
//     img.style.transform = `rotate(${deg}deg)`;
// })