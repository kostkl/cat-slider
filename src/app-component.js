const angular = require("angular");
const sliderApp = angular.module("cat.slider");

sliderApp.component("sliderComponent", {
  template: '<cat-slider images = "$ctrl.images"></cat-slider>',
  controller: SliderController
});

/* @ngInject */
function SliderController(CatService) {
  const vm = this;

  CatService.getCat()
    .then(response => {
      let data = response.data;
      let status = response.status;
      let header = response.header;
      let config = response.config;
      let string;

      console.dir(data); // XML document object

      const x = data.getElementsByTagName("url");

      string = [].map
        .call(x, node => {
          return node.textContent || node.innerText || "";
        })
        .join("\n");

      const array = string.split("\n");

      const jsonArr = []; // empty json array

      array.forEach((val, index) => {
        jsonArr.push({
          src: val,
          likes: 0,
          dislikes: 0,
          Pic: index
        });
      });

      vm.images = jsonArr;
    })
    .catch(response => {
      let data = response.data;
      let status = response.status;
      let header = response.header;
      let config = response.config;
      //$window.alert("Error occurred!");
    });
}
SliderController.$inject = ["CatService"];
