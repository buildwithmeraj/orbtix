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

// fetch and render services after page has loaded
window.addEventListener("load", async () => {
  try {
    // try to fetch services
    const response = await fetch("data/services.json");
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
    const servicesDiv = document.getElementById("services");

    // first empty the div
    servicesDiv.innerHTML = "";

    if (services && services.length > 0) {
      services.forEach((service) => {
        // create the child componet to hold the service
        const card = document.createElement("div");

        // add classes to it
        card.className = "rounded-lg shadow-md bg-base-100";

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
  }
});

document.getElementById("submit_btn").addEventListener("click", function () {
  const result = document.getElementById("result");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (name.value.length < 3 || name.value.length > 15) {
    result.innerHTML =
      '<span class="text-red-500 font-semibold">Invalid name</span>';
  } else if (emailRegex.test(email.value) === false) {
    result.innerHTML =
      '<span class="text-red-500 font-semibold">Invalid email</span>';
  } else if (message.value.length < 20 || message.value.length > 1000) {
    result.innerHTML =
      '<span class="text-red-500 font-semibold">Invalid message length</span>';
  } else {
    result.innerHTML =
      '<span class="text-green-500 font-semibold">Message sent successfuly</span>';
  }

  //console.log("Submitted");
});
