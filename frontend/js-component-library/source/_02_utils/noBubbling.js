/**
 * @param {*} event
 * @param {*} callback_function
 */

const noBubbling = (e, fn) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  if (fn) fn(e);
};

export default noBubbling;