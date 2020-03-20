angular.module('vtAppCtrlHeaderOut', ['ngStorage'])

    .controller("ctrl_HeaderMenu", function ($scope, $rootScope, $localStorage, $sessionStorage) {

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
            if(paramToken.has('token') && paramToken.has('aud')){
                $sessionStorage.USER_TOKEN = paramToken.get('token')
                $sessionStorage.AUD = paramToken.get('aud')
                $localStorage.IS_LOGGED = true;
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
            console.log(lang)
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

        // $scope.search = function (e) {
        //     e.preventDefault();
        //     $localStorage.KEYWORD = $scope.searchWord.keyword;

        //     // window.location.href = '/search?keyword=' + $scope.searchKeyword;
        //     if ($scope.searchWord.keyword == "" ||
        //         $scope.searchWord.keyword == undefined)
        //         window.alert("Search Empty")
        //     else
        //         window.location.href = '/search?keyword=' + $scope.searchWord.keyword;
        // }

        // $scope.goToVids = function () {
        //     $state.go('^.videos')

        //     console.log("hello")
        // }


        // $scope.goToCats = function () {
        //     $state.go('^.categories')

        //     console.log("hello")
        // }


        // $scope.goToHome = function () {
        //     $state.go('^.defaultHome')

        //     console.log("hello")
        // }


        // $scope.goToChannel = function () {
        //     $state.go('^.channels')

        //     console.log("hello")
        // }
    })
    // .run(function ($rootScope, $location, $localStorage) {

    //     $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl, newState, oldState) {
    //         console.log(newUrl)
    //         console.log(oldUrl)
    //         console.log($rootScope.hasChanged)

    //         //newUrl != oldUrl
    //         if ($rootScope.hasChanged != newUrl) {
    //             var chosenLang = $localStorage.CHOSEN_LANG
    //             if (!chosenLang) chosenLang = ''
    //             var changeUrl = new URL(newUrl)
    //             var checkLang = changeUrl.pathname.substring(0, 4)

    //             if ((checkLang.match(/\//g) || []).length == 2) {
    //                 event.preventDefault();
    //                 if (chosenLang == '') window.location.pathname = changeUrl.pathname.replace(checkLang, '/')
    //                 else window.location.pathname = changeUrl.pathname.replace(checkLang, '/' + chosenLang + '/')

    //             }
    //         }

    //     })

    // });