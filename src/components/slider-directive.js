const angular = require("angular");
const $ = require("jquery");
const template = require("./slider.html");

const sliderApp = angular.module("cat.slider");

sliderApp.directive("catSlider", [
  "$timeout",
  $timeout => {
    return {
      restrict: "AE",
      replace: true,
      scope: {
        images: "="
      },

      link(scope, elements, attributes) {
        scope.currentIndex = 0;
        scope.likes = 0;
        scope.dislikes = 0;
        scope.next = next;
        scope.prev = prev;
        scope.like = like;
        scope.dislike = dislike;
        scope.cyrcles = cyrcles;

        /* Next and Previous Buttons Functions */
        function next() {
          // scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
          if (scope.currentIndex < scope.images.length - 1) {
            scope.currentIndex++;
            scope.likes = scope.images[scope.currentIndex].likes;
            scope.dislikes = scope.images[scope.currentIndex].dislikes;
            scope.cyrcles();
          } else {
            scope.currentIndex = 0;
          }
        }

        function prev() {
          // scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
          if (scope.currentIndex > 0) {
            scope.currentIndex--;
            scope.likes = scope.images[scope.currentIndex].likes;
            scope.dislikes = scope.images[scope.currentIndex].dislikes;
            scope.cyrcles();
          } else {
            scope.currentIndex = scope.images.length - 1;
          }
        }

        /* likes/dislikes cyrcles function */
        function cyrcles() {
          let larray;
          scope.likes = scope.images[scope.currentIndex].likes;
          scope.dislikes = scope.images[scope.currentIndex].dislikes;

          scope.larray = [
            {
              likes: scope.likes,
              dislikes: scope.dislikes
            },
            {}
          ];
        }

        /* Like and Dislike functions*/
        function like() {
          scope.images[scope.currentIndex].likes++;
          /* if(scope.images[scope.currentIndex].dislikes == 1){
              scope.images[scope.currentIndex].dislikes--;
          } */
          alert(
            "Image " +
              (scope.images[scope.currentIndex].Pic + 1) +
              " has now " +
              scope.images[scope.currentIndex].likes +
              " like(s)."
          );
          console.log(scope.images);
          scope.cyrcles();
        }

        function dislike() {
          scope.images[scope.currentIndex].dislikes++;
          /* if(scope.images[scope.currentIndex].likes == 1){
            scope.images[scope.currentIndex].likes--;
        } */
          alert(
            "Image " +
              (scope.images[scope.currentIndex].Pic + 1) +
              " has now " +
              scope.images[scope.currentIndex].dislikes +
              " dislike(s)."
          );
          console.log(scope.images);
          scope.cyrcles();
        }

        /* Watch Function */
        scope.$watch("currentIndex", () => {
          scope.images.forEach(image => {
            image.visible = false;
            scope.cyrcles();
            let img = $("div").find("div.cat-slider");
            img.css(
              "background-image",
              "url(" + scope.images[scope.currentIndex].src + ")"
            );
            img.css("background-repeat");
          });
          scope.images[scope.currentIndex].visible = true;
        });

        /* Interval for Automatic Slideshow */
        let time;

        let interval = function() {
          time = $timeout(function() {
            scope.next();
            time = $timeout(interval, 5e3);
          }, 3e3);
        };

        interval();

        scope.$on("$destroy", function() {
          $timeout.cancel(time);
        });

        /* End */
      },
      template: template
    };
  }
]);
