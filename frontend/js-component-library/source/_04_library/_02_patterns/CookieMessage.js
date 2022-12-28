const CookieMessage = (parent) => {
  const elements = {};
  const states = {};
  const data = global.document.data;
  const virtualDOMEls = {};

  const setupDomReference = () => {
    elements.acceptButton = document.querySelector(".btn--close-cookie");
  };

  const setupEventListeners = () => {
    if (elements.acceptButton) {
      elements.acceptButton.addEventListener("click", () => {
        parent.removeChild(parent.querySelector(".cookie-message"));
      });
    }
  };

  const createMessageCmp = () => {
    const message = document.createElement("div");
    message.classList.add("cookie-message");
    message.innerHTML = `We use cookied for improved functionality and analytics.
      <button class="btn btn--close-cookie">Got it!</button>`;
    virtualDOMEls.message = message;
  };

  const setupCookieMessage = () => {
    createMessageCmp();
    parent.append(virtualDOMEls.message);
    setupDomReference();
  };

  const init = () => {
    setupDomReference();
    setupCookieMessage();
    setupEventListeners();
    console.log({ CookieMessage: { elements, states, data } });
  };

  init();
};

export default CookieMessage;
