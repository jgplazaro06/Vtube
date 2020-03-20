angular.module('vtAppCtrlVideos', ['ngStorage', 'vtPlayVidService', 'vtAppConstants', 'vtLoadVideosService'])

    .controller("ctrl_videos", function ($scope, $localStorage, srvc_playVid, srvc_loadVid) {


        var latestVids = [];
        var recommendedVids = [];
        var byViewsVids = [];

        numLatestVids = 0;
        numRecoVids = 0;
        numByViewsVids = 0;
        currentId = '';

        $scope.isLogged = $localStorage.IS_LOGGED;
        $scope.userData = $localStorage.USER_DATA;

        $scope.playVid = srvc_playVid.playVid;
        $scope.addToPlaylist = srvc_playVid.addToPlaylist
        $scope.checkVideoPrivacy = srvc_playVid.checkVideoPrivacy;

        $scope.canViewMoreRecom = true;
        $scope.canViewMoreViews = true;
        $scope.canViewMoreLatest = true;

        $scope.sectionVideos = [
            filterLatest = false,
            filterRecommended = false,
            filterByViews = false
        ]


        $scope.reloadPage = function () {
            window.location.reload();
        }

        $scope.loadLatest = function (count, e) {
            if (e !== undefined) e.preventDefault();

            numLatestVids += 1;
            srvc_loadVid.loadVideo('Latest', count, numLatestVids).then(function (result) {
                if (result.data.length === 0) {
                    $scope.canViewMoreLatest = false;
                }
                latestVids = latestVids.concat(result.data);
                $scope.latestVids = latestVids;
            }, function (error) {
                console.log(error)
            })

        }

        $scope.loadRecommended = function (count, e) {
            if (e !== undefined) e.preventDefault();

            numRecoVids += 1;
            srvc_loadVid.loadVideo('Recommended', count, numRecoVids).then(function (result) {
                if (result.data.length === 0) {
                    $scope.canViewMoreRecom = false;
                }
                recommendedVids = recommendedVids.concat(result.data);
                $scope.recommendedVids = recommendedVids;
            }, function (error) {
                console.log(error)
            })
        }

        $scope.loadByViews = function (count, e) {
            //all vids
            if (e !== undefined) e.preventDefault();
            numByViewsVids += 1;
            srvc_loadVid.loadVideo('Viewed', count, numByViewsVids).then(function (result) {
                if (result.data.length === 0) {
                    $scope.canViewMoreViews = false;
                }
                byViewsVids = byViewsVids.concat(result.data);
                $scope.byViewsVids = byViewsVids
            }, function (error) {
                console.log(error)
            })

        }


        $scope.testError = function () {
            console.log("image error")
        }
        $scope.loadLatest(8);
        $scope.loadRecommended(8);
        $scope.loadByViews(8);

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