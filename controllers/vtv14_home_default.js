angular.module('vtAppCtrlHome', ['ngStorage', 'vtPlayVidService', 'vtLoadVideosService'])


    .controller("ctrl_homeDefault", function ($scope, $localStorage, $rootScope, srvc_playVid, srvc_loadVid) {


        var $ = jQuery;
        $scope.isLogged = $localStorage.IS_LOGGED;
        $scope.userData = $localStorage.USER_DATA;
        $scope.playVid = srvc_playVid.playVid;
        $scope.addToPlaylist = srvc_playVid.addToPlaylist;
        $scope.checkVideoPrivacy = srvc_playVid.checkVideoPrivacy;

        freeVids = [];
        premuimVids = [];
        allVids = [];
        currentVideoId = '';

        $scope.vidSection = [
            { name: "Browse Videos", link: $rootScope.chosenLang + "videoslist", content: [] },
            { name: "Premium Videos", link: $rootScope.chosenLang + "premium", content: [] }
        ]

        srvc_loadVid.loadVideo('Latest', 8, 1).then(function (result) {
            $scope.vidSection[0].content = result.data;
        }, function (error) {
            console.log(error)
        })

        srvc_loadVid.loadVideo('Premium', 8, 1).then(function (result) {
            $scope.vidSection[1].content = result.data;
        }, function (error) {
            console.log(error)
        })
        $(document).ready(function () {

            $('#crslVtbHomeLogin, #carousel, #crslVtbHomeLoggedin').owlCarousel({
                rtl: false,
                loop: true,
                dots: true,
                navText: ['<img src="/Resources/vtube/images/vt-arrow-btn-left.svg"></img>', '<img src="/Resources/vtube/images/vt-arrow-btn-right.svg">'],
                responsive: {
                    0: {
                        items: 1
                    },
                    1200: {
                        items: 1,
                        nav: true
                    }
                }
            });


        })

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