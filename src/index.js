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

  getWeather(params).then(function(res) {
    console.log(res);
  });
});
