angular.module('vtAppCtrlHeaderOut', ['ngStorage', 'vtAppConstants', 'vtChannelService',
    'vtPlayVidService', 'vtLoadVideosService'])

    .controller("ctrl_HeaderMenu", function ($scope, $rootScope, $localStorage, $sessionStorage, API,
        $http, srvc_channel, srvc_playVid, srvc_loadVid) {

        $scope.$watch(function () { return $localStorage.IS_LOGGED; }, function (newVal, oldVal) {
            $scope.isLogged = newVal;
            $scope.userData = $localStorage.USER_DATA;

            if (newVal) {
                srvc_channel.getFollowing();
                srvc_playVid.loadPlaylist();
                getDisplays()
            }
        });

        $rootScope.chosenLang = '';
        if ($sessionStorage.DISPLAY_LANG) $rootScope.displayLang = $sessionStorage.DISPLAY_LANG
        else $rootScope.displayLang = 'English'

        if ($sessionStorage.AUD == undefined && $sessionStorage.USER_TOKEN == undefined) {
            $localStorage.IS_LOGGED = false;
            var paramToken = new URLSearchParams(window.location.search)
            if (paramToken.has('token') && paramToken.has('aud')) {
                $sessionStorage.USER_TOKEN = paramToken.get('token')
                $sessionStorage.AUD = paramToken.get('aud')
                getUserDetails()
                //  $localStorage.IS_LOGGED = true;
            }
        }

        $scope.isLogged = $localStorage.IS_LOGGED;
        $scope.userData = $localStorage.USER_DATA;
        $scope.searchWord = {};
        $scope.languageList = {};
        videosSection = [
            { category: 'Latest', content: [] },
            { category: 'Recommended', content: [] },
            { category: 'Viewed', content: [] },
            { category: 'Latest', content: [] }, //hot
            { category: 'Viewed', content: [] } //high rated
        ]

        premiumSection = [
            { category: 'Latest', content: [] },
            { category: 'Recommended', content: [] },
            { category: 'Viewed', content: [] },
            { category: 'Latest', content: [] }, //hot
            { category: 'Viewed', content: [] } //high rated
        ]

        categoriesSection = [
            { category: 'Messages', content: [] },
            { category: 'Personal Development', content: [] },
            { category: 'Entertainment', content: [] },
            { category: 'Business Methods', content: [] },
            { category: 'Infographics', content: [] }
        ]

        channelsSection = [
            { category: 'Latest', content: [] },
            { category: 'All', content: [] },
            { category: 'Viewed', content: [] },
            { category: 'User', content: [] }
        ]

        $scope.displayVideos = {};
        $scope.displayPremium = {};
        $scope.displayCategories = {};
        $scope.displayChannels = {};


        $scope.logout = function (e) {

            e.preventDefault();
            $localStorage.$reset();
            $sessionStorage.$reset();
            $scope.isLogged = false;
            window.location.href = '/home';
            // $state.go('^.login')
            console.log("hello")
        }

        $scope.isSearchEmpty = function () {
            return ($scope.searchWord.keyword == '' || $scope.searchWord.keyword == undefined)
        }


        $scope.toSignUp = function (e) {
            e.preventDefault();
            window.location.href = '/signup'

        }

        $scope.changeLanguage = function (lang, displayLang) {
            $sessionStorage.DISPLAY_LANG = displayLang;
            chosenLang = lang;
            if (chosenLang == 'en') chosenLang = ''
            $sessionStorage.CHOSEN_LANG = lang;
            var checkLang = window.location.pathname.substring(0, 4)

            if ((checkLang.match(/\//g) || []).length == 2) {
                if (chosenLang == '') window.location.pathname = window.location.pathname.replace(checkLang, '/')
                else window.location.pathname = window.location.pathname.replace(checkLang, '/' + chosenLang + '/')
            }
            else {
                window.location.pathname = chosenLang + window.location.pathname;
            }
        }

        $scope.navigate = function (path) {
            chosenLang = $sessionStorage.CHOSEN_LANG
            if (chosenLang == 'en') chosenLang = ''

            newPath = [chosenLang, path].filter(Boolean).join('/')
            newPath = newPath.toString();
            window.location.pathname = newPath;

        }

        $scope.changeDisplayVideo = function (category) {

        }

        function getUserDetails() {
            var aud = $sessionStorage.AUD
            var authToken = $sessionStorage.USER_TOKEN

            requestString = [API.THEV, 'User/data', aud].filter(Boolean).join('/')
            console.log(requestString)
            $http.get(requestString, {
                headers: { 'Authorization': 'Bearer ' + authToken }
            }).then(function (result) {
                $localStorage.USER_DATA = result.data[0]
                $localStorage.IS_LOGGED = true;
                window.location.href = '/home';
            }, function (error) {
                console.log(error)
            })


        }

        function getLanguages() {
            console.log()

            requestString = [API.THEV, 'site/language'].filter(Boolean).join('/')

            $http.get(requestString, {

            }).then(function (result) {
                $scope.languageList = result.data;
            }, function (error) {
                console.log(error)
            })
        }

        function getDisplays() {
            videosSection.forEach(element => {
                srvc_loadVid.loadVideo(element.category, 6, 1).then(function (result) {
                    element.content = result.data;
                })
            })

            categoriesSection.forEach(element => {
                if (element.category != 'Infographics') {
                    srvc_loadVid.loadCategoryVideo(element.category, 9, 1).then(function (result) {
                        element.content = result.data
                    }, function (error) {
                        console.log(error)
                    })
                }
                else {
                    srvc_loadVid.loadVideoByTag(element.category, 9, 1).then(function (result) {
                        element.content = result.data
                    }, function (error) {
                        console.log(error)
                    })

                }
            })

            channelsSection.forEach(element => {
                if (element.category != 'User') {
                    srvc_channel.loadChannels(element.category, 6, 1).then(function (result) {
                        element.content = result.data
                    }, function (error) {
                        console.log(error)
                    })
                }
                else {
                    element.content = $localStorage.FOLLOWED_CHANNELS;
                }
            })
        }



        if (Object.keys($scope.languageList).length == 0) getLanguages()

    })
