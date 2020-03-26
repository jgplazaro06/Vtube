var app = angular.module('vtLoadVideosService', ['vtAppConstants'])

app.factory('srvc_loadVid', function ($localStorage, $sessionStorage, $http, API) {
    var $ = jQuery;
    return {
        'loadVideo': function (videoType, count, page) {
            toBeLoaded = checkVideoType(videoType)

            var currentLang = $sessionStorage.CHOSEN_LANG
            if (!currentLang) currentLang = 'en'

            requestString = [API.THEV, 'Video', toBeLoaded, currentLang, page, count, $sessionStorage.AUD].filter(Boolean).join('/')
            console.log(requestString)
            if ($sessionStorage.USER_TOKEN) {
                return $http.get(requestString, {
                    headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
                })
            }
            else {
                return $http.get(requestString, {
                })
            }

        },

        'loadRelatedVideos': function (id, count, page) {
            var currentLang = $sessionStorage.CHOSEN_LANG
            if (!currentLang) currentLang = 'en'

            requestString = [API.THEV, 'Video/related', id, currentLang, page, count, $sessionStorage.AUD].filter(Boolean).join('/')

            if ($sessionStorage.USER_TOKEN) {
                return $http.get(requestString, {
                    headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
                })
            }
            else {
                return $http.get(requestString, {
                })
            }
        },

        'loadCategoryVideo': function (category, count, page) {

            var currentLang = $sessionStorage.CHOSEN_LANG
            if (!currentLang) currentLang = 'en'

            requestString = [API.THEV, 'Video/category', category, currentLang, page, count, $sessionStorage.AUD].filter(Boolean).join('/')

            if ($sessionStorage.USER_TOKEN) {
                return $http.get(requestString, {
                    headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
                })
            }
            else {
                return $http.get(requestString, {
                })
            }
        },

        'loadVideoByTag': function (tag, count, page) {

            var currentLang = $sessionStorage.CHOSEN_LANG
            if (!currentLang) currentLang = 'en'

            requestString = [API.THEV, 'Video/tag', tag, currentLang, page, count, $sessionStorage.AUD].filter(Boolean).join('/')

            if ($sessionStorage.USER_TOKEN) {
                return $http.get(requestString, {
                    headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
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