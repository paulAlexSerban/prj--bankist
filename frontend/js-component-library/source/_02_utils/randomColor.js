import randomInt from "./randomInt";

const randomColor = () => {
  return `
  rgb(${randomInt(0, 255)},
      ${randomInt(0, 255)},
      ${randomInt(0, 255)})`;
};
 export default randomColor;