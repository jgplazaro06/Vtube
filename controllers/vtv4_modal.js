angular.module('vtAppCtrlModal', ['vtPlayVidService', 'vtAppServiceDashboard'])


    .controller("ctrl_modal", function ($scope, $localStorage, srvc_playVid, srvc_dashboard, $sce) {


        $scope.$watch(function () { return $localStorage.CURRENT_MESSAGE; }, function (newVal, oldVal) {
            if (newVal != oldVal && newVal != undefined)
                stringClean(newVal)
        });

        $scope.functionTest = function (e) {
            e.preventDefault();
            currentVideoId = $localStorage.ID_TO_DELETE;

            srvc_playVid.removeFromPlaylist(currentVideoId);

        }

        function stringClean(item) {
            $scope.inboxItem = item;
            $scope.inboxItem.Body = $sce.trustAsHtml($scope.inboxItem.Body)
            $scope.inboxItem.Sender = $sce.trustAsHtml($scope.inboxItem.Sender)
            $scope.inboxItem.date = $sce.trustAsHtml($scope.inboxItem.date)
            $scope.inboxItem.Subject = $sce.trustAsHtml($scope.inboxItem.Subject)

        }

        // $(document).ready(function ($) {
        //     modalInbox = angular.element(document.querySelector('#inboxModal'));
        //     modalShare = angular.element(document.querySelector('#mdlVtbShare'));
        //     modalPlaylist = angular.element(document.querySelector('#mdlVtbAddtoPlaylist'));
        //     modalAddedPlaylist = angular.element(document.querySelector('#mdlVtbAddedtoPlaylist'));
        //     loginRequiredModal = angular.element(document.querySelector('#loginRequiredModal'));

        //     modalLoginError = angular.element(document.querySelector('#mdlLoginError'));
        //     modalRequestSent = angular.element(document.querySelector('#mdlRequestSent'));
        //     modalAlreadyLiked = angular.element(document.querySelector('#mdlAlreadyLiked'));
        //     modalInvalidId = angular.element(document.querySelector('#mdlInvalidIRID'));
        //     modalSubscribeOnly = angular.element(document.querySelector('#mdlSubscribedUserOnly'));
        //     modalRemovePlaylist = angular.element(document.querySelector('#mdlRemovePlaylist'));
        //     modalUnfollowed = angular.element(document.querySelector('#mdlUnfollowed'));


        //     // mdlUnfollowed
        //     // mdlLoginError
        //     // mdlRequestSent
        //     // mdlAlreadyLiked
        //     // mdlInvalidIRID
        //     // mdlSubscribedUserOnly
        //     // $scope.inboxItem = srvc_dashboard.getInboxMessage();
        // })(jQuery)
    })