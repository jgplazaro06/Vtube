angular.module('vtAppCtrlNowPlaying', ['vtPlayVidService', 'ngStorage', 'vtAppConstants', 'vtDetailsService'])
    .controller("ctrl_nowplaying", function ($scope, $http, $localStorage, srvc_playVid, srvc_getDetails,
        API, $sce) {

        // $scope.$watch(function () { return $localStorage.VID_ID; }, function (newVal, oldVal) {

        // });

        $scope.$on('$locationChangeSuccess', function (event) {
            console.log("hello")

            var watchParam = new URLSearchParams(window.location.search)
            console.log(watchParam)
            console.log(watchParam.get('watch'))
            VID_ID = $localStorage.VID_ID;
            // VID_ID = watchParam.get('watch');
            // VID_ID = $localStorage.VID_ID;

            loadComments()
            getRelated();
            getDetails();
        })
        // jQuery.noConflict();

        var watchParam = new URLSearchParams(window.location.search)
        console.log(watchParam)
        console.log(watchParam.get('watch'))
        // VID_ID = $localStorage.VID_ID;
        VID_ID = watchParam.get('watch');

        $scope.isLogged = $localStorage.IS_LOGGED;
        $scope.userComment = '';

        $scope.playVid = srvc_playVid.playVid;
        $scope.addToPlaylist = srvc_playVid.addToPlaylist;
        $scope.checkVideoPrivacy = srvc_playVid.checkVideoPrivacy;

        userData = $localStorage.USER_DATA;
        if (userData != undefined) {
            $scope.isSubscribed = (userData.membership != "Free")
        }
        relatedPage = 0;

        $scope.submitComment = function (e) {
            e.preventDefault();

            var encodedString = 'action=' + encodeURIComponent('DDrupal_Comment_AddComment') + "&title="
                + encodeURIComponent(VID_ID) + "&comment="
                + encodeURIComponent($scope.userComment) + "&ctype="
                + encodeURIComponent('Video') + "&userid="
                + encodeURIComponent(userData.id);
            $http({
                method: 'POST',
                url: API.URL,
                data: encodedString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) {
                $scope.userComment = '';
                loadComments()

            }, function (error) {
                console.log(error)
            })

        }


        function loadComments() {
            var encodedString = 'action=' + encodeURIComponent('Comment_GetComment') + "&name="
                + encodeURIComponent(VID_ID);
            $http({
                method: 'POST',
                url: API.URL,
                data: encodedString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) {
                commentList = result.data;
                commentList.forEach(element => {
                    element.imageUser = 'http://site.the-v.net/Widgets_Site/avatar.ashx?id=' + element.UserId;
                });
                $scope.commentList = result.data;



            }, function (error) {
                console.log(error)
            })
        }


        $scope.addLikes = function (e) {

            e.preventDefault();

            if (isVideoLiked()) {
                $('#mdlAlreadyLiked').modal('show')
            }
            else {
                var encodedString = 'action=' + encodeURIComponent('Video_AddLikes') + "&id="
                    + encodeURIComponent(VID_ID);
                $http({
                    method: 'POST',
                    url: API.URL,
                    data: encodedString,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (result) {
                    $localStorage.LIKED_VIDEOS = $localStorage.LIKED_VIDEOS.concat(VID_ID)
                    $('#mdlVideoLiked').modal('show')

                }, function (error) {
                    console.log(error)
                })
            }


        }


        function isVideoLiked() {
            if ($localStorage.LIKED_VIDEOS == undefined) {
                $localStorage.LIKED_VIDEOS = []
                $localStorage.LIKED_VIDEOS = $localStorage.LIKED_VIDEOS.concat(VID_ID)
                return false;
            }
            else {

                isLiked = false;
                likedVideos = $localStorage.LIKED_VIDEOS;
                likedVideos.forEach(element => {
                    if (element == VID_ID) isLiked = true;
                })

                console.log(isLiked)
                return isLiked;
            }
        }

        //load

        function getRelated() {
            relatedPage += 1;

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
                console.log(result)
                $scope.relatedVideos = result.data;

            }, function (error) {
                console.log(error)
            })


        }

        function getDetails() {
            srvc_getDetails.getDetails('Video', VID_ID).then(function (result) {
                $scope.currentVideo = result.data[0];
                $scope.safeUrl = $sce.trustAsResourceUrl(`http://players.brightcove.net/3745659807001/4JJdlFXsg_default/index.html?videoId=${VID_ID}`)
            }, function (error) {
                console.log(error)
            })

        }


        //getDetails


        loadComments()
        getRelated();
        getDetails();
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

    .directive("ngCheckAvatar", function ($http) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                attrs.$observe('srcset', function (ngSrc) {

                    $http.get(ngSrc).then(function (result) {
                        // console.log("succsess")
                    }, function (error) {
                        element.attr('srcset', "https://via.placeholder.com/80x80"); // set default image
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