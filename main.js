// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileNav.classList.toggle("open");
  document.body.style.overflow = mobileNav.classList.contains("open")
    ? "hidden"
    : "";
});

// Close mobile nav when a link is clicked
mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileNav.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ===== TYPEWRITER =====
const roles = ["Web Developer"];
let ri = 0,
  ci = 0,
  del = false;
const el = document.getElementById("typed");

function type() {
  const w = roles[ri];
  el.textContent = del ? w.slice(0, ci - 1) : w.slice(0, ci + 1);
  del ? ci-- : ci++;
  if (!del && ci === w.length) {
    del = true;
    setTimeout(type, 1600);
    return;
  }
  if (del && ci === 0) {
    del = false;
    ri = (ri + 1) % roles.length;
  }
  setTimeout(type, del ? 55 : 95);
}
setTimeout(type, 800);

// ===== SCROLL REVEAL =====
const obs = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((e) => obs.observe(e));

// ===== SKILL BARS =====
const sObs = new IntersectionObserver(
  (es) => {
    es.forEach((e) => {
      if (e.isIntersecting)
        e.target
          .querySelectorAll("[data-w]")
          .forEach((b) => (b.style.width = b.dataset.w + "%"));
    });
  },
  { threshold: 0.2 },
);
document.querySelectorAll("#services,#about").forEach((s) => sObs.observe(s));

// ===== NAV ACTIVE LINK =====
const secs = document.querySelectorAll("section[id]");
function updateActiveNav() {
  let cur = "";
  secs.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 90) cur = s.id;
  });
  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + cur);
  });
}
window.addEventListener("scroll", updateActiveNav);

// ===== FORM: Kirim pesan langsung ke WhatsApp =====
function handleWhatsApp(e) {
  e.preventDefault();

  const firstName = document.getElementById("first_name").value.trim();
  const lastName = document.getElementById("last_name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const notice = document.getElementById("form-notice");

  // Validasi dasar
  if (!firstName || !email || !message) {
    notice.textContent = "Nama, email, dan pesan wajib diisi.";
    notice.className = "form-notice error";
    return;
  }

  // Susun teks WhatsApp
  let text = `Halo! Ada pesan baru dari website kamu 👋\n\n`;
  text += `👤 *Nama*: ${firstName} ${lastName}\n`;
  text += `📧 *Email*: ${email}\n`;
  if (subject) text += `📌 *Subject*: ${subject}\n`;
  text += `💬 *Pesan*:\n${message}`;

  const waNumber = "62895353319600";
  const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

  // Tampilkan notifikasi sukses
  notice.textContent = "✓ Membuka WhatsApp...";
  notice.className = "form-notice success";

  // Buka WhatsApp di tab baru
  window.open(waURL, "_blank");

  // Reset form setelah 2 detik
  setTimeout(() => {
    document.getElementById("contact-form").reset();
    notice.textContent = "";
    notice.className = "form-notice";
  }, 2000);
}
