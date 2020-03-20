angular.module('vtAppCtrlPremium', ['ngStorage', 'vtPlayVidService', 'vtAppConstants', 'vtLoadVideosService'])


    .controller("ctrl_premium", function ($scope, $localStorage, srvc_playVid, srvc_loadVid, srvc_premium, $http, API, $timeout) {


        $scope.isLogged = $localStorage.IS_LOGGED;
        $scope.userData = $localStorage.USER_DATA;
        $scope.playVid = srvc_playVid.playVid;
        $scope.addToPlaylist = srvc_playVid.addToPlaylist
        $scope.checkVideoPrivacy = srvc_playVid.checkVideoPrivacy;

        $scope.premiumVids = [];
        $scope.relatedVids = [];
        currentVideoId = '';


        // $scope.loadRelated = function () {
        //     // console.log(srvc_premium.getCarouselIndex())
        //     getRelated(srvc_premium.getCarouselIndex())
        // }

        srvc_loadVid.loadVideo('Premium', 8, 1).then(function (result) {
            console.log(result)
            $scope.premiumVids = result.data;
            getRelated(0)

        }, function (error) {
            console.log(error)
        })



        function getRelated(index) {

            // recentlyAdded.find('.owl-stage-outer').children().unwrap();
            VID_ID = $scope.premiumVids[index].id;
            var encodedString = 'action=' + encodeURIComponent('Video_GetRelated') + "&count="
                + encodeURIComponent(3) + "&id ="
                + encodeURIComponent(VID_ID) + "&page="
                + encodeURIComponent(1);
            $http({
                method: 'POST',
                url: API.URL,
                data: encodedString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) {
                $scope.relatedVids = [];
                $scope.relatedVids = result.data;
                // recentlyAdded.trigger('replace.owl.carousel', result.data).trigger('refresh.owl.carousel')
                // srvc_premium.initRelated();
            }, function (error) {
                console.log(error)
            })
        }


    })

    .directive("ngCheckBanner", function (srvc_premium, $timeout) {
        return function (scope, element, attrs) {
            if (scope.$last) {
                $timeout(function () {
                    srvc_premium.init();
                }, 250)
                $timeout(function () {
                    srvc_premium.initCarousel();
                }, 300)

            }
        };
    })

    .directive("ngCheckRelated", function (srvc_premium, $timeout) {
        return function (scope, element, attrs) {
            if (scope.$last) {
                $timeout(function () {

                    srvc_premium.initRelated();
                }, 3000)

            }
        };
    })

    
    .directive("ngCheckImage", function ($http) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                attrs.$observe('srcset', function (ngSrc) {

                    $http.get(ngSrc).then(function (result) {
                        // console.log("succsess")
                    }, function (error) {
                        element.attr('srcset', 'https://via.placeholder.com/273x185'); // set default image
                    })
                });
                // $http.get('srcset', function (src) {
                //     $http.get(src).then(function (result) {
                //         // console.log("succsess")
                //     }, function (error) {
                //         console.log("error")
                //     })
                // })
            }
        }
    })

