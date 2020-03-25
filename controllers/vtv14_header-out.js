angular.module('vtAppCtrlHeaderOut', ['ngStorage', 'vtAppConstants', 'vtChannelService', 'vtPlayVidService'])

    .controller("ctrl_HeaderMenu", function ($scope, $rootScope, $localStorage, $sessionStorage, API,
        $http, srvc_channel, srvc_playVid) {

        $scope.$watch(function () { return $localStorage.IS_LOGGED; }, function (newVal, oldVal) {
            $scope.isLogged = newVal;
            $scope.userData = $localStorage.USER_DATA;
            srvc_playVid.loadPlaylist();
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

            // srvc_channel.getFollowing();
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

        if (Object.keys($scope.languageList).length == 0) getLanguages()

    })
