angular.module('vtAppCtrlNowPlaying', ['vtPlayVidService', 'ngStorage', 'vtAppConstants', 'vtDetailsService'])
    .controller("ctrl_nowplaying", function ($scope, $http, $localStorage, $sessionStorage, srvc_playVid, srvc_getDetails, srvc_loadVid,
        API, $sce, $q) {

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
        VID_ID = watchParam.get('watch');

        $scope.isLogged = $localStorage.IS_LOGGED;
        $scope.userComment = { "comment": '' };

        isLogged = $localStorage.IS_LOGGED
        var currentLang = $localStorage.CHOSEN_LANG
        if (!currentLang) currentLang = 'en'

        $scope.playVid = srvc_playVid.playVid;
        $scope.addToPlaylist = srvc_playVid.addToPlaylist;
        $scope.checkVideoPrivacy = srvc_playVid.checkVideoPrivacy;

        userData = $localStorage.USER_DATA;

        relatedPage = 0;

        $scope.submitComment = function (e) {
            e.preventDefault();

            // userComment['comment'] = new { comment = $scope.userComment.comment }
            requestString = [API.THEV, 'Video/comment', VID_ID, $sessionStorage.AUD].filter(Boolean).join('/')
            userComment = JSON.stringify($scope.userComment)

            $http.post(requestString, userComment, {
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
            }).then(
                function (result) {
                    console.log(result)
                    if (result.status == 200) loadComments()
                    // $scope.userComment.comment = '';
                }, function (error) {
                    console.log(error)
                    // $scope.userComment.comment = '';

                })

        }


        $scope.goBack = function () {
            window.history.back();
        }

        function loadComments() {
            $scope.userComment.comment = '';
            requestString = [API.THEV, 'Video/comment/list', VID_ID, $sessionStorage.AUD].filter(Boolean).join('/')
            console.log(requestString)
            if ($sessionStorage.USER_TOKEN) {
                $http.get(requestString, {
                    headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
                }).then(function (result) {
                    console.log(result)
                    commentList = result.data;
                    commentList.forEach(element => {
                        element.imageUser = 'http://site.the-v.net/Widgets_Site/avatar.ashx?id=' + element.UserId;
                        correctAvatar(element.imageUser).then(function (link) {
                            if (!link) element.imageUser = 'https://via.placeholder.com/80x80'
                        });
                    });
                    $scope.commentList = result.data;



                }, function (error) {
                    console.log(error)
                })
            }
            else {
                $http.get(requestString, {
                }).then(function (result) {
                    console.log(result)
                    commentList = result.data;
                    commentList.forEach(element => {
                        element.imageUser = 'http://site.the-v.net/Widgets_Site/avatar.ashx?id=' + element.UserId;
                        correctAvatar(element.imageUser).then(function (link) {
                            if (!link) element.imageUser = 'https://via.placeholder.com/80x80'

                        });
                    });


                    $scope.commentList = result.data;



                }, function (error) {
                    console.log(error)
                })
            }

        }


        $scope.addLikes = function (e) {

            e.preventDefault();

            requestString = [API.THEV, 'Video/like', VID_ID, $sessionStorage.AUD].filter(Boolean).join('/')

            if ($sessionStorage.USER_TOKEN) {
                $http.get(requestString, {
                    headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
                }).then(function (result) {
                    jQuery('#mdlVideoLiked').modal('show')
                }, function (error) {
                    console.log(error)
                })
            }
            else {
                $http.get(requestString, {
                }).then(function (result) {
                    jQuery('#mdlVideoLiked').modal('show')
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

            srvc_loadVid.loadRelatedVideos(VID_ID, 8, 1).then(function (result) {
                console.log(result)
                $scope.relatedVideos = result.data;

            }, function (error) {
                console.log(error)
            })


        }

        function getDetails() {

            requestString = [API.THEV, 'Video', VID_ID, $sessionStorage.AUD].filter(Boolean).join('/')
            console.log(requestString)
            if ($sessionStorage.USER_TOKEN) {
                $http.get(requestString, {
                    headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
                }).then(function (result) {
                    console.log(result)
                    $scope.currentVideo = result.data[0];
                    $scope.isSubscribed = ($scope.currentVideo.tags.indexOf('Premium Video') !== -1)
                    $scope.safeUrl = $sce.trustAsResourceUrl(`http://players.brightcove.net/3745659807001/4JJdlFXsg_default/index.html?videoId=${VID_ID}`)
                }, function (error) {
                    console.log(error)
                })
            }
            else {
                $http.get(requestString, {
                }).then(function (result) {
                    console.log(result)
                    $scope.currentVideo = result.data[0];
                    $scope.isSubscribed = ($scope.currentVideo.tags.indexOf('Premium Video') !== -1)
                    $scope.safeUrl = $sce.trustAsResourceUrl(`http://players.brightcove.net/3745659807001/4JJdlFXsg_default/index.html?videoId=${VID_ID}`)
                }, function (error) {
                    console.log(error)
                })
            }




        }

        function correctAvatar(src) {
            var deferred = $q.defer();

            var image = new Image()
            image.onerror = function () {
                deferred.resolve(false)
            }
            image.onload = function () {
                deferred.resolve(true);
            };
            image.src = src;

            return deferred.promise;
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
                element.on('error', function () {
                    element.attrs
                })
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