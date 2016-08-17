angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
      // var canvas = document.getElementById('signature-pad');
      // var signaturePad = new SignaturePad(canvas);

      $scope.currentVideo = document.getElementsByClassName('videoPlayer')[0];
      $scope.currentCanvas = document.getElementsByClassName('signaturePad')[0];
      $scope.signaturePad = new SignaturePad($scope.currentCanvas);
      $scope.signaturePad.penColor = "rgb(66, 133, 244)";

      $scope.currentSlide;

      $scope.videos = document.getElementsByClassName('videoPlayer');

      // window.addEventListener("orientationchange", function() {
      //   // Announce the new orientation number
      //   console.log(screen.orientation); // e.g. portrait
      // }, false);

      Reveal.addEventListener('slidechanged', function (event) {
        if ($scope.currentVideo) {
          $scope.currentVideo.pause();
        }
        $scope.currentSlide = Reveal.getCurrentSlide();
        $scope.currentVideo = $scope.currentSlide.getElementsByClassName('videoPlayer')[0];

        if ($scope.currentVideo) {
          $scope.currentVideo.play();
        }

        $scope.currentCanvas = $scope.currentSlide.getElementsByClassName('signaturePad')[0];

        if ($scope.currentCanvas) {
          $scope.signaturePad = new SignaturePad($scope.currentCanvas);
          $scope.signaturePad.penColor = "rgb(66, 133, 244)";
          resizeCanvas();
        }

      });

      init();

      function init() {
        for (var i = 0; i < $scope.videos.length; i++) {
          makeVideoPlayableInline($scope.videos[i]);
        }

        // makeVideoPlayableInline($scope.video);
        $scope.currentVideo.play();
        // Reveal.initialize({
        //   controls: true,
        //   progress: true,
        //   history: true,
        //   center: true,
        //
        //   width: '100%',
        //   height: '100%',
        //
        //   // transition: 'slide', // none/fade/slide/convex/concave/zoom
        //
        //   // Optional reveal.js plugins
        //   // dependencies: [
        //   //   {
        //   //     src: 'lib/js/classList.js', condition: function () {
        //   //     return !document.body.classList;
        //   //   }
        //   //   },
        //   //   {
        //   //     src: 'plugin/markdown/marked.js', condition: function () {
        //   //     return !!document.querySelector('[data-markdown]');
        //   //   }
        //   //   },
        //   //   {
        //   //     src: 'plugin/markdown/markdown.js', condition: function () {
        //   //     return !!document.querySelector('[data-markdown]');
        //   //   }
        //   //   },
        //   //   {
        //   //     src: 'plugin/highlight/highlight.js', async: true, callback: function () {
        //   //     hljs.initHighlightingOnLoad();
        //   //   }
        //   //   },
        //   //   { src: 'plugin/zoom-js/zoom.js', async: true },
        //   //   { src: 'plugin/notes/notes.js', async: true }
        //   // ]
        // });

        Reveal.initialize({
          controls: true,
          progress: true,
          // history: true,
          center: true,

          transition: 'slide', // none/fade/slide/convex/concave/zoom
          // The "normal" size of the presentation, aspect ratio will be preserved
          // when the presentation is scaled to fit different resolutions. Can be
          // specified using percentage units.
          width: '100%',
          height: '100%',

          // Factor of the display size that should remain empty around the content
          // margin: 0.1,
          //
          // // Bounds for smallest/largest possible scale to apply to content
          // minScale: 0.2,
          // maxScale: 1.5,
          // viewDistance: 1,
          slideNumber: true,
          touch: false

        });

      }

      $scope.playPause = function () {
        if ($scope.currentVideo.paused) {
          $scope.currentVideo.play();
        } else {
          $scope.currentVideo.pause();
        }
      };

      $scope.fullScreen = function () {
        $scope.video.webkitEnterFullScreen();
      };

      $scope.clear = function () {
        $scope.signaturePad.clear();
      };

      function resizeCanvas() {
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        $scope.currentCanvas.width = $scope.currentCanvas.offsetWidth * ratio;
        $scope.currentCanvas.height = $scope.currentCanvas.offsetHeight * ratio;
        $scope.currentCanvas.getContext("2d").scale(ratio, ratio);
        // $scope.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
      }

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();

      // $scope.clearCanvas = function () {
      //   signaturePad.clear();
      // };
      //
      // $scope.saveCanvas = function () {
      //   var sigImg = signaturePad.toDataURL();
      //   $scope.signature = sigImg;
      // };
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //
      //$scope.$on('$ionicView.enter', function(e) {
      //});

      $scope.chats = Chats.all();
      $scope.remove = function (chat) {
        Chats.remove(chat);
      };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
      $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
      $scope.settings = {
        enableFriends: true
      };
    });
