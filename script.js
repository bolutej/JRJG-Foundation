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
function showToast(message, type ="success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}
async function sendMessage(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
try {
  const res = await fetch(
    "https://byqopxrcjrqdofhlwkma.supabase.co/functions/v1/send-contact-email",
    {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ name, email, message}),
    }
  );

  const data = await res.json();

  if (data.success) {
    showToast("✅ Message sent successfully!", "success");
    e.target.reset();
  } else {
    showToast("❌ Something went wrong. Try again.", "error");
  }
 } catch (err) {
    showToast("❌ Network error. Try again.", "error");
  }
}
const WORDS = [
  'Compassion.',
  'Charity.',
  'Empathy.',
  'Solicitiude.',
];

const TYPE_SPEED   = 80;    // ms per character
const DELETE_SPEED = 45;    // ms per character (faster = snappier)
const PAUSE_AFTER  = 1800;  // ms after word is fully typed
const PAUSE_BEFORE = 300;   // ms before next word starts

const el = document.getElementById('tw');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function tick() {
  const word = WORDS[wordIndex];

  if (!isDeleting) {
    charIndex++;
    el.textContent = word.slice(0, charIndex);

    if (charIndex === word.length) {
      isDeleting = true;
      setTimeout(tick, PAUSE_AFTER);
      return;
    }
    setTimeout(tick, TYPE_SPEED);

  } else {
    charIndex--;
    el.textContent = word.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % WORDS.length;
      setTimeout(tick, PAUSE_BEFORE);
      return;
    }
    setTimeout(tick, DELETE_SPEED);
  }
}

setTimeout(tick, 900); // slight delay so page paints first
document.getElementById("form").addEventListener("submit", sendMessage);