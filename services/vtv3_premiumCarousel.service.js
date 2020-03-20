var app = angular.module('vtPremiumService', ['vtAppConstants'])

app.factory('srvc_premium', function ($localStorage, $http, API) {

    var $ = jQuery;
    var Link1 = 'Link1';
    var Link2 = 'Link2';
    var Link3 = 'Link3';
    var Link4 = 'Link4';
    var Link5 = 'Link5';
    var Link6 = 'Link6';
    var Link7 = 'Link7';
    var currentIndex = 0;
    return {
        'init': function () {
            $('#pVtbPremium' + Link1).click(function () {
                getPremiumLink1();
            });
            $('#pVtbPremium' + Link2).click(function () {
                getPremiumLink2();
            });
            $('#pVtbPremium' + Link3).click(function () {
                getPremiumLink3();
            });
            $('#pVtbPremium' + Link4).click(function () {
                getPremiumLink4();
            });
            $('#pVtbPremium' + Link5).click(function () {
                getPremiumLink5();
            });

        },

        'initRelated': function () {
            console.log("init carprem")

            $('#crslVtbRelatedVideos, #crslVtbRelatedVideosIn').owlCarousel({
                rtl: false,
                loop: true,
                dots: true,
                navText: ['<img src="/Resources/vtube/images/vt-arrow-btn-left.svg"></img>', '<img src="/Resources/vtube/images/vt-arrow-btn-right.svg">'],
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3,
                        nav: true
                    },
                    1200: {
                        items: 4,
                        nav: true
                    }
                }
            });
        },

        'initCarousel': function () {

            var recentlyAdded = $('#crslVtbRecentlyAddedVideos, #crslVtbRecentlyAddedVideosIn');


            recentlyAdded.owlCarousel({
                rtl: false,
                loop: true,
                dots: true,
                navText: ['<img src="/Resources/vtube/images/vt-arrow-btn-left.svg"></img>', '<img src="/Resources/vtube/images/vt-arrow-btn-right.svg">'],
                responsive: {
                    0: {
                        items: 1
                    },
                    1200: {
                        items: 1,
                        nav: true
                    }
                }
            });


            $('#crslVtbRecentlyAddedVideos, #crslVtbRecentlyAddedVideosIn').find(".owl-dots").addClass("container text-left");

            recentlyAdded.on('changed.owl.carousel', function (event) {
                console.log(event.page.index)
                setIndex(event.page.index)
            })

        },

        'getCarouselIndex': function () {
            return currentIndex;
        }

    }

    function setIndex(index) {
        currentIndex = index;
    }

    function getPremiumLink1() {
        console.log("qqq")
        $('#pVtbPremium' + Link1 + ', #divVtbPremium' + Link1 + 'Content').addClass('active show');
        $('#pVtbPremium' + Link2 + ', #divVtbPremium' + Link2 + 'Content, \
        #linkVtbPremium' + Link3 + ', #divVtbPremium' + Link3 + 'Content, \
        #linkVtbPremium' + Link4 + ', #divVtbPremium' + Link4 + 'Content, \
        #linkVtbPremium'+ Link5 + ', #divVtbPremium' + Link5 + 'Content').removeClass('active show');
    }
    function getPremiumLink2() {
        $('#pVtbPremium' + Link2 + ', #divVtbPremium' + Link2 + 'Content').addClass('active show');
        $('#pVtbPremium' + Link1 + ', #divVtbPremium' + Link1 + 'Content, \
        #pVtbPremium' + Link3 + ', #divVtbPremium' + Link3 + 'Content, \
        #pVtbPremium' + Link4 + ', #divVtbPremium' + Link4 + 'Content, \
        #pVtbPremium'+ Link5 + ', #divVtbPremium' + Link5 + 'Content').removeClass('active show');
    }
    function getPremiumLink3() {
        $('#pVtbPremium' + Link3 + ', #divVtbPremium' + Link3 + 'Content').addClass('active show');
        $('#pVtbPremium' + Link1 + ', #divVtbPremium' + Link1 + 'Content, \
        #pVtbPremium' + Link2 + ', #divVtbPremium' + Link2 + 'Content, \
        #pVtbPremium' + Link4 + ', #divVtbPremium' + Link4 + 'Content, \
        #pVtbPremium'+ Link5 + ', #divVtbPremium' + Link5 + 'Content').removeClass('active show');
    }
    function getPremiumLink4() {
        $('#pVtbPremium' + Link4 + ', #divVtbPremium' + Link4 + 'Content').addClass('active show');
        $('#pVtbPremium' + Link1 + ', #divVtbPremium' + Link1 + 'Content, \
        #pVtbPremium' + Link2 + ', #divVtbPremium' + Link2 + 'Content, \
        #pVtbPremium' + Link3 + ', #divVtbPremium' + Link3 + 'Content, \
        #pVtbPremium'+ Link5 + ', #divVtbPremium' + Link5 + 'Content').removeClass('active show');
    }
    function getPremiumLink5() {
        $('#pVtbPremium' + Link5 + ', #divVtbPremium' + Link5 + 'Content').addClass('active show');
        $('#pVtbPremium' + Link1 + ', #divVtbPremium' + Link1 + 'Content, \
        #pVtbPremium' + Link2 + ', #divVtbPremium' + Link2 + 'Content, \
        #pVtbPremium' + Link3 + ', #divVtbPremium' + Link3 + 'Content, \
        #pVtbPremium'+ Link4 + ', #divVtbPremium' + Link4 + 'Content').removeClass('active show');
    }

})