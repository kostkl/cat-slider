const angular = require("angular");
const css = require("./app-css.css");
const bootstrap = require("bootstrap/dist/css/bootstrap.css");

const sliderApp = "cat.slider";

angular.module(sliderApp, [require("angular-animate")]);

require("./components/slider-directive");
require("./app-component");
require("./components/slider-service");

module.exports = sliderApp;
