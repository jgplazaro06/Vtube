var app = angular.module('vtPlayVidService', ['vtAppConstants'])

app.factory('srvc_playVid', function ($localStorage, $sessionStorage, $http, API) {

    return {

        'playVid': function (id, privacy, e) {
            isLogged = $localStorage.IS_LOGGED
            isPrivate = (privacy != 'public')
            e.preventDefault();

            if (!isPrivate) {
                $localStorage.VID_ID = id;
                window.location.href = 'index.html#!/now-playing?watch=' + id;
                // window.location.reload()
                // $state.go('^.now-playing')

            }
            else if (!isLogged && isPrivate) {
                loginRequiredModal.modal('show')
            }
            else if (isLogged && isPrivate) {
                if (checkUserSub()) {
                    $localStorage.VID_ID = id;
                    window.location.href = 'index.html#!/now-playing?watch=' + id;
                    // window.location.reload()
                    // $state.go('^.now-playing')

                }
                else {
                    loginSubscribedOnly.modal('show')
                }
            }

        },

        'checkVideoPrivacy': function (videoPrivacy, tags) {
            isLogged = $localStorage.IS_LOGGED

            isPrivate = (videoPrivacy != 'public')
            isPremium = (tags.indexOf('Premium Video') !== -1)

            //Non Logged = !isPrivate
            //logged Free = !isPrivate, isPrivate, !isPremium
            //logged subscribed = return true

            if (checkUserSub() || !isPrivate) {
                return true;
            }
            //user is Free || video is private 
            //
            else {
                if (isLogged) {
                    return true
                }
                else {
                    return false;
                }
            }

        },

        'addToPlaylist': function (id, e) {
            e.preventDefault();
            userId = $localStorage.USER_DATA.id;

            if ($localStorage.PLAYLIST == undefined) loadUserPlaylist();

            exist = false;

            for (var i = 0; i < $localStorage.PLAYLIST.length; i++) {
                if ($localStorage.PLAYLIST[i].videoId == id) {
                    exist = true
                    break;
                }
            }

            if (exist) {
                $localStorage.ID_TO_DELETE = id;
                jQuery('#mdlVtbAddedtoPlaylist').modal('show')
            }
            else {

                // requestString = [API.THEV, 'dashboard/playlist/list', $sessionStorage.AUD].filter(Boolean).join('/')

                // $http.get(requestString, {
                //     headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }


                requestString = [API.THEV, 'dashboard/playlist/add', id, $sessionStorage.AUD].filter(Boolean).join('/')

                $http.post(requestString, '', {
                    headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
                }).then(function (result) {
                    console.log(result)
                    if (result.status == 200)
                        jQuery('#mdlVtbAddtoPlaylist').modal('show')
                    loadUserPlaylist();
                }, function (error) {
                    console.log(error)
                })
            }


        },

        'removeFromPlaylist': function (id) {
            requestString = [API.THEV, 'dashboard/playlist/remove', id, $sessionStorage.AUD].filter(Boolean).join('/')

            $http.post(requestString, '', {
                headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
            }).then(function (result) {
                console.log(result)
                if (result.status == 200) jQuery('#mdlRemovePlaylist').modal('show')
                loadUserPlaylist();
            }, function (error) {
                console.log(error)
            })
        },

        'loadPlaylist': function () {
            loadUserPlaylist();
        }

    }

    function checkUserSub() {
        if ($localStorage.USER_DATA)
            return ($localStorage.USER_DATA.membership !== "Free")
        else
            return false;
    }

    function loadUserPlaylist() {
        requestString = [API.THEV, 'dashboard/playlist/list', $sessionStorage.AUD].filter(Boolean).join('/')

        $http.get(requestString, {
            headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
        }).then(function (result) {
            $localStorage.PLAYLIST = result.data;
            $localStorage.PLAYLIST.forEach(element => {
                element.image = 'http://site.the-v.net' + element.image
                element.image = element.image.replace('&amp;', '&')
            })
        }, function (error) {
            console.log(error)
        })

    }

})