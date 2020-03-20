angular.module('vtAppCtrlLogin', ['ngStorage', 'vtDetailsService', 'vtAppConstants', 'vtPlayVidService', 'vtChannelService'])

    .controller("ctrl_login", function ($scope, $http, $localStorage, API, srvc_getDetails, srvc_playVid, srvc_channel) {

        $scope.user = {
            name: '',
            password: ''
        }

        $scope.login = function (e) {
            e.preventDefault();

            var encodedString = 'action=' + encodeURIComponent('checklogin') + "&email="
                + encodeURIComponent($scope.user.name) + "&password="
                + encodeURIComponent($scope.user.password);

            $http({
                method: 'POST',
                url: API.URL,
                data: encodedString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(
                function (result) {
                    console.log(result)
                    getUserDetails(result.data[0].Data);

                }, function (error) {
                    console.log(error)
                })
        }

        function getUserDetails(id) {
            srvc_getDetails.getDetails('User', id).then(function (result) {
                if (result.data.length > 0) {
                    $localStorage.USER_DATA = result.data[0];

                    srvc_playVid.loadPlaylist();
                    srvc_channel.getFollowing();
                    $localStorage.IS_LOGGED = true;
                    window.location.href = 'home'

                } else {
                    window.alert("Login Error")
                    null;
                }
            }, function (error) {
                console.log(error)
            })

            srvc_getDetails.getDetails('User_Channel', id).then(function (result) {
                console.log(result)
                if (result.data.length > 0) {
                    $localStorage.USER_CHANNEL = result.data[0];
                } else {
                    $localStorage.USER_CHANNEL = null;
                }
            }, function (error) {
                console.log(error)
            })
        }
    })