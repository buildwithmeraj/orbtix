// initialize typewriter for hero text
new TypeIt("#typewrite", { speed: 50, loop: true })
  .type(
    "We build fast, scalable, and beautiful digital products that help  businesses grow in the modern web.",
  )
  .delete()
  .type(
    "Orbtix delivers cutting-edge web solutions — from pixel-perfect interfaces to robust backend systems — engineered for the future.",
  )
  .delete()
  .type(
    "Smart technology. Clean code. Real results. We turn your ideas into powerful digital experiences.",
  )
  .delete()
  .type(
    "From startups to enterprises, we craft tailored software solutions that solve real problems and drive measurable growth.",
  )
  .go();

// reveal sections/cards on scroll
const revealElements = () => {
  const items = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reducedMotion) {
    items.forEach((item) => item.classList.add("reveal-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.14 },
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 90, 320)}ms`;
    observer.observe(item);
  });
};

// attach the reveal animation to the window load event listener
window.addEventListener("load", revealElements);

// fetch and render services after page has loaded
window.addEventListener("load", async () => {
  try {
    // try to fetch services
    const response = await fetch(
      "https://raw.githubusercontent.com/buildwithmeraj/orbtix/refs/heads/main/data/services.json",
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const services = await response.json();

    // try to render services
    showServices(services);
  } catch (error) {
    console.error("Error loading services:", error);
  }

  // function for rendering services
  function showServices(services) {
    // get the div
    const servicesDiv = document.getElementById("services-list");

    // first empty the div
    servicesDiv.innerHTML = "";

    if (services && services.length > 0) {
      services.forEach((service) => {
        // create the child componet to hold the service
        const card = document.createElement("div");

        // add classes to it
        card.className = "service-card rounded-lg shadow-md bg-base-100 reveal";

        // add data to it
        card.innerHTML = `
          <figure>
            <img
              src="${service.image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}"
              alt="${service.title}"
              class="rounded-t-lg w-full object-cover h-48"
            />
          </figure>
          <div class="p-4">
            <h3 class="card-title text-xl font-semibold mb-2">${service.title}</h3>
            <p class="text-opacity-60 text-sm">
              ${service.description}
            </p>
          </div>
        `;

        // finally append them to the services div
        servicesDiv.appendChild(card);
      });
    } else {
      servicesDiv.innerHTML = "<p>No services found.</p>";
    }

    revealElements();
  }
});

document.getElementById("submit_btn").addEventListener("click", function () {
  // get the dom elemtents
  const result = document.getElementById("result");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const showResult = (text, type) => {
    const icon =
      type === "success"
        ? "fa-circle-check"
        : "fa-circle-exclamation";
    result.innerHTML = `<span class="form-result-message ${type}"><i class="fa-solid ${icon}"></i>${text}</span>`;
  };

  // validate input data and send the result
  if (name.value.length < 3 || name.value.length > 15) {
    showResult("Invalid name", "error");
  } else if (emailRegex.test(email.value) === false) {
    showResult("Invalid email", "error");
  } else if (message.value.length < 20 || message.value.length > 1000) {
    showResult("Invalid message length", "error");
  } else {
    // if no error, then show the success message
    showResult("Message sent successfully", "success");
  }
});

// toggle drawer on hamburger menu click
const hamburgerBtn = document.getElementById("drawer_toggle");
const drawer = document.getElementById("drawer");
const drawerCloseElements = document.querySelectorAll("[data-drawer-hide]");

if (hamburgerBtn) {
  hamburgerBtn.addEventListener("click", () => {
    drawer.classList.toggle("-translate-x-full");
  });
}

// close drawer when close button or link is clicked
if (drawerCloseElements.length > 0) {
  drawerCloseElements.forEach((element) => {
    element.addEventListener("click", () => {
      drawer.classList.add("-translate-x-full");
    });
  });
}

// highlight active section links while scrolling
const sectionIds = ["home", "services", "about", "contact"];
const sectionElements = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinks = Array.from(
  document.querySelectorAll('.site-nav-links a[href^="#"], .drawer-link[href^="#"]'),
);

const setActiveNavLink = () => {
  const scrollY = window.scrollY + window.innerHeight * 0.28;
  let activeId = sectionIds[0];

  sectionElements.forEach((section) => {
    if (section.offsetTop <= scrollY) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", isActive);
  });
};

window.addEventListener("scroll", setActiveNavLink, { passive: true });
window.addEventListener("load", setActiveNavLink);

// light/dark theme toggle using html[data-theme] + localStorage
const themeToggle = document.getElementById("AcceptConditions");
const htmlEl = document.documentElement;
const THEME_KEY = "theme";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const applyTheme = (theme) => {
  htmlEl.setAttribute("data-theme", theme);
  if (themeToggle) {
    themeToggle.checked = theme === DARK_THEME;
  }
};

const getSavedTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (error) {
    return null;
  }
};

const saveTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    // ignore storage errors in restricted environments
  }
};

const normalizeTheme = (theme) => (theme === DARK_THEME ? DARK_THEME : LIGHT_THEME);

const initialTheme = normalizeTheme(
  getSavedTheme() || htmlEl.getAttribute("data-theme") || LIGHT_THEME,
);
applyTheme(initialTheme);
saveTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    const nextTheme = themeToggle.checked ? DARK_THEME : LIGHT_THEME;
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });
}

// keep footer year current
const footerYear = document.getElementById("footer_year");
if (footerYear) {
  footerYear.textContent = String(new Date().getFullYear());
}
