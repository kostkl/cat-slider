const angular = require("angular");
const $ = require("jquery");
const sliderApp = angular.module("cat.slider");

sliderApp.service("CatService", [
  "$http",
  "$window",
  function($http, $window) {
    this.getCat = getCat;

    function getCat() {
      return $http({
        method: "GET",
        url:
          "https://cors-anywhere.herokuapp.com/https://thecatapi.com/api/images/get?format=xml&results_per_page=20", // adding a proxy so there is not a problem with cors
        timeout: 10e3,
        params: {},
        controllerAs: "SliderControllerCtrl",
        transformResponse(data) {
          // string -> XML document object
          return $.parseXML(data);
        }
      });
    }
  }
]);
