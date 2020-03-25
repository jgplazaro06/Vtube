angular.module('vtAppCtrlCategories', ['ngStorage', 'vtCategoryCarouselService', 'vtPlayVidService',
    'vtAppConstants', 'vtLoadVideosService'])

    .controller("ctrl_categories", function ($scope, $http, $localStorage,
        $timeout, loadCategoryCarousel, srvc_playVid, srvc_loadVid, API, $sessionStorage) {


        isLogged = $localStorage.IS_LOGGED
        var currentLang = $localStorage.CHOSEN_LANG
        if (!currentLang) currentLang = 'en'

        var aud = $sessionStorage.AUD
        var authToken = $sessionStorage.USER_TOKEN

        $scope.playVid = srvc_playVid.playVid;
        $scope.addToPlaylist = srvc_playVid.addToPlaylist;
        $scope.checkVideoPrivacy = srvc_playVid.checkVideoPrivacy;

        $scope.isLogged = $localStorage.IS_LOGGED;
        $scope.userData = $localStorage.USER_DATA;
        $scope.playVid = srvc_playVid.playVid;
        $scope.enableViewMore = true;

        categoryVids = [];
        categories = [];
        allVids = [];
        infographics = [];
        numCategoryVids = 0;

        $scope.categoriesSections = [
            { category: 'Messages', content: [], viewMore: true },
            { category: 'Personal Development', content: [], viewMore: true },
            { category: 'Entertainment', content: [], viewMore: true },
            { category: 'Business Methods', content: [], viewMore: true },
            { category: 'Infographics', content: [], viewMore: true }
        ]

        currentCategory = 'Messages';
        //Select Video Category from URLParams
        let getParam = new URLSearchParams(window.location.search);
        let urlCategory = decodeURIComponent(getParam.get('category'));

        if (urlCategory != 'null') currentCategory = urlCategory;
        loadInitVids();

        // Video_GetByCategories
        $scope.setCategory = function (category) {
            categoryVids = [];

            numCategoryVids = 1;
            currentCategory = category;
            if (!$scope.categoriesSections.some(function (element) { return element.category === currentCategory })) currentCategory = 'Messages';
            categoryVids = $scope.categoriesSections.filter(function (row) {
                return (row.category.indexOf(currentCategory) !== -1)
            })

            $scope.enableViewMore = categoryVids[0].viewMore;
            $scope.categoryVids = categoryVids[0].content;
        }

        $scope.loadMoreVideos = function (e) {
            if (e !== undefined) e.preventDefault();

            numCategoryVids += 1;

            if (currentCategory != 'Infographics') {
                srvc_loadVid.loadCategoryVideo(currentCategory, 16, numCategoryVids).then(function (result) {
                    if (result.data.length === 0) $scope.enableViewMore = false

                    $scope.categoryVids = $scope.categoryVids.concat(result.data)
                }, function (error) {
                    console.log(error)
                })
            }
            else {
                srvc_loadVid.loadVideoByTag(currentCategory, 16, numCategoryVids).then(function (result) {
                    if (result.data.length === 0) $scope.enableViewMore = false

                    $scope.categoryVids = $scope.categoryVids.concat(result.data)
                }, function (error) {
                    console.log(error)
                })

            }
        }

        function loadInitVids() {
            $scope.categoriesSections.forEach(element => {
                if (element.category != 'Infographics') {
                    srvc_loadVid.loadCategoryVideo(element.category, 16, 1).then(function (result) {
                        element.content = result.data
                    }, function (error) {
                        console.log(error)
                    })
                }
                else {
                    srvc_loadVid.loadVideoByTag(element.category, 16, 1).then(function (result) {
                        element.content = result.data
                    }, function (error) {
                        console.log(error)
                    })

                }
            })
        }

        $timeout(function () {
            $scope.setCategory(currentCategory)

            switch (urlCategory) {
                case 'Messages':
                    angular.element(document.querySelector('#pVtbCategoryCarouselLink1')).click();
                    break;
                case 'Personal Development':
                    angular.element(document.querySelector('#pVtbCategoryCarouselLink2')).click();
                    console.log("click")
                    break;
                case 'Entertainment':
                    angular.element(document.querySelector('#pVtbCategoryCarouselLink3')).click();
                    break;
                case 'Business Methods':
                    angular.element(document.querySelector('#pVtbCategoryCarouselLink4')).click();
                    break;
                case 'Infographics':
                    angular.element(document.querySelector('#pVtbCategoryCarouselLink5')).click();
                    break;
            };
        }, 1500)

        jQuery(document).ready(function ($) {
            loadCategoryCarousel.init();
            loadCategoryCarousel.initCarousel();


        })
    })

    .directive("ngCheckImage", function ($http) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                attrs.$observe('srcset', function (ngSrc) {

                    $http.get(ngSrc).then(function (result) {
                        // console.log("succsess")
                    }, function (error) {
                        element.attr('srcset', 'https://via.placeholder.com/273x185'); // set default image
                    })
                });
                // $http.get('srcset', function (src) {
                //     $http.get(src).then(function (result) {
                //         // console.log("succsess")
                //     }, function (error) {
                //         console.log("error")
                //     })
                // })
            }
        }
    })