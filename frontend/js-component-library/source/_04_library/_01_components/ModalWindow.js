import noBubbling from "../../_02_utils/noBubbling";

const ModalWindow = (el, parent) => {
  const elements = {};
  const states = {};
  const data = global.document.data;

  const setupDomReference = () => {
    elements.parent = parent;
    elements.el = el;
    elements.modal = document.querySelector(".modal");
    elements.btnCloseModal = document.querySelector(".btn--close-modal");
    elements.btnsOpenModal = document.querySelectorAll(".btn--show-modal");
    elements.overlay = document.querySelector(".overlay");
  };

  const setupEventListeners = () => {
    elements.btnsOpenModal.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        noBubbling(e);
        openModal();
      })
    );
    elements.btnCloseModal.addEventListener("click", () => {
      closeModal();
    });
    elements.overlay.addEventListener("click", () => {
      closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !elements.modal.classList.contains("hidden")) {
        closeModal();
      }
    });
  };

  const openModal = () => {
    elements.modal.classList.remove("hidden");
    elements.overlay.classList.remove("hidden");
  };

  const closeModal = () => {
    elements.modal.classList.add("hidden");
    elements.overlay.classList.add("hidden");
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    console.log({ ModalWindow: { elements, states, data } });
  };

  init();
};

export default ModalWindow;
