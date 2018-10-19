import PKG from "../package";

export default function(current, selector) {
  const elems = document.querySelectorAll(selector);

  for (let i = 0; i < elems.length; ++i) {
    elems[i].innerHTML = `
  <a href="${
    PKG.website
  }/explore/about-sugar-land/weather/" target="_blank"><i class="${
      PKG.prefix
    }-weather--icon wi ${
      current.condition.icon
    }" aria-hidden="true"></i><span class="${PKG.prefix}-weather--temp">${
      current.temp
    }</span>&deg;</a>`;
  }
}
