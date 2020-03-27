angular.module('vtAppCtrlDashboard', ['ngStorage', 'vtDetailsService', 'vtPlayVidService', 'vtChannelService'
    , 'vtAppServiceDashboard', 'vtAppConstants'])

    .controller("ctrl_dashboard", function ($scope, $localStorage, $sessionStorage, srvc_dashboard, srvc_channel,
        $http, srvc_getDetails, srvc_playVid, API, $q) {


        $scope.$watch(function () { return $localStorage.FOLLOWED_CHANNELS; }, function (newVal, oldVal) {
            $scope.followedChannels = newVal;
        });
        $scope.$watch(function () { return $localStorage.PLAYLIST; }, function (newVal, oldVal) {
            getPlaylistVideoDetails()
        });

        srvc_dashboard.init();


        $scope.inputRegex = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./1-9]*$/;
        $scope.userData = $localStorage.USER_DATA;

        $scope.fullName = $localStorage.USER_DATA.first_name + " " + $localStorage.USER_DATA.last_name;
        $scope.imageUser = 'http://site.the-v.net/Widgets_Site/avatar.ashx?id=' + $localStorage.USER_DATA.id;
        $scope.daysLeft = Math.floor((Date.parse($scope.userData.membershipExpiry) - Date.now()) / 1000 / 60 / (60 * 24)).toString();
        $scope.birthday = formatDate(new Date($scope.userData.birthday))
        $scope.userChannel = $localStorage.USER_CHANNEL;
        $scope.userVideos = $localStorage.USER_VIDEOS;
        $scope.showChangePassword = srvc_dashboard.showChangePassword;
        $scope.getCreateChannel = srvc_dashboard.showCreateChannel;
        $scope.showDashboard = srvc_dashboard.showDashboard;
        $scope.showCreateVideo = srvc_dashboard.showCreateVideo
        $scope.deleteVideo = srvc_dashboard.deleteVideo;

        $scope.myAvatar;
        $scope.myVideo;
        $scope.sameAsBilling;
        $scope.targetMarket = [];

        $scope.playVid = srvc_playVid.playVid;
        $scope.removeFromPlaylist = srvc_playVid.removeFromPlaylist;
        $scope.checkVideoPrivacy = srvc_playVid.checkVideoPrivacy;

        $scope.categories = [];

        $scope.billingInformation = {
            address1: '',
            city: '',
            state_region: '',
            country: '',
            postal_code: '',
            email: '',
            phone_number: '',
            shipping_address1: '',
            shipping_city: '',
            shipping_state_region: '',
            shipping_country: '',
            shipping_phone_number: '',
            shipping_email: '',
            shipping_postal_code: ''
        }

        $scope.videoDetails = {
         

            name: '',
            description: '',
            tags: '',
            categories: '',
            levelid: '',
            market_location: 'South Asia',
            is_comments_allowed: '',
            is_share_allowed: '',
            access_type: '',
            filename: '',
            createdby: $scope.fullName,
            isApproved: '',
            allow_ads: '',
            runningnum: ''
        }

        $scope.channelDetails = {
            // name: ChannelName, accesstype: ChannelPublish, description: ChannelDesc,
            // cancomment: ChannelComment, canrate: 0
            name: '',
            accesstype: '',
            description: '',
            cancomment: '',
            canrate: 0
        }

        $scope.countryCheck = [
            { name: "Africa", selected: false },
            { name: "Central Asia", selected: false },
            { name: "South America", selected: false },
            { name: "Australia", selected: false },
            { name: "East Asia", selected: false },
            { name: "Europe", selected: false },
            { name: "South Asia", selected: false },
            { name: "Southeast Asia", selected: false },
            { name: "Pacific Islands", selected: false },
            { name: "Middle East", selected: false },
            { name: "North America", selected: false }
        ];

        getVideoCategories();

        //profile
        $scope.uploadFile = function () {
            var file = $scope.myAvatar;
            var userId = $localStorage.USER_DATA.id;

            var formData = new FormData();
            formData.append('UploadedImage', file);
            formData.append('type', 'profile');


            requestString = [API.THEV, 'dashboard/upload/avatar', $sessionStorage.AUD].filter(Boolean).join('/')
            $http.post(requestString, formData, {
                headers: { "Content-Type": undefined, 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
            })
        }


        $scope.submitBillingInformation = function (e) {
            e.preventDefault();

            $scope.billingInformation.shipping_phone_number = $scope.billingInformation.phone_number
            $scope.billingInformation.shipping_email = $scope.billingInformation.email

            requestString = [API.THEV, 'dashboard/update/billing', $sessionStorage.AUD].filter(Boolean).join('/')

            $http.post(requestString, $scope.billingInformation, {
                headers: { "Content-Type": undefined, 'Authorization': 'Bearer ' + $sessionStorage.USER_TOKEN }
            })
        }

        $scope.clearInformation = function (e, item) {
            e.preventDefault();

            console.log(item)
            $scope.sameAsBilling = false

            for (var key in item) {
                item[key] = "";
            }

            $scope.videoDetails.targetmarket = 'South Asia'
        }

        $scope.copyToShipping = function () {
            if ($scope.sameAsBilling) {
                $scope.billingInformation.shipping_address1 = $scope.billingInformation.address1
                $scope.billingInformation.shipping_city = $scope.billingInformation.city
                $scope.billingInformation.shipping_state_region = $scope.billingInformation.state_region
                $scope.billingInformation.shipping_country = $scope.billingInformation.country
                $scope.billingInformation.shipping_postal_code = $scope.billingInformation.postal_code
            }
        }

        //mychanel
        $scope.uploadVideo = function (e) {
            e.preventDefault();
            $scope.videoDetails.guid = Math.round(new Date().getTime() + (Math.random() * 100));
            var targetMarket = "";

            $scope.countryCheck.forEach(element => {
                if (element.selected)
                    targetMarket = targetMarket + element.name + ", "
            })

            if (verifyFields($scope.videoDetails) && ($scope.myVideo != undefined)) {
                $scope.videoDetails.targetmarket = targetMarket;
                srvc_dashboard.createVideo($scope.videoDetails).then(function (result) {
                    console.log(result)

                    if (result.data[0].Data == "False") {
                        window.alert("Error Creating Video. Please contact your administrator.");
                    }
                    else {
                        window.alert("Video Uploaded Successfully. We will review your video before its public.");
                        videoCreate($scope.videoDetails.guid);
                    }

                }, function (error) {
                    console.log(error)
                })

            }
            else {
                window.alert("Please Fill-up All Fields and choose a file to upload")
            }

        }

        $scope.editVideo = function (e) {
            e.preventDefault();
            var targetMarket = "";

            $scope.countryCheck.forEach(element => {
                if (element.selected)
                    targetMarket = targetMarket + element.name + ", "
            })


            if (verifyFields($scope.videoDetails)) {
                targetMarket = targetMarket.slice(0, -1)
                $scope.videoDetails.targetmarket = targetMarket;
                srvc_dashboard.editVideo($scope.videoDetails).then(function (result) {
                    console.log(result)

                    if (result.data[0].Data == "False") {
                        window.alert("Error Creating Video. Please contact your administrator.");
                    }
                    else {
                        window.alert("Video Uploaded Successfully. We will review your video before its public.");
                    }

                }, function (error) {
                    console.log(error)
                })

            }
            else {
                window.alert("Please Fill-up All Fields")
            }
        }
        $scope.goToEditVideo = function (guid, e) {
            e.preventDefault();
            $scope.videoDetails.guid = guid;
            srvc_getDetails.getDetails('Video', guid).then(function (result) {
                $scope.videoDetails.name = result.data[0].name
                $scope.videoDetails.desc = result.data[0].description
                $scope.videoDetails.tags = result.data[0].tags
                $scope.videoDetails.category = result.data[0].category
                $scope.videoDetails.level = result.data[0].level
            })
            srvc_dashboard.showEditVideo();
        }
        $scope.createChannel = function () {

            if (verifyFields($scope.channelDetails)) {

                if ($scope.userChannel == null)
                    srvc_dashboard.createChannel($scope.channelDetails).then(function (result) {
                        console.log(result)
                        getUserChannel()
                        window.alert(result.data[0].Data)

                    }, function (error) {
                        console.log(error)

                    })
                else
                    srvc_dashboard.editChannel($scope.userChannel.id, $scope.channelDetails)
                        .then(function (result) {
                            console.log(result)
                            getUserChannel()
                            window.alert(result.data[0].Data)

                        }, function (error) {
                            console.log(error)
                        })

            }
            else {
                window.alert("Please Fill-up All Fields")
            }


        }

        $scope.deleteChannel = function (e) {
            e.preventDefault();
            srvc_dashboard.deleteChannel($scope.userChannel.id).then(function (result) {
                if (result.data[0].Data == "True") {
                    console.log(result)
                    window.alert("Channel Deleted")

                    getUserChannel()
                }
                else {
                    window.alert("Something Went Wrong")

                }
            }, function (error) {
                console.log(error)
            })
        }

        $scope.acceptFollower = function (id, e) {
            e.preventDefault();
            console.log(id)

            var encodedString = 'action=' + encodeURIComponent('follow_accept') + "&id="
                + encodeURIComponent(id);

            $http({
                method: 'POST',
                url: API.URL,
                data: encodedString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) {
                console.log(result)
            }, function (error) {
                console.log(error)
            })

        }

        $scope.rejectFollower = function (id, e) {
            e.preventDefault();
            console.log(id)
            var encodedString = 'action=' + encodeURIComponent('follow_reject') + "&id="
                + encodeURIComponent(id);

            $http({
                method: 'POST',
                url: API.URL,
                data: encodedString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) {
                console.log(result)
            }, function (error) {
                console.log(error)
            })

        }

        $scope.unfollow = function (id, e) {
            userId = $scope.userData.id;

            e.preventDefault();

            srvc_channel.unfollow(id, userId).then(function (result) {
                if (result.data[0].Data == 'True') {
                    window.alert("Unfollowed")
                    getFollowing();
                }
            }, function (error) {
                console.log(error)
            })
        }

        

        //points
        

        //inbox

        $scope.showInboxMessage = function (message) {
            $localStorage.CURRENT_MESSAGE = message;
            srvc_dashboard.setInboxMessage(message)
        }
        

        //utils
        function formatDate(date) {
            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];

            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return monthNames[monthIndex] + ' ' + day + ', ' + year;
        }

        function getPlaylistVideoDetails() {
            if ($localStorage.PLAYLIST != undefined) {
                $localStorage.PLAYLIST.forEach(element => {
                    var imageOriginal = element.image;
                    var imageReal = imageOriginal.slice(imageOriginal.indexOf("http"))
                    element.image = imageReal;
                    correctImage(element.image).then(function (link) {
                        if (!link) element.image = 'https://via.placeholder.com/273x185'
                    });
                })
                $scope.playlist = $localStorage.PLAYLIST
            }

        }

        function correctImage(src) {
            var deferred = $q.defer();

            var image = new Image()
            image.onerror = function () {
                deferred.resolve(false)
            }
            image.onload = function () {
                deferred.resolve(true);
            };
            image.src = src;

            return deferred.promise;
        }

        

        

        function getVideoCategories() {
            var encodedString = 'action=' + encodeURIComponent('Video_GetCategories');
            $http({
                method: 'POST',
                url: API.URL,
                data: encodedString,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (result) {
                // angular.fromJson(result.data)
                result.data.forEach(element => {
                    $scope.categories.push(element.category);
                })
            }, function (error) {
                console.log(error)
            })
        }

        function verifyFields(item) {
            allFilled = true;
            angular.forEach(item, function (val, key) {
                if (val === "") {
                    allFilled = false
                    return allFilled;
                }
            })
            return allFilled;
        }

        function videoCreate(guid) {
            // fd.append("UploadedFile", files); fd.append("type", "video");
            //  fd.append("userid", "userid"); fd.append("action", "VideoCreate"); fd.append("guid", guid)

            // processData: false, contentType: false,
            var file = $scope.myVideo;
            var userId = $localStorage.USER_DATA.id;

            var formData = new FormData();
            formData.append('UploadedFile', file);
            formData.append('type', 'video');
            formData.append('userid', userId);
            formData.append('action', 'VideoCreate');
            formData.append("guid", guid)

            $http({
                method: 'POST',
                url: 'http://cums.the-v.net/Vtube.aspx',
                data: formData,
                processData: false,
                headers: { "Content-Type": undefined },
            }).then(function (result) {
                console.log(result)
            }, function (error) {
                console.log(error)
            })

        }

    })

    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel)
                var modelSet = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSet(scope, element[0].files[0])
                        scope.uploadFile();
                    })
                })
            }
        }
    }])

    .directive('videoModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.videoModel)
                var modelSet = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSet(scope, element[0].files[0])
                    })
                })
            }
        }
    }])

    .directive('inputRegex', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attr, ngModel) {
                ngModel.$parsers.push(function (view) {
                    var regex = /^[^`~!@#$%\^&*()_+={}|[\]\\:';"<>?,./]*$/
                    if (view.match(regex)) {
                        return view
                    }

                    var viewCleaned = ngModel.$modelValue;
                    ngModel.$setViewValue(viewCleaned);
                    ngModel.$render();
                    return viewCleaned;
                })
            }
        }
    }

    ])

