const AppPageTemplate = (el) => {
  global.document.data = {};

  const elements = {};
  const states = {};
  const data = global.document.data;

  const setupDomReference = () => {
    elements.el = el;
  };

  const init = () => {
    setupDomReference();
    console.log({ page: { elements, states, data } });
  };

  init();
};

export default AppPageTemplate;