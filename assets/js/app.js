import Navigation from "./modules/navbar.js";
import heroCarousel from "./modules/heroCarousel.js";
import * as util from "./modules/util.js";

document.addEventListener("DOMContentLoaded", function () {
  const userButton = document.querySelector(".user-button");
  const userProfile = document.querySelector(".user-profile");

  userButton.addEventListener("click", () => {
    if (util.getUserFromCookie()) {
      userProfile.classList.toggle("active");
      userProfile.querySelector(".username").textContent = `${
        util.getUserFromCookie().username
      }`;
    } else {
      const newURL = window.location.href.replace("index.html", "login.html");
      window.location.href = newURL;
    }
  });
  const navigation = new Navigation(
    ".nav-links",
    ".nav-bar-button",
    "main",
    ".blur"
  );
  heroCarousel();
});
