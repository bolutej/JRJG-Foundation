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

document.getElementById("form").addEventListener("submit", sendMessage);