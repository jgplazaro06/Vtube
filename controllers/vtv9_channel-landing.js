angular.module('vtAppCtrlChannelLanding', ['vtPlayVidService', 'vtDetailsService',
    'ngStorage', 'vtAppConstants', 'vtChannelService'])
    .controller("ctrl_channelLanding", function ($scope, $http, $localStorage, $sessionStorage,
        srvc_playVid, srvc_getDetails, srvc_channel, API) {


        var getParam = new URLSearchParams(window.location.search)
        // console.log(getParam)
        // console.log(getParam.get('channel'))
        channelId = getParam.get('channel')
        // channelId = 872;

        $scope.isLogged = $localStorage.IS_LOGGED;
        $scope.userComment = '';
        $scope.playVid = srvc_playVid.playVid;
        $scope.checkVideoPrivacy = srvc_playVid.checkVideoPrivacy;

        $scope.addToPlaylist = srvc_playVid.addToPlaylist

        $scope.follow = srvc_channel.follow;
        $scope.unfollow = srvc_channel.unfollow;

        userData = $localStorage.USER_DATA;
        // channelId = $localStorage.CHANNEL_ID;
        $scope.canViewMore = true;
        isLogged = $localStorage.IS_LOGGED
        var currentLang = $localStorage.CHOSEN_LANG
        if (!currentLang) currentLang = 'en'

        var aud = $sessionStorage.AUD
        var authToken = $sessionStorage.USER_TOKEN

        channelVideos = [];
        channelVideoCount = 0;

        $scope.isFollowing = function (id) {
            check = (row) => row.id === id
            $scope.isFollowed = $localStorage.FOLLOWED_CHANNELS.some(check)
            return $scope.isFollowed;
        }

        $scope.submitComment = function (e) {
            e.preventDefault();


            console.log($scope.userComment)

            e.preventDefault();
            if (!$scope.isLogged) {
                jQuery('#loginRequiredModal').modal('show')

            }
            else {
                srvc_channel.addComments(channelId, $scope.userComment).then(function (result) {
                    $scope.userComment = '';
                    loadComments()

                }, function (error) {
                    console.log(error)
                })
            }
        }

        function loadComments() {
            srvc_channel.loadComments(channelId).then(function (result) {
                commentList = result.data;
                commentList.forEach(element => {
                    element.imageUser = 'http://site.the-v.net/Widgets_Site/avatar.ashx?id=' + element.UserId;
                });
                $scope.commentList = commentList;
            }, function (error) {
                console.log(error)
            })
        }

        $scope.loadChannelVideos = function (count, e) {
            if (e !== undefined) e.preventDefault();
            channelVideoCount += 1;

            requestString = [API.THEV, 'Channel/video/list', channelId, channelVideoCount, count, aud].filter(Boolean).join('/')

            if (authToken) {
                $http.get(requestString, {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                }).then(function (result) {
                    if (result.data.length === 0) $scope.canViewMore = false;
                    channelVideos = channelVideos.concat(result.data)
                    $scope.channelVideos = channelVideos;
                }, function (error) {
                    console.log(error)
                })
            }
            else {
                $http.get(requestString, {
                }).then(function (result) {
                    if (result.data.length === 0) $scope.canViewMore = false;
                    channelVideos = channelVideos.concat(result.data)
                    $scope.channelVideos = channelVideos;
                }, function (error) {
                    console.log(error)
                })
            }

        }

        srvc_getDetails.getDetails('Channel', channelId).then(function (result) {
            $scope.currentChannel = result.data[0];
        }, function (error) {
            console.log(error)
        })

        loadComments()
        $scope.loadChannelVideos(6);

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
                        console.log(result)

                        // console.log("succsess")
                    }, function (error) {
                        console.log(error)
                        if (error.data == null) element.attr('srcset', ngSrc)
                        else element.attr('srcset', "https://via.placeholder.com/80x80"); // set default image
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