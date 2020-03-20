var app = angular.module('vtLoadVideosService', ['vtAppConstants'])

app.factory('srvc_loadVid', function ($localStorage, $sessionStorage, $http, API) {
    isLogged = $localStorage.IS_LOGGED
    var currentLang = $localStorage.CHOSEN_LANG
    if (!currentLang) currentLang = 'en'

    var aud = $sessionStorage.AUD
    var authToken = $sessionStorage.USER_TOKEN

    //category/{category}/{language}/{page}/{count}

    // view/{language}/{page}/{count}

    // related/{vidid}/{language}/{page}/{count}

    return {
        'loadVideo': function (videoType, count, page) {
            toBeLoaded = checkVideoType(videoType)

            requestString = [API.THEV, 'Video', toBeLoaded, currentLang, page, count, aud].filter(Boolean).join('/')
            console.log(requestString)
            if (authToken) {
                return $http.get(requestString, {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                })
            }
            else {
                return $http.get(requestString, {
                })
            }

        },

        'loadRelatedVideos': function (id, count, page) {
            requestString = [API.THEV, 'Video/related', id, currentLang, page, count, aud].filter(Boolean).join('/')

            if (authToken) {
                return $http.get(requestString, {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                })
            }
            else {
                return $http.get(requestString, {
                })
            }
        },

        'loadCategoryVideo': function (category, count, page) {


            requestString = [API.THEV, 'Video/category', category, currentLang, page, count, aud].filter(Boolean).join('/')

            if (authToken) {
                return $http.get(requestString, {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                })
            }
            else {
                return $http.get(requestString, {
                })
            }
        },

        'loadVideoByTag': function (tag, page, count) {

            requestString = [API.THEV, 'Video/tag', tag, currentLang, page, count, aud].filter(Boolean).join('/')

            if (authToken) {
                return $http.get(requestString, {
                    headers: { 'Authorization': 'Bearer ' + authToken }
                })
            }
            else {
                return $http.get(requestString, {
                })
            }

        }

    }

    function checkVideoType(type) {
        switch (type) {
            case 'Latest':
                return '';
                break;
            case 'Premium':
                return 'Premium';
                break;
            case 'Recommended':
                return 'highlight';
                break;
            case 'Viewed':
                return 'view';
                break;

        }
    }

})