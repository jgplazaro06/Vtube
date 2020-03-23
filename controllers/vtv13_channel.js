angular.module('vtAppCtrlChannel', ['ngStorage', 'vtPlayVidService', 'vtChannelCarouselService',
    'vtChannelService', 'vtAppConstants'])


    .controller("ctrl_channel", function ($scope, $http, $localStorage, srvc_channel, API) {

        $scope.$watch(function () { return $localStorage.FOLLOWED_CHANNELS; }, function () {
            followedChannels = $localStorage.FOLLOWED_CHANNELS
            // getFollowing()
        });
        // http://site.the-v.net
        $scope.isLogged = $localStorage.IS_LOGGED;
        userData = $localStorage.USER_DATA;

        $scope.follow = srvc_channel.follow;
        $scope.unfollow = srvc_channel.unfollow;
        $scope.canViewMoreLatest = true;
        $scope.canViewMoreRecom = true;
        $scope.canViewMoreViews = true;
        $scope.canViewMoreAll = true;


        var latestChannels = [];
        var recommendedChannels = [];
        var byViewsChannels = [];
        var allChannels = [];
        var followedChannels = [];

        numLatestChannels = 0;
        numRecoChannels = 0;
        numByViewsChannels = 0;
        numAllChannels = 0;


        $scope.defaultView = true;
        $scope.elementId = '';

        $scope.sectionChannels = [
            filterLatest = false,
            filterRecommended = false,
            filterByViews = false
        ]
        $scope.isFollowing = function (id) {
            check = (row) => row.id === id
            $scope.isFollowed = followedChannels.some(check)
            return $scope.isFollowed;
        }

        //load

        $scope.changeView = function (e) {
            e.preventDefault();
            $scope.defaultView = (!$scope.defaultView);
        }

        $scope.loadLatest = function (count, e) {
            if (e !== undefined) e.preventDefault();

            numLatestChannels += 1;

            srvc_channel.loadChannels('Latest', count, numLatestChannels).then(function (result) {
                if (result.data.length === 0) {
                    $scope.canViewMoreLatest = false;
                }
                latestChannels = latestChannels.concat(result.data);
                correctImageLink(latestChannels)

                $scope.latestChannels = latestChannels;
            })

        }

        $scope.loadRecommended = function (count, e) {
            if (e !== undefined) e.preventDefault();

            numRecoChannels += 1;

            srvc_channel.loadChannels('Recommended', count, numRecoChannels).then(function (result) {
                if (result.data.length === 0) {
                    $scope.canViewMoreRecom = false;
                }
                recommendedChannels = recommendedChannels.concat(result.data);
                correctImageLink(recommendedChannels)

                $scope.recommendedChannels = recommendedChannels;

            }, function (error) {
                console.log(error)
            })
        }

        $scope.loadByViews = function (count, e) {
            if (e !== undefined) e.preventDefault();

            numByViewsChannels += 1;

            srvc_channel.loadChannels('Viewed', count, numByViewsChannels).then(function (result) {
                if (result.data.length === 0) {
                    $scope.canViewMoreViews = false;
                }
                byViewsChannels = byViewsChannels.concat(result.data);
                correctImageLink(byViewsChannels)
                $scope.byViewsChannels = byViewsChannels;

            }, function (error) {
                console.log(error)
            })
        }

        $scope.loadAllChannels = function (count, e) {
            if (e !== undefined) e.preventDefault();

            numAllChannels += 1;


            srvc_channel.loadChannels('All', 8, numAllChannels).then(function (result) {
                allChannels = allChannels.concat(result.data);
                $scope.allChannels = allChannels;
            }, function (error) {
                console.log(error)
            })

        }


        $scope.getDetailsOf = function (id, e) {
            if (e !== undefined) e.preventDefault();

            srvc_channel.getDetailsOf(id)
                .then(function (result) {
                    // console.log(result)
                }, function (error) {
                    console.log(error)
                })

        }

        srvc_channel.loadChannels('Recommended', 4, 1).then(function (result) {
            index = 0;
            bannerChannels = result.data;
            console.log(bannerChannels.length)
            for (var i = 0; i < bannerChannels.length; i++) {
                if (Number(bannerChannels[i].channelUrl) < 30)
                    bannerChannels.splice(i, 1)
            }
            correctImageLink(bannerChannels);
            $scope.bannerChannels = bannerChannels;
        }, function (error) {
            console.log(error)
        })



        $scope.loadLatest(8);
        $scope.loadRecommended(8);
        $scope.loadByViews(8);
        $scope.loadAllChannels(8);

        // 

        function correctImageLink(channelArray) {
            channelArray.forEach(element => {
                element.image = 'http://site.the-v.net' + element.image
                element.image = element.image.replace('&amp;', '&')
                element.coverPhoto = 'http://site.the-v.net' + element.coverPhoto
                element.coverPhoto = element.coverPhoto.replace('&amp;', '&')
                if (element.thumbnail) if (((element.thumbnail).substring(0, 7) == "/Widget")) element.thumbnail = "";
            })
        }

    })



    .directive("ngCheckBanner", function (loadChannelCarousel, $timeout) {
        return function (scope, element, attrs) {
            if (scope.$last) {
                $timeout(function () {
                    loadChannelCarousel.init();
                }, 200)
                $timeout(function () {
                    angular.element(document.querySelector('#pVtbChannelCarouselLink1')).click()
                }, 200)

            }
        };
    })

    .directive("ngCheckCarousel", function (loadChannelCarousel, $timeout) {
        return function (scope, element, attrs) {
            if (scope.$last) {
                $timeout(function () {
                    loadChannelCarousel.initCarousel();
                }, 150)
            }
        };
    })
