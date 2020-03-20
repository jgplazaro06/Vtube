var app = angular.module('vtPlayVidService', ['vtAppConstants'])

app.factory('srvc_playVid', function ($localStorage, $http, API) {


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

        'checkVideoPrivacy': function (videoPrivacy) {
            isLogged = $localStorage.IS_LOGGED

            isPrivate = (videoPrivacy != 'public')

            if (!isPrivate) {
                return true;
                // window.location.reload()
                // $state.go('^.now-playing')

            }
            else if (!isLogged && isPrivate) {
                return false;
                // loginRequiredModal.modal('show')
            }
            else if (isLogged && isPrivate) {
                if (checkUserSub()) {
                    return true;
                    // window.location.reload()
                    // $state.go('^.now-playing')

                }
                else {
                    // loginSubscribedOnly.modal('show')
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
                modalAddedPlaylist.modal('show')
            }
            else {
                var encodedString = 'action=' + encodeURIComponent('DDrupal_Video_AddToPlaylist') + "&id="
                    + encodeURIComponent(id) + "&userid="
                    + encodeURIComponent(userId);

                $http({
                    method: 'POST',
                    url: API.URL,
                    data: encodedString,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (result) {
                    if (result.data[0].Data == 'True')
                        modalPlaylist.modal('show')
                    loadUserPlaylist();
                }, function (error) {
                    console.log(error)
                })
            }


        },

        'removeFromPlaylist': function (id) {
            userId = $localStorage.USER_DATA.id;

            var encodedString = 'action=' + encodeURIComponent('DDrupal_Video_RemovePlaylist') + "&id="
                + encodeURIComponent(id) + "&userid="
                + encodeURIComponent(userId);

            return $http({
                method: 'POST',
                url: API.URL,
                data: encodedString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) {
                console.log(result)
                if (result.data[0].Data == 'True') modalRemovePlaylist.modal('show')
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
        return ($localStorage.USER_DATA.membership !== "Free")
    }

    function loadUserPlaylist() {
        userId = $localStorage.USER_DATA.id;

        var encodedString = 'action=' + encodeURIComponent('DDrupal_UserVideoPlaylist') + "&id="
            + encodeURIComponent(userId);
        $http({
            method: 'POST',
            url: API.URL,
            data: encodedString,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (result) {
            console.log(result.data)
            $localStorage.PLAYLIST = result.data;
            if ($localStorage.PLAYLIST == undefined)
                $localStorage.PLAYLIST = [];


        }, function (error) {
            console.log(error)
        })

    }

})