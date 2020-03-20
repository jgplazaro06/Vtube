angular.module('vtAppCtrlSeeAll', ['ngStorage', 'vtPlayVidService', 'vtAppConstants', 'vtLoadVideosService', 'vtChannelService'])

    .controller("ctrl_seeall", function ($scope, $localStorage, srvc_playVid, srvc_channel, srvc_loadVid) {


        $scope.$watch(function () { return $localStorage.FOLLOWED_CHANNELS; }, function () {
            followedChannels = $localStorage.FOLLOWED_CHANNELS
        });

        // var testParam = new URLSearchParams(window.location.search)
        // console.log(testParam)
        // console.log(testParam.get('see'))
        // console.log(testParam.get('allof'))
        // var seeOf = $localStorage.SEE
        // var allOf = $localStorage.ALL_OF
        var seeAllVids = [];

        var seeAllParam = new URLSearchParams(window.location.search)
        console.log(seeAllParam)
        console.log(seeAllParam.get('see'))
        console.log(seeAllParam.get('allof'))
        var seeOf = seeAllParam.get('see')
        var allOf = seeAllParam.get('allof')

        numOfVids = 0;
        currentId = '';

        $scope.isLogged = $localStorage.IS_LOGGED;
        $scope.userData = $localStorage.USER_DATA;
        $scope.channelView = (seeOf == "channel")

        $scope.playVid = srvc_playVid.playVid;
        $scope.addToPlaylist = srvc_playVid.addToPlaylist
        $scope.checkVideoPrivacy = srvc_playVid.checkVideoPrivacy;

        $scope.follow = srvc_channel.follow;
        $scope.unfollow = srvc_channel.unfollow;
        $scope.canViewMore = true;

        setVideoToLoad();

        $scope.isFollowing = function (id) {
            check = (row) => row.id === id
            $scope.isFollowed = followedChannels.some(check)
            return $scope.isFollowed;
        }

        $scope.viewChannel = function (id, e) {
            e.preventDefault();
            $localStorage.CHANNEL_ID = id;

            console.log(id)
            window.location.href = '~/channel-landing?channel=' + id;

        }

        $scope.loadVideos = function (count, e) {
            if (e !== undefined) e.preventDefault();
            if (numOfVids == 1) numOfVids = 3
            numOfVids += 1;
            getVideos(allOf, count, numOfVids).then(function (result) {
                if (result.data.length === 0) $scope.canViewMore = false
                console.log(result)
                seeAllVids = seeAllVids.concat(result.data);
                $scope.seeAllVids = seeAllVids;
            }, function (error) {
                console.log(error)
            })

        }

        $scope.goBack = function () {
            window.history.back();
        }


        function setVideoToLoad() {
            switch (seeOf) {
                case "video":
                    getVideos = srvc_loadVid.loadVideo;
                    break;
                case "category":
                    getVideos = srvc_loadVid.loadCategoryVideo;
                    break;
                case "channel":
                    getVideos = srvc_channel.loadChannels;
                    break;
                case "related":
                    getVideos = srvc_loadVid.loadRelatedVideos;
                    break;
            }
            // if (seeOf == "video") {
            //     getVideos = srvc_loadVid.loadVideo;
            // }
            // else if (seeOf == "category") {
            //     getVideos = srvc_loadVid.loadCategoryVideo
            // }
            // else if (seeOf == "channel") {
            //     getVideos = srvc_channel.loadChannels
            // }
            // else if()
        }

        $scope.loadVideos(24);
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