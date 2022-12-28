const Slider = (el, parent) => {
  const elements = {};
  const states = {
    curSlide: 0,
  };
  const data = global.document.data;

  const setupDomReference = () => {
    elements.parent = parent;
    elements.el = el;
    elements.slides = document.querySelectorAll(".slide");
    elements.btnLeft = document.querySelector(".slider__btn--left");
    elements.btnRight = document.querySelector(".slider__btn--right");
    elements.dotContainer = document.querySelector(".dots");
  };

  const setupEventListeners = () => {
    // Event handlers
    elements.btnRight.addEventListener("click", nextSlide);
    elements.btnLeft.addEventListener("click", prevSlide);

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") prevSlide();
      e.key === "ArrowRight" && nextSlide();
    });

    elements.dotContainer.addEventListener("click", function (e) {
      if (e.target.classList.contains("dots__dot")) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
      }
    });
  };

  const createDots = () => {
    elements.slides.forEach(function (_, i) {
      elements.dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = (slide) => {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = (slide) => {
    elements.slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (states.curSlide === states.maxSlide - 1) {
      states.curSlide = 0;
    } else {
      states.curSlide++;
    }

    goToSlide(states.curSlide);
    activateDot(states.curSlide);
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    states.maxSlide = elements.slides.length;
    goToSlide(0);
    createDots();

    activateDot(0);
    console.log({ Slider: { elements, states, data } });
  };

  const prevSlide = function () {
    if (states.curSlide === 0) {
      states.curSlide = states.maxSlide - 1;
    } else {
      states.curSlide--;
    }
    goToSlide(states.curSlide);
    activateDot(states.curSlide);
  };

  init();
};

export default Slider;
