var app = angular.module('vtDetailsService', ['vtAppConstants'])

app.factory('srvc_getDetails', function ($localStorage, $http, API) {

    return {
        'getDetails': function (type, name) {
            toBeLoaded = checkDetailType(type)

            var encodedString = 'action=' + encodeURIComponent(toBeLoaded) + "&name="
                + encodeURIComponent(name);
            return $http({
                method: 'POST',
                url: API.URL,
                data: encodedString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
        },

    }

    function checkDetailType(type) {
        switch (type) {
            case 'Video':
                return 'Video_GetDetails';
                break;
            case 'Channel':
                return 'Channel_GetDetails'
                break;
            case 'User':
                return 'DDrupal_User_GetLoggedInUserData';
                break;
            case 'User_Channel':
                return 'DDrupal_UserChannel';
                break;
            case 'User_Videos':
                return 'DDrupal_UserMyVideos';
                break;

        }
    }

})