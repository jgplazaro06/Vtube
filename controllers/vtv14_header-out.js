angular.module('vtAppCtrlHeaderOut', ['ngStorage', 'vtAppConstants', 'vtAppCtrlChannel'])

    .controller("ctrl_HeaderMenu", function ($scope, $rootScope, $localStorage, $sessionStorage, API, $http, srvc_channel) {

        $scope.$watch(function () { return $localStorage.IS_LOGGED; }, function (newVal, oldVal) {
            $scope.isLogged = newVal;
            $scope.userData = $localStorage.USER_DATA;
        });

        $rootScope.aud = $sessionStorage.AUD
        $rootScope.token = $sessionStorage.USER_TOKEN
        $rootScope.chosenLang = '';
        $rootScope.displayLang = 'ENGLISH'

        console.log($rootScope.aud)
        console.log($rootScope.token)

        if ($rootScope.aud == undefined && $rootScope.token == undefined) {
            var paramToken = new URLSearchParams(window.location.search)
            if (paramToken.has('token') && paramToken.has('aud')) {
                $sessionStorage.USER_TOKEN = paramToken.get('token')
                $sessionStorage.AUD = paramToken.get('aud')
                getUserDetails()
                window.location.href = '/home';
                //  $localStorage.IS_LOGGED = true;
            }
        }

        $scope.isLogged = $localStorage.IS_LOGGED;
        $scope.userData = $localStorage.USER_DATA;
        $scope.searchWord = {};
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
            $rootScope.displayLang = displayLang;
            chosenLang = lang;
            $localStorage.CHOSEN_LANG = lang;
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

            }, function (error) {
                console.log(error)
            })

            srvc_channel.getFollowing();
        }


    })
