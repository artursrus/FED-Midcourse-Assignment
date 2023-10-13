const heroCarousel = () => {
  const slides = document.querySelectorAll(".hero-carousel img");
  const buttons = document.querySelectorAll(".hero-carousel-buttons button");

  let lastPressed = new Date();

  const changeSlide = (index) => {
    const activeSlide = document.querySelector(
      ".hero-carousel img[data-active]"
    );
    activeSlide.removeAttribute("data-active");
    if (index) {
      slides[index - 1].setAttribute("data-active", true);
      return;
    }

    let newIndex = [...slides].indexOf(activeSlide) + 1;

    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;

    slides[newIndex].setAttribute("data-active", true);
  };
  const handleButtonClick = (button) => {
    buttons.forEach((button) => {
      button.style.background = "#080f0f25";
    });

    changeSlide(parseInt(button.dataset.button));
    lastPressed = new Date();
    button.style.background = "#f80e24";
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      handleButtonClick(button);
    });
  });

  setInterval(() => {
    const currentTime = new Date();
    const timeElapsed = currentTime - lastPressed;

    if (timeElapsed > 10000) {
      changeSlide();
      lastPressed = new Date();
    }
  }, 2000);
};

export default heroCarousel;
