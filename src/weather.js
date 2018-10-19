import $ from "jquery";
import wBuilder from "./buildWeather";
import { prefix as PREFIX } from "../package";

export function getWeather(options) {
  const queryUri =
    "https://cors.io/?https://www.visitsugarlandtx.com/plugins/core/svapi/?service=weatherv2&endpoint=latlng&serviceArgs={%22lat%22:%20" +
    options.lat +
    ",%20%22lng%22:%20" +
    options.lng +
    ",%20%22unit%22:%20%22" +
    (options.unit ? options.unit : "f") +
    "%22}";
  return $.ajax({
    async: true,
    crossDomain: true,
    url: queryUri,
    method: "GET"
  }).then(res => {
    if (res.status >= 400) {
      console.log(res);
      throw new Error("Bad response from server");
    }
    wBuilder(JSON.parse(res).data.current, `.${PREFIX}-weather`);
    return JSON.parse(res).data.current;
  });
}
