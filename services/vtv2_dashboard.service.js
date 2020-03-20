angular.module('vtAppServiceDashboard', ['vtAppConstants'])

    .factory("srvc_dashboard", function ($localStorage, $sessionStorage, $http, API) {

        isLogged = $localStorage.IS_LOGGED
        var $ = jQuery;
        
        var channelExist = false;
        var inboxItem = [];
        return {

            //functionalities
            'playlistFunctions': function (action, videoId) {
                requestString = [API.THEV, 'dashboard/playlist', action, videoId, $sessionStorage.AUD].filter(Boolean).join('/')
                return $http.get(requestString, {
                    headers: { 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
                })
            },

            'createChannel': function (channel) {
                console.log(channel)

                userId = $localStorage.USER_DATA.id;

                var encodedString = 'action=' + encodeURIComponent('DDrupal_Channel_Create') + "&name="
                    + encodeURIComponent(channel.name) + "&accesstype="
                    + encodeURIComponent(channel.accesstype) + "&description="
                    + encodeURIComponent(channel.description) + "&iscomment="
                    + encodeURIComponent(channel.cancomment) + "&israte="
                    + encodeURIComponent(channel.canrate) + "&userid="
                    + encodeURIComponent(userId);
                return $http({
                    method: 'POST',
                    url: API.URL,
                    data: encodedString,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })

            },
            'deleteChannel': function (id) {

                userId = $localStorage.USER_DATA.id;

                var encodedString = 'action=' + encodeURIComponent('DDrupal_channel_remove') + "&id="
                    + encodeURIComponent(id) + "&userid="
                    + encodeURIComponent(userId);
                return $http({
                    method: 'POST',
                    url: API.URL,
                    data: encodedString,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })

            },
            'editChannel': function (id, channel) {
                userId = $localStorage.USER_DATA.id;

                var encodedString = 'action=' + encodeURIComponent('DDrupal_Channel_Update') + "&channelid="
                    + encodeURIComponent(id) + "&title="
                    + encodeURIComponent(channel.name) + "&descript="
                    + encodeURIComponent(channel.description) + "&Comment="
                    + encodeURIComponent(channel.cancomment) + "&publish="
                    + encodeURIComponent(channel.accesstype) + "&userid="
                    + encodeURIComponent(userId);
                return $http({
                    method: 'POST',
                    url: API.URL,
                    data: encodedString,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })


            },
            'createVideo': function (video) {

                userId = $localStorage.USER_DATA.id;
                var encodedString = 'action=' + encodeURIComponent('DDrupal_Video_Create') + "&name="
                    + encodeURIComponent(video.name) + "&desc="
                    + encodeURIComponent(video.desc) + "&tags="
                    + encodeURIComponent(video.tags) + "&category="
                    + encodeURIComponent(video.category) + "&level="
                    + encodeURIComponent(video.level) + "&targetmarket="
                    + encodeURIComponent(video.targetmarket) + "&comment="
                    + encodeURIComponent(video.comment) + "&share="
                    + encodeURIComponent(video.share) + "&publish="
                    + encodeURIComponent(video.publish) + "&guid="
                    + encodeURIComponent(video.guid) + "&userid="
                    + encodeURIComponent(userId);

                return $http({
                    method: 'POST',
                    url: API.URL,
                    data: encodedString,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })


            },
            'editVideo': function (video) {

                userId = $localStorage.USER_DATA.id;
                var encodedString = 'action=' + encodeURIComponent('DDrupal_Video_Update') + "&vidid="
                    + encodeURIComponent(video.guid) + "&name="
                    + encodeURIComponent(video.name) + "&descrip="
                    + encodeURIComponent(video.desc) + "&tags="
                    + encodeURIComponent(video.tags) + "&category="
                    + encodeURIComponent(video.category) + "&level="
                    + encodeURIComponent(video.level) + "&targetmarket="
                    + encodeURIComponent(video.targetmarket) + "&comment="
                    + encodeURIComponent(video.comment) + "&share="
                    + encodeURIComponent(video.share) + "&publish="
                    + encodeURIComponent(video.publish) + "&userid="
                    + encodeURIComponent(userId);

                return $http({
                    method: 'POST',
                    url: API.URL,
                    data: encodedString,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })

            },
            'deleteVideo': function (videoId, e) {
                //DDrupal_myvideo_del
                e.preventDefault();

                userId = $localStorage.USER_DATA.id;
                var encodedString = 'action=' + encodeURIComponent('DDrupal_myvideo_del') + "&id="
                    + encodeURIComponent(videoId) + "&userid= "
                    + encodeURIComponent(userId)

                return $http({
                    method: 'POST',
                    url: API.URL,
                    data: encodedString,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                }).then(function (result) {
                    console.log(result)
                }, function (error) {
                    console.log(error)
                })


            },
            'uploadVideo': function () {

            },


            //visuals
            'init': function () {
                $('#linkVtbProfile').click(function () {
                    getDashboardProfile();
                });

                $('#linkVtbChangePassword').click(function () {
                    getDashboardChangePassword();
                });

                $('#linkVtbBillingInformation').click(function () {
                    getDashboardBillingInformation();
                });

                $('#linkVtbUploadVideo').click(function () {
                    if ($localStorage.USER_CHANNEL != null) {
                        getDashboardUploadVideo();
                        // $localStorage.CHANNEL_ID = $localStorage.USER_CHANNEL.id;
                        // window.location.href = 'index.html#!/channel-landing?channel=' + $localStorage.USER_CHANNEL.id;
                    }
                    else {
                        getDashboardMyChannel();
                        window.alert("You need a Channel to uploads videos.")
                    }
                });
                $('#linkVtbMyChannel').click(function () {
                    if ($localStorage.USER_CHANNEL != null) {
                        getManageChannel();
                        // $localStorage.CHANNEL_ID = $localStorage.USER_CHANNEL.id;
                        // window.location.href = 'index.html#!/channel-landing?channel=' + $localStorage.USER_CHANNEL.id;
                    }
                    else {
                        getDashboardMyChannel();
                    }
                });
                $('#linkVtbMyVideos').click(function () {
                    getDashboardMyVideos();
                });
                $('#linkVtbFollowers').click(function () {
                    getDashboardFollowers();
                });
                $('#linkVtbFollowing').click(function () {
                    getDashboardFollowing();
                });
                $('#linkVtbPoints').click(function () {
                    getDashboardPoints();
                });
                $('#linkVtbPlaylist').click(function () {
                    getDashboardPlaylist();
                });
                $('#linkVtbInbox').click(function () {
                    getDashboardInbox();
                });
                $('#linkVtbProfileDropdown').click(function () {
                    getDashboardProfileDropdown();
                });
                $('#linkVtbMychannelDropdown').click(function () {
                    getDashboardMychannelDropdown();
                });

            },
            'setInboxMessage': function (item) {
                inboxItem = item;
            },
            getInboxMessage: getInboxMessage,
            'showChangePassword': function () {
                getDashboardChangePassword();
            },


            'showCreateChannel': function () {
                getCreateChannel()
            },
            'showDashboard': function () {
                getDashboardProfile()
            },
            'showCreateVideo': function () {
                getDashboardUploadVideo();
            },
            'showEditVideo': function () {
                getEditVideo();
            }

        }

        function getInboxMessage() {
            return inboxItem
        }

        function getEditVideo() {
            $('#pillsVtbEditVideo').addClass('active show');
            $('#pillsVtbPoints, #pillsVtbChangePassword, #pillsVtbMyChannel, #pillsVtbManageChannel, \
                #pillsVtbMyVideos, #pillsVtbBillingInformation, #pillsVtbUploadVideo, #pillsVtbFollowers,\
                #pillsVtbFollowing, #pillsVtbPlaylist, #pillsVtbNoInbox, #pillsVtbInbox, #pillsVtbProfile, #pillsVtbCreateChannel').removeClass('active show');
        }

        function getManageChannel() {
            $('#pillsVtbManageChannel').addClass('active show');
            $('#pillsVtbPoints, #pillsVtbChangePassword, #pillsVtbMyChannel, #pillsVtbEditVideo, \
                #pillsVtbMyVideos, #pillsVtbBillingInformation, #pillsVtbUploadVideo, #pillsVtbFollowers,\
                #pillsVtbFollowing, #pillsVtbPlaylist, #pillsVtbNoInbox, #pillsVtbInbox, #pillsVtbProfile, #pillsVtbCreateChannel').removeClass('active show');
        }

        function getCreateChannel() {
            $('#pillsVtbCreateChannel').addClass('active show');
            $('#pillsVtbPoints, #pillsVtbChangePassword, #pillsVtbMyChannel, #pillsVtbManageChannel, #pillsVtbEditVideo, \
                #pillsVtbMyVideos, #pillsVtbBillingInformation, #pillsVtbUploadVideo, #pillsVtbFollowers,\
                #pillsVtbFollowing, #pillsVtbPlaylist, #pillsVtbNoInbox, #pillsVtbInbox, #pillsVtbProfile').removeClass('active show');
        }
        function getDashboardProfile() {
            $('#pillsVtbProfile').addClass('active show');
            $('#pillsVtbPoints, #pillsVtbChangePassword, #pillsVtbMyChannel, #pillsVtbManageChannel, #pillsVtbEditVideo, \
                #pillsVtbMyVideos, #pillsVtbBillingInformation, #pillsVtbUploadVideo, #pillsVtbFollowers,\
                #pillsVtbFollowing, #pillsVtbPlaylist, #pillsVtbNoInbox, #pillsVtbInbox, #pillsVtbCreateChannel').removeClass('active show');
        }

        function getDashboardChangePassword() {
            $('#pillsVtbChangePassword').addClass('active show');
            $('#pillsVtbProfile, #pillsVtbBillingInformation, #pillsVtbMyChannel, #pillsVtbManageChannel, #pillsVtbEditVideo, \
                #pillsVtbMyVideos, #pillsVtbNoVideo, #pillsVtbUploadVideo, #pillsVtbFollowers, #pillsVtbFollowing, #pillsVtbPoints, \
                 #pillsVtbPlaylist, #pillsVtbNoInbox, #pillsVtbInbox, #pillsVtbCreateChannel').removeClass('active show');
        }
        function getDashboardBillingInformation() {
            $('#pillsVtbBillingInformation').addClass('active show');
            $('#pillsVtbProfile, #pillsVtbChangePassword, #pillsVtbMyChannel, #pillsVtbManageChannel, #pillsVtbEditVideo, \
                #pillsVtbNoVideo, #pillsVtbUploadVideo, #pillsVtbFollowers, #pillsVtbFollowing,\
                #pillsVtbPoints, #pillsVtbPlaylist, #pillsVtbNoInbox, #pillsVtbInbox, #pillsVtbCreateChannel').removeClass('active show');
        }
        function getDashboardUploadVideo() {
            $('#pillsVtbUploadVideo').addClass('active show');
            $('#pillsVtbProfile, #pillsVtbChangePassword, #pillsVtbMyChannel, #pillsVtbManageChannel, #pillsVtbEditVideo, \
                #pillsVtbMyVideos, #pillsVtbBillingInformation, #pillsVtbFollowers, #pillsVtbFollowing,\
                #pillsVtbPoints, #pillsVtbPlaylist, #pillsVtbNoInbox, #pillsVtbInbox, #pillsVtbCreateChannel').removeClass('active show');
        }
        function getDashboardMyChannel() {
            $('#pillsVtbMyChannel').addClass('active show');
            $('#pillsVtbProfile, #pillsVtbChangePassword, #pillsVtbMyVideos, #pillsVtbManageChannel, #pillsVtbEditVideo, \
                #pillsVtbUploadVideo, #pillsVtbBillingInformation, #pillsVtbFollowers, #pillsVtbFollowing,\
                #pillsVtbPoints, #pillsVtbPlaylist, #pillsVtbNoInbox, #pillsVtbInbox, #pillsVtbCreateChannel').removeClass('active show');
        }
        function getDashboardMyVideos() {
            $('#pillsVtbMyVideos').addClass('active show');
            $('#pillsVtbProfile, #pillsVtbChangePassword, #pillsVtbMyChannel, #pillsVtbManageChannel, #pillsVtbEditVideo, \
                #pillsVtbUploadVideo, #pillsVtbBillingInformation, #pillsVtbFollowers, #pillsVtbFollowing,\
                #pillsVtbPoints, #pillsVtbPlaylist, #pillsVtbNoInbox, #pillsVtbInbox, #pillsVtbCreateChannel').removeClass('active show');
        }
        function getDashboardFollowers() {
            $('#pillsVtbFollowers').addClass('active show');
            $('#pillsVtbProfile, #pillsVtbChangePassword, #pillsVtbMyChannel, #pillsVtbManageChannel, #pillsVtbEditVideo, \
                #pillsVtbMyVideos, #pillsVtbBillingInformation, #pillsVtbUploadVideo, #pillsVtbFollowing,\
                #pillsVtbPoints, #pillsVtbPlaylist, #pillsVtbNoInbox, #pillsVtbInbox, #pillsVtbCreateChannel').removeClass('active show');
        }
        function getDashboardFollowing() {
            $('#pillsVtbFollowing').addClass('active show');
            $('#pillsVtbProfile, #pillsVtbChangePassword, #pillsVtbMyChannel, #pillsVtbManageChannel,  #pillsVtbEditVideo,\
                #pillsVtbMyVideos, #pillsVtbBillingInformation, #pillsVtbUploadVideo, #pillsVtbFollowers,\
                #pillsVtbPoints, #pillsVtbPlaylist, #pillsVtbNoInbox, #pillsVtbInbox, #pillsVtbCreateChannel').removeClass('active show');
        }

        function getDashboardPoints() {
            $('#linkVtbPoints').addClass('show');
            $('#linkVtbPlaylist, #linkVtbInbox, #linkVtbProfileDropdown, #linkVtbMychannelDropdown').removeClass('show');
            $('#pillsVtbPoints').addClass('active show');
            $('#pillsVtbProfile, #pillsVtbChangePassword, #pillsVtbMyChannel, #pillsVtbManageChannel, #pillsVtbEditVideo, \
                #pillsVtbMyVideos, #pillsVtbBillingInformation, #pillsVtbUploadVideo, #pillsVtbFollowers,\
                #pillsVtbFollowing, #pillsVtbPlaylist, #pillsVtbNoInbox, #pillsVtbInbox, #pillsVtbCreateChannel').removeClass('active show');
        }
        function getDashboardPlaylist() {
            $('#linkVtbPlaylist').addClass('show');
            $('#linkVtbPoints, #linkVtbInbox, #linkVtbProfileDropdown, #linkVtbMychannelDropdown').removeClass('show');
            $('#pillsVtbPlaylist').addClass('active show');
            $('#pillsVtbProfile, #pillsVtbChangePassword, #pillsVtbMyChannel, #pillsVtbManageChannel, #pillsVtbEditVideo, \
                #pillsVtbMyVideos, #pillsVtbBillingInformation, #pillsVtbUploadVideo, #pillsVtbFollowers,\
                #pillsVtbFollowing, #pillsVtbPoints, #pillsVtbNoInbox, #pillsVtbInbox, #pillsVtbCreateChannel').removeClass('active show');
        }
        function getDashboardInbox() {
            $('#linkVtbInbox').addClass('show');
            $('#linkVtbPoints, #linkVtbPlaylist, #linkVtbProfileDropdown, #linkVtbMychannelDropdown').removeClass('show');
            $('#pillsVtbInbox').addClass('active show');
            $('#pillsVtbProfile, #pillsVtbChangePassword, #pillsVtbMyChannel, #pillsVtbManageChannel, #pillsVtbEditVideo, \
                #pillsVtbMyVideos, #pillsVtbBillingInformation, #pillsVtbUploadVideo, #pillsVtbFollowers,\
                #pillsVtbFollowing, #pillsVtbPoints, #pillsVtbNoInbox, #pillsVtbPlaylist, #pillsVtbCreateChannel').removeClass('active show');
        }
        // function getDashboardNoInbox() {
        //     $('#linkVtbInbox').addClass('show');
        //     $('#linkVtbPoints, #linkVtbPlaylist, #linkVtbProfileDropdown, #linkVtbMychannelDropdown').removeClass('show');
        //     $('#pillsVtbInbox').addClass('active show');
        //     $('#pillsVtbProfile, #pillsVtbChangePassword, #pillsVtbMyChannel, #pillsVtbManageChannel, \
        //     #pillsVtbMyVideos, #pillsVtbBillingInformation, #pillsVtbUploadVideo, #pillsVtbFollowers,\
        //     #pillsVtbFollowing, #pillsVtbPoints, #pillsVtbNoInbox, #pillsVtbPlaylist').removeClass('active show');
        // }
        function getDashboardProfileDropdown() {
            $('#linkVtbProfileDropdown').addClass('show');
            $('#linkVtbPoints, #linkVtbPlaylist, #linkVtbInbox, #linkVtbMychannelDropdown').removeClass('show');
        }
        function getDashboardMychannelDropdown() {
            $('#linkVtbMychannelDropdown').addClass('show');
            $('#linkVtbPoints, #linkVtbPlaylist, #linkVtbInbox, #linkVtbProfileDropdown').removeClass('show');
        }
    })

