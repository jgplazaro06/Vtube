angular.module('vtAppCtrlHeaderOut', ['ngStorage', 'vtAppConstants', 'vtChannelService',
    'vtPlayVidService', 'vtLoadVideosService'])

    .controller("ctrl_HeaderMenu", function ($scope, $rootScope, $localStorage, $sessionStorage, API,
        $http, srvc_channel, srvc_playVid, srvc_loadVid) {

        $scope.$watch(function () { return $localStorage.IS_LOGGED; }, function (newVal, oldVal) {
            $scope.isLogged = newVal;
            $scope.userData = $localStorage.USER_DATA;

            var paramToken = new URLSearchParams(window.location.search)
            if (!paramToken.has('token') && !paramToken.has('aud') && !sessionStorage.NEW_LOGGED) {
                getDisplays();
                if ($localStorage.FOLLOWED_CHANNELS == undefined && $scope.isLogged) srvc_channel.getFollowing();
                if ($localStorage.PLAYLIST == undefined && $scope.isLogged) srvc_playVid.loadPlaylist();
                if ($localStorage.FOLLOWED_CHANNELS) getUserFollowed();
                $sessionStorage.NEW_LOGGED = true;
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

        $scope.checkVideoPrivacy = srvc_playVid.checkVideoPrivacy;

        $scope.isLogged = $localStorage.IS_LOGGED;
        $scope.userData = $localStorage.USER_DATA;
        $scope.searchWord = {};
        $scope.languageList = {};

        $scope.displayVideoLabel = "Recently Added Videos";
        $scope.displayPremiumLabel = "Recently Added Videos";
        $scope.displayCategoriesLabel = "Messages Videos";
        $scope.displayChannelsLabel = "All Channels";

        $scope.currentVideo = "Latest"
        $scope.currentPremium = "Latest"
        $scope.currentCategory = "Messages"
        $scope.currentChannel = "Latest"

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
            window.location.href = newPath;

        }

        $scope.changeDisplaySection = function (section, category, label) {
            displaySection = [];

            switch (section) {
                case 'Video':
                    $scope.currentVideo = category

                    displaySection = $sessionStorage.videosSection.filter(function (row) {
                        return (row.category.indexOf(category) !== -1)
                    })
                    $scope.displayVideos = displaySection[0].content;
                    $scope.displayVideoLabel = label;
                    break;
                case 'Premium':
                    $scope.currentPremium = category

                    displaySection = $sessionStorage.premiumSection.filter(function (row) {
                        return (row.category.indexOf(category) !== -1)
                    })
                    $scope.displayPremium = displaySection[0].content;
                    $scope.displayPremiumLabel = label;
                    break;
                case 'Category':
                    $scope.currentCategory = category;
                    displaySection = $sessionStorage.categoriesSection.filter(function (row) {
                        return (row.category.indexOf(category) !== -1)
                    })
                    $scope.displayCategories = displaySection[0].content;
                    $scope.displayCategoriesLabel = label + ' Videos';
                    break;
                case 'Channel':
                    $scope.currentChannel = category
                    displaySection = $sessionStorage.channelsSection.filter(function (row) {
                        return (row.category.indexOf(category) !== -1)
                    })
                    $scope.displayChannels = displaySection[0].content;
                    $scope.displayChannelsLabel = label;
                    break;
            }

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
            requestString = [API.THEV, 'site/language'].filter(Boolean).join('/')

            $http.get(requestString, {

            }).then(function (result) {
                $scope.languageList = result.data;
            }, function (error) {
                console.log(error)
            })
        }

        function reloadDropdowns() {
            $scope.displayVideos = $sessionStorage.videosSection[0].content;
            $scope.displayPremium = $sessionStorage.premiumSection[0].content;
            $scope.displayCategories = $sessionStorage.categoriesSection[0].content;
            $scope.displayChannels = $sessionStorage.channelsSection[0].content;
        }

        function getDisplays() {

            $sessionStorage.videosSection = [
                { category: 'Latest', content: [] },
                { category: 'Recommended', content: [] },
                { category: 'Viewed', content: [] },
                { category: 'Hot', content: [] }, //hot
                { category: 'Rate', content: [] } //high rated
            ]

            $sessionStorage.premiumSection = [
                { category: 'Premium', content: [] },
                { category: 'Premium_Rec', content: [] },
                { category: 'Premium_View', content: [] },
                { category: 'Premium_Hot', content: [] }, //hot
                { category: 'Premium_Rate', content: [] } //high rated
            ]

            $sessionStorage.categoriesSection = [
                { category: 'Messages', content: [] },
                { category: 'Personal Development', content: [] },
                { category: 'Entertainment', content: [] },
                { category: 'Business Methods', content: [] },
                { category: 'Infographics', content: [] }
            ]

            $sessionStorage.channelsSection = [
                { category: 'Latest', content: [] },
                { category: 'Recommended', content: [] },
                { category: 'Viewed', content: [] },
                { category: 'User', content: [] }
            ]

            $scope.displayVideos = {};
            $scope.displayPremium = {};
            $scope.displayCategories = {};
            $scope.displayChannels = {};

            $sessionStorage.videosSection.forEach(element => {
                srvc_loadVid.loadVideo(element.category, 6, 1).then(function (result) {
                    element.content = result.data;
                    if (element.category == 'Latest') $scope.displayVideos = result.data
                })
            })

            $sessionStorage.premiumSection.forEach(element => {
                srvc_loadVid.loadVideo(element.category, 6, 1).then(function (result) {
                    element.content = result.data;
                    if (element.category == 'Premium') $scope.displayPremium = result.data
                })
            })

            $sessionStorage.categoriesSection.forEach(element => {
                if (element.category != 'Infographics') {
                    srvc_loadVid.loadCategoryVideo(element.category, 9, 1).then(function (result) {
                        element.content = result.data
                        if (element.category == 'Messages') $scope.displayCategories = result.data


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

            $sessionStorage.channelsSection.forEach(element => {
                if (element.category != 'User') {
                    srvc_channel.loadChannels(element.category, 6, 1).then(function (result) {
                        element.content = result.data
                        if (element.category == 'Latest') $scope.displayChannels = result.data

                    }, function (error) {
                        console.log(error)
                    })
                }
            })

        }

        function getUserFollowed() {

            userFollowed = $localStorage.FOLLOWED_CHANNELS;
            userFollowed = userFollowed.splice(0, 5)
            userFollowed.forEach(row => {
                srvc_channel.getDetailsOf(row.channel_id).then(function (result) {
                    correctImageLink(result.data)
                    $sessionStorage.channelsSection[3].content = $sessionStorage.channelsSection[3].content.concat(result.data)

                }, function (error) {
                    console.log(error)
                })
            })

        }

        function correctImageLink(channelArray) {
            channelArray.forEach(element => {
                element.image = 'http://site.the-v.net' + element.image
                element.image = element.image.replace('&amp;', '&')

                element.thumbnail = element.image;
                if (element.thumbnail) if (((element.thumbnail).substring(0, 7) == "/Widget")) element.thumbnail = "";
            })
        }


        if (Object.keys($scope.languageList).length == 0) getLanguages()
        if ($sessionStorage.channelsSection) reloadDropdowns()

    })
