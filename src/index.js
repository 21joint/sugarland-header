if (process.env.NODE_ENV !== "production") {
  import("../../../bandwango-laravel/public/css/checkout/styles.css");
}
import("../assets/styles/index.scss");
import { getWeather } from "./weather";

import("../package").then(PKG => {
  const params = {
    lat: Number(PKG.location.lat),
    lng: Number(PKG.location.lng)
  };

  const weatherWidgets = document.querySelectorAll(
    "." + PKG.prefix + "-weather"
  );

  for (let j = 0; j < weatherWidgets.length; ++j) {
    weatherWidgets[j].classList.add("loading");
  }

  getWeather(params).then(function(res) {
    for (let j = 0; j < weatherWidgets.length; ++j) {
      weatherWidgets[j].classList.remove("loading");
    }
    console.log(res);
  });
});
