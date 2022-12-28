import noBubbling from "../../_02_utils/noBubbling";

const ButtonScroll = (el) => {
  const elements = {};
  const states = {};
  const params = { ...JSON.parse(el.getAttribute("data-js-params")) };
  const data = global.document.data;

  const setupDomReference = () => {
    elements.parent = parent;
    elements.el = el;
    elements.target = document.querySelector(params.target);
  };

  const setupEventListeners = () => {
    elements.el.addEventListener("click", (e) => {
      noBubbling(e);
      const targetCoords = elements.target.getBoundingClientRect();
      console.log({ targetCoords });
      console.log(
        "Current scroll (X/Y)",
        window.pageXOffset,
        window.pageYOffset
      );

      console.log(
        "height/width viewport",
        document.documentElement.clientHeight,
        document.documentElement.clientWidth
      );

      // old school
      // window.scrollTo({
      //   left: targetCoords.left + window.pageXOffset,
      //   top: targetCoords.top + window.pageYOffset,
      //   behavior: "smooth",
      // });
      // modern
      elements.target.scrollIntoView({ behavior: "smooth" });
    });
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    console.log({ ButtonScroll: { elements, states, data } });
  };

  init();
};

export default ButtonScroll;
