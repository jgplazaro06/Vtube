var app = angular.module('vtChannelService', ['vtAppConstants'])

app.factory('srvc_channel', function ($localStorage, $sessionStorage, $http, API) {

    var $ = jQuery;

    return {
        'getDetailsOf': function (id) {

            requestString = [API.THEV, 'Channel', id].filter(Boolean).join('/')
            return $http.get(requestString, {
            })

        },

        'getChannelVideos': function (count, channelName, page) {

            requestString = [API.THEV, 'Channel/video/list', channelName, page, count, $sessionStorage.AUD].filter(Boolean).join('/')
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

        'follow': function (id, e) {
            requestString = [API.THEV, 'Dashboard/follow', id, $sessionStorage.AUD].filter(Boolean).join('/')
            return $http.post(requestString, '', {
                headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
            }).then(function (result) {
                jQuery('#mdlRequestSent').modal('show')
                getFollowing();
            }, function (error) {
                console.log(error)
            })
        },

        'unfollow': function (id) {

            requestString = [API.THEV, 'Dashboard/unfollow', id, $sessionStorage.AUD].filter(Boolean).join('/')
            return $http.post(requestString, '', {
                headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
            }).then(function (result) {
                jQuery('#mdlUnfollowed').modal('show')
                getFollowing();
            }, function (error) {
                console.log(error)
            })

        },

        'addComments': function (title, comment) {
            userId = $localStorage.USER_DATA.id;

            requestString = [API.THEV, 'Channel/comment', title, $sessionStorage.AUD].filter(Boolean).join('/')
            console.log(requestString)
            console.log(comment)
            return $http.get(requestString, {
                params: comment,
                headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
            })

        },

        'loadComments': function (id) {
            requestString = [API.THEV, 'Channel/comment/list', id, $sessionStorage.AUD].filter(Boolean).join('/')
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
        requestString = [API.THEV, 'dashboard/followchannel/list', $sessionStorage.AUD].filter(Boolean).join('/')

        $http.get(requestString, {
            headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
        }).then(function (result) {
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