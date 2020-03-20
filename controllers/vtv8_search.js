angular.module('vtAppCtrlSearch', ['ngStorage', 'vtPlayVidService', 'vtAppConstants', 'vtLoadVideosService', 'vtChannelService'])

    .controller("ctrl_search", function ($scope, $http, $localStorage, srvc_playVid, srvc_channel, srvc_loadVid, API) {

        $scope.$watch(function () { return $localStorage.FOLLOWED_CHANNELS; }, function () {
            followedChannels = $localStorage.FOLLOWED_CHANNELS
        });

        $scope.$on('$locationChangeSuccess', function (event) {

            var searchParam = new URLSearchParams(window.location.search)
            console.log(searchParam)
            console.log(searchParam.get('keyword'))
            searchKeyword = searchParam.get('keyword')
            $scope.title = searchParam.get('keyword')

            // searchKeyword = $localStorage.KEYWORD;
            // $scope.title = $localStorage.KEYWORD;

            getSearch();
            $scope.loadCategoryVids(9)
        })

        var seeAllVids = [];

        var searchParam = new URLSearchParams(window.location.search)
        console.log(searchParam)
        console.log(searchParam.get('keyword'))
        searchKeyword = searchParam.get('keyword')
        $scope.title = searchParam.get('keyword')

        // searchKeyword = $localStorage.KEYWORD;
        // $scope.title = $localStorage.KEYWORD;
        $scope.vidResultCount = 0;
        $scope.channelResultCount = 0;
        $scope.categoryResultCount = 0;
        $scope.loadVidLimit = 9;
        $scope.loadChannelLimit = 9;
        $scope.loadCategoryLimit = 9;


        numOfVids = 0;
        currentId = '';

        $scope.isLogged = $localStorage.IS_LOGGED;
        $scope.userData = $localStorage.USER_DATA;

        $scope.vidResult = [];
        $scope.channelResult = [];
        $scope.categoryResult = [];


        $scope.playVid = srvc_playVid.playVid;
        $scope.addToPlaylist = srvc_playVid.addToPlaylist;
        $scope.checkVideoPrivacy = srvc_playVid.checkVideoPrivacy;


        $scope.follow = srvc_channel.follow;
        $scope.unfollow = srvc_channel.unfollow;

        getSearch();

        $scope.limitIncrease = function (e) {
            e.preventDefault();
            $scope.loadVidLimit += 9;

        }

        $scope.limitChannelIncrease = function (e) {
            e.preventDefault();
            $scope.loadChannelLimit += 9;

        }
        $scope.goBack = function () {
            window.history.back();
        }

        $scope.isFollowing = function (id) {
            check = (row) => row.id === id
            $scope.isFollowed = followedChannels.some(check)
            return $scope.isFollowed;
        }

        $scope.loadCategoryVids = function (count, e) {
            if (e !== undefined) e.preventDefault();

            srvc_loadVid.loadCategoryVideo(searchKeyword, count, 1).then(function (result) {
                $scope.categoryResultCount = result.data.length;
                $scope.categoryResult = $scope.categoryResult.concat(result.data);
                // $scope.categoryResult = seeAllVids;
            }, function (error) {
                console.log(error)
            })
        }

        function getSearch() {
            var encodedString = 'action=' + encodeURIComponent('get_Search') + "&keyword="
                + encodeURIComponent(searchKeyword) + "&mytype="
                + encodeURIComponent("video");

            $http({
                method: 'POST',
                url: API.URL,
                data: encodedString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) {
                console.log(result)
                $scope.vidResultCount = result.data.length;
                if ($scope.vidResultCount == 0)
                    loadReccomended()
                else {
                    $scope.vidResult = result.data;
                    correctLinks($scope.vidResult)
                }

            }, function (error) {
                console.log(error)
            })

            var encodedString = 'action=' + encodeURIComponent('get_Search') + "&keyword="
                + encodeURIComponent(searchKeyword) + "&mytype="
                + encodeURIComponent("channel");

            $http({
                method: 'POST',
                url: API.URL,
                data: encodedString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) {
                console.log(result)
                if (typeof result.data === 'string') {
                    result.data = (result.data).replace(/↵/gu, "")
                    result.data = (result.data).replace(/(\r\n|\n|\r)/gm, "");
                    console.log(result.data)
                    result.data = JSON.parse(result.data)
                }
                // result.data = JSON.parse(result.data)

                $scope.channelResultCount = result.data.length;
                $scope.channelResult = result.data;

            }, function (error) {
                console.log(error)
            })

        }

        function loadReccomended() {
            srvc_loadVid.loadVideo("Recommended", 9, 1).then(function (result) {
                $scope.vidResult = result.data;
                console.log($scope.vidResult)

            })
        }
        function correctLinks(searchArray) {


            searchArray.forEach(element => {
                var imageOriginal = element.image;
                var URLOriginal = element.URL;
                var imageOriginal = imageOriginal.slice(imageOriginal.indexOf("image="))
                var imageReal = imageOriginal.slice(imageOriginal.indexOf("http"))
                var URLReal = URLOriginal.slice((URLOriginal.indexOf("id=")) + 3)
                element.image = imageReal;
                element.URL = URLReal;
                // srvc_getDetails.getDetails('Video', element.videoId).then(function (result) {
                //     element.points = result.data[0].points
                //     element.privacy = result.data[0].videoPrivacy
                // })
            })
        }

        $scope.loadCategoryVids(9)

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