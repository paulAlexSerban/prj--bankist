import CookieMessage from "../_02_patterns/CookieMessage";

/**
 * check for cookie in local storage
 * check if hasReadCookieConsent
 */

const CookieLoader = (el) => {
  console.log("cookie loader loaded");
  const elements = {};
  const states = {};
  const data = global.document.data;

  const setupDomReference = () => {
    elements.el = el;
  };

  const setupEventListeners = () => {};

  // checkLocalStorage

  const checkLocalStorage = () => {
    const hasReadCookieConsent = false;
    const areCookieValid = false;

    if (hasReadCookieConsent && areCookieValid) {
      console.log({ hasReadCookieConsent, areCookieValid });
    } else {
      loadCookieMessages();
    }
  };

  const loadCookieMessages = () => {
    CookieMessage(elements.el);
  };

  const init = () => {
    setupDomReference();
    setupEventListeners();
    checkLocalStorage();
    console.log({ CookieLoader: { elements, states, data } });
  };

  init();
};

export default CookieLoader;
