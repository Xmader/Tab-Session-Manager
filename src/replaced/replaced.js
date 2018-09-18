import browser from "webextension-polyfill";

const sanitaize = {
  encode: str => {
    str = str || "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  },
  decode: str => {
    str = str || "";
    return str
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&");
  }
};

let parameter = returnReplaceParameter(location.href);

document.title = parameter.title;
document.getElementsByClassName("title")[0].innerText = parameter.title;
document.getElementsByClassName("replacedUrl")[0].innerText = parameter.url;
document.head.insertAdjacentHTML(
  "beforeend",
  `<link rel="shortcut icon" href="${sanitaize.encode(parameter.favIconUrl)}">`
);

if (parameter.state == "open_faild") {
  document.getElementsByClassName("replacedPageMessage")[0].innerText = browser.i18n.getMessage(
    "replacedPageMessage"
  );
}

function returnReplaceParameter(url) {
  let parameter = {};
  let paras = url.split("?")[1].split("&");
  for (let p of paras) {
    parameter[p.split("=")[0]] = decodeURIComponent(p.split("=")[1]);
  }
  return parameter;
}
