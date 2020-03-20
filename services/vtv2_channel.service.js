var app = angular.module('vtChannelService', ['vtAppConstants'])

app.factory('srvc_channel', function ($localStorage, $sessionStorage, $http, API) {
    isLogged = $localStorage.IS_LOGGED
    var currentLang = $localStorage.CHOSEN_LANG
    if (!currentLang) currentLang = 'en'

    var aud = $sessionStorage.AUD
    var authToken = $sessionStorage.USER_TOKEN


    return {
        'getDetailsOf': function (id) {

            requestString = [API.THEV, 'Channel', id].filter(Boolean).join('/')
            return $http.get(requestString, {
            })

        },

        'getChannelVideos': function (count, channelName, page) {

            requestString = [API.THEV, 'Channel/video/list', channelName, page, count, aud].filter(Boolean).join('/')
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

        'follow': function (id, e) {
            e.preventDefault();
            userId = $localStorage.USER_DATA.id;

            console.log(id)
            var encodedString = 'action=' + encodeURIComponent('DDrupal_Channel_FollowChannel') + "&id="
                + encodeURIComponent(id) + "&userid="
                + encodeURIComponent(userId);

            return $http({
                method: 'POST',
                url: API.URL,
                data: encodedString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) {
                modalRequestSent.modal('show')
                getFollowing();
            }, function (error) {
                console.log(error)
            })
        },

        'unfollow': function (id) {

            userId = $localStorage.USER_DATA.id;

            var encodedString = 'action=' + encodeURIComponent('DDrupal_Channel_UnfollowChannel') + "&id="
                + encodeURIComponent(id) + "&userid="
                + encodeURIComponent(userId);

            return $http({
                method: 'POST',
                url: API.URL,
                data: encodedString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) {
                if (result.data[0].Data == 'True') {
                    modalUnfollowed.modal('show')
                    getFollowing();
                }
            }, function (error) {
                console.log(error)
            })

        },

        'addComments': function (title, comment) {
            userId = $localStorage.USER_DATA.id;

            requestString = [API.THEV, 'Channel/comment', title, aud].filter(Boolean).join('/')
            console.log(requestString)

            return $http.get(requestString, {
            })

        },

        'loadComments': function (id) {
            requestString = [API.THEV, 'Channel/comment/list', id, aud].filter(Boolean).join('/')
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

        'loadChannels': function (channelType, count, page) {
            toBeLoaded = checkChannelType(channelType)

            requestString = [API.THEV, 'Channel', toBeLoaded, page, count].filter(Boolean).join('/')
            console.log(requestString)
            return $http.get(requestString, {
            })

        },



        'getFollowing': function () {
            getFollowing()
        }

    }

    function getFollowing() {
        userId = $localStorage.USER_DATA.id;

        var encodedString = 'action=' + encodeURIComponent('DDrupal_UserFollowing') + "&id="
            + encodeURIComponent(userId);
        $http({
            method: 'POST',
            url: API.URL,
            data: encodedString,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (result) {
            console.log(result)
            $localStorage.FOLLOWED_CHANNELS = result.data;
            $localStorage.FOLLOWED_CHANNELS.forEach(element => {
                element.image = 'http://site.the-v.net' + element.image
                element.image = element.image.replace('&amp;', '&')
            })
        }, function (error) {
            console.log(error)
        })


    }

    function checkChannelType(type) {
        switch (type) {
            case 'Latest':
                return '';
                break;
            case 'All':
                return ''
                break;
            case 'Recommended':
                return 'Recommend';
                break;
            case 'Viewed':
                return 'view';
                break;

        }
    }

})