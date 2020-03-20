angular.module('vtChannelCarouselService', [])

    .factory('loadChannelCarousel', function () {
        var Link1 = 'Link1';
        var Link2 = 'Link2';
        var Link3 = 'Link3';
        var Link4 = 'Link4';
        var Link5 = 'Link5';
        var Link6 = 'Link6';
        var Link7 = 'Link7';
        var $ = jQuery;

        return {
            'init': function () {


                $('#pVtbChannels' + Link1).click(function () {
                    getChannelsLink1();
                });
                $('#pVtbChannels' + Link2).click(function () {
                    getChannelsLink2();
                });
                $('#pVtbChannels' + Link3).click(function () {
                    getChannelsLink3();
                });
                $('#pVtbChannels' + Link4).click(function () {
                    getChannelsLink4();
                });

                $('#pVtbChannelCarousel' + Link1 + ', #pVtbChannelCarouselIn' + Link1 + '').click(function () {
                    getChannelCarouselLink1();
                });
                $('#pVtbChannelCarousel' + Link2 + ', #pVtbChannelCarouselIn' + Link2 + '').click(function () {

                    getChannelCarouselLink2();
                });
                $('#pVtbChannelCarousel' + Link3 + ', #pVtbChannelCarouselIn' + Link3 + '').click(function () {
                    getChannelCarouselLink3();
                });
                $('#pVtbChannelCarousel' + Link4 + ', #pVtbChannelCarouselIn' + Link4 + '').click(function () {
                    getChannelCarouselLink4();
                });
                $('#pVtbChannelCarousel' + Link5 + ', #pVtbChannelCarouselIn' + Link5 + '').click(function () {
                    getChannelCarouselLink5();
                });



            },

            'initCarousel': function () {
                (function ($) {

                    $('#crslVtbChannels, #crslVtbChannelsIn').owlCarousel({
                        rtl: false,
                        loop: true,
                        dots: true,
                        navText: ['<img src="./images/default-source/vtube/vtube-assets/vt-arrow-btn-left.svg"></img>', '<img src="./images/default-source/vtube/vtube-assets/vt-arrow-btn-right.svg">'],
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
                            }
                        }
                    });
                })(jQuery)

            }

        }
        function getChannelsLink1() {
            $('#pVtbChannels' + Link1 + ', #divVtbChannels' + Link1 + 'Content').addClass('active show');
            $('#pVtbChannels' + Link2 + ', #divVtbChannels' + Link2 + 'Content, \
            #pVtbChannels' + Link3 + ', #divVtbChannels' + Link3 + 'Content, \
            #pVtbChannels'+ Link4 + ', #divVtbChannels' + Link4 + 'Content').removeClass('active show');
        }
        function getChannelsLink2() {
            $('#pVtbChannels' + Link2 + ', #divVtbChannels' + Link2 + 'Content').addClass('active show');
            $('#pVtbChannels' + Link1 + ', #divVtbChannels' + Link1 + 'Content, \
            #pVtbChannels' + Link3 + ', #divVtbChannels' + Link3 + 'Content, \
            #pVtbChannels'+ Link4 + ', #divVtbChannels' + Link4 + 'Content').removeClass('active show');
        }
        function getChannelsLink3() {
            $('#pVtbChannels' + Link3 + ', #divVtbChannels' + Link3 + 'Content').addClass('active show');
            $('#pVtbChannels' + Link1 + ', #divVtbChannels' + Link1 + 'Content, \
            #pVtbChannels' + Link2 + ', #divVtbChannels' + Link2 + 'Content, \
            #pVtbChannels'+ Link4 + ', #divVtbChannels' + Link4 + 'Content').removeClass('active show');
        }
        function getChannelsLink4() {
            $('#pVtbChannels' + Link4 + ', #divVtbChannels' + Link4 + 'Content').addClass('active show');
            $('#pVtbChannels' + Link1 + ', #divVtbChannels' + Link1 + 'Content, \
            #pVtbCategory' + Link2 + ', #divVtbChannels' + Link2 + 'Content, \
            #pVtbChannels'+ Link3 + ', #divVtbChannels' + Link3 + 'Content').removeClass('active show');
        }

        function getChannelCarouselLink1() {
            $('#Section_channelsLogOut1').removeClass('vt-channels--background-2 vt-channels--background-3 vt-channels--background-4 vt-channels--background-5');
            $('#Section_channelsLogOut1').addClass('vt-channels--background-1');
            $('#pVtbChannelCarousel' + Link1 + ', #divVtbChannelCarousel' + Link1 + 'Content, #pVtbChannelCarouselIn' + Link1 + ',#divVtbChannelCarouselIn' + Link1 + 'Content').addClass('active show');
            $('#pVtbChannelCarousel' + Link2 + ', #divVtbChannelCarousel' + Link2 + 'Content, #pVtbChannelCarouselIn' + Link2 + ',#divVtbChannelCarouselIn' + Link2 + 'Content, \
            #pVtbChannelCarousel' + Link3 + ', #divVtbChannelCarousel' + Link3 + 'Content, #pVtbChannelCarouselIn' + Link3 + ',#divVtbChannelCarouselIn' + Link3 + 'Content, \
            #pVtbChannelCarousel' + Link4 + ', #divVtbChannelCarousel' + Link4 + 'Content, #pVtbChannelCarouselIn' + Link4 + ',#divVtbChannelCarouselIn' + Link4 + 'Content, \
            #pVtbChannelCarousel' + Link5 + ', #divVtbChannelCarousel' + Link5 + 'Content, #pVtbChannelCarouselIn' + Link5 + ',#divVtbChannelCarouselIn' + Link5 + 'Content').removeClass('active show');
        }
        function getChannelCarouselLink2() {
            $('#Section_channelsLogOut1').removeClass('vt-channels--background-1 vt-channels--background-3 vt-channels--background-4 vt-channels--background-5');
            $('#Section_channelsLogOut1').addClass('vt-channels--background-2');
            $('#pVtbChannelCarousel' + Link2 + ', #divVtbChannelCarousel' + Link2 + 'Content, #pVtbChannelCarouselIn' + Link2 + ',#divVtbChannelCarouselIn' + Link2 + 'Content').addClass('active show');
            $('#pVtbChannelCarousel' + Link1 + ', #divVtbChannelCarousel' + Link1 + 'Content, #pVtbChannelCarouselIn' + Link1 + ',#divVtbChannelCarouselIn' + Link1 + 'Content, \
            #pVtbChannelCarousel' + Link3 + ', #divVtbChannelCarousel' + Link3 + 'Content, #pVtbChannelCarouselIn' + Link3 + ',#divVtbChannelCarouselIn' + Link3 + 'Content, \
            #pVtbChannelCarousel' + Link4 + ', #divVtbChannelCarousel' + Link4 + 'Content, #pVtbChannelCarouselIn' + Link4 + ',#divVtbChannelCarouselIn' + Link4 + 'Content, \
            #pVtbChannelCarousel' + Link5 + ', #divVtbChannelCarousel' + Link5 + 'Content, #pVtbChannelCarouselIn' + Link5 + ',#divVtbChannelCarouselIn' + Link5 + 'Content').removeClass('active show');
        }
        function getChannelCarouselLink3() {
            $('#Section_channelsLogOut1').removeClass('vt-channels--background-1 vt-channels--background-2 vt-channels--background-4 vt-channels--background-5');
            $('#Section_channelsLogOut1').addClass('vt-channels--background-3');
            $('#pVtbChannelCarousel' + Link3 + ', #divVtbChannelCarousel' + Link3 + 'Content, #pVtbChannelCarouselIn' + Link3 + ',#divVtbChannelCarouselIn' + Link3 + 'Content').addClass('active show');
            $('#pVtbChannelCarousel' + Link1 + ', #divVtbChannelCarousel' + Link1 + 'Content, #pVtbChannelCarouselIn' + Link1 + ',#divVtbChannelCarouselIn' + Link1 + 'Content, \
            #pVtbChannelCarousel' + Link2 + ', #divVtbChannelCarousel' + Link2 + 'Content, #pVtbChannelCarouselIn' + Link2 + ',#divVtbChannelCarouselIn' + Link2 + 'Content, \
            #pVtbChannelCarousel' + Link4 + ', #divVtbChannelCarousel' + Link4 + 'Content, #pVtbChannelCarouselIn' + Link4 + ',#divVtbChannelCarouselIn' + Link4 + 'Content, \
            #pVtbChannelCarousel' + Link5 + ', #divVtbChannelCarousel' + Link5 + 'Content, #pVtbChannelCarouselIn' + Link5 + ',#divVtbChannelCarouselIn' + Link5 + 'Content').removeClass('active show');
        }
        function getChannelCarouselLink4() {
            $('#Section_channelsLogOut1').removeClass('vt-channels--background-1 vt-channels--background-2 vt-channels--background-3 vt-channels--background-5');
            $('#Section_channelsLogOut1').addClass('vt-channels--background-4');
            $('#pVtbChannelCarousel' + Link4 + ', #divVtbChannelCarousel' + Link4 + 'Content, #pVtbChannelCarouselIn' + Link4 + ',#divVtbChannelCarouselIn' + Link4 + 'Content').addClass('active show');
            $('#pVtbChannelCarousel' + Link1 + ', #divVtbChannelCarousel' + Link1 + 'Content, #pVtbChannelCarouselIn' + Link1 + ',#divVtbChannelCarouselIn' + Link1 + 'Content, \
            #pVtbChannelCarousel' + Link2 + ', #divVtbChannelCarousel' + Link2 + 'Content, #pVtbChannelCarouselIn' + Link2 + ',#divVtbChannelCarouselIn' + Link2 + 'Content, \
            #pVtbChannelCarousel' + Link3 + ', #divVtbChannelCarousel' + Link3 + 'Content, #pVtbChannelCarouselIn' + Link3 + ',#divVtbChannelCarouselIn' + Link3 + 'Content, \
            #pVtbChannelCarousel' + Link5 + ', #divVtbChannelCarousel' + Link5 + 'Content, #pVtbChannelCarouselIn' + Link5 + ',#divVtbChannelCarouselIn' + Link5 + 'Content').removeClass('active show');
        }
        function getChannelCarouselLink5() {
            $('#Section_channelsLogOut1').removeClass('vt-channels--background-1 vt-channels--background-2 vt-channels--background-3 vt-channels--background-4');
            $('#Section_channelsLogOut1').addClass('vt-channels--background-5');
            $('#pVtbChannelCarousel' + Link5 + ', #divVtbChannelCarousel' + Link5 + 'Content, #pVtbChannelCarouselIn' + Link5 + ',#divVtbChannelCarouselIn' + Link5 + 'Content').addClass('active show');
            $('#pVtbChannelCarousel' + Link1 + ', #divVtbChannelCarousel' + Link1 + 'Content, #pVtbChannelCarouselIn' + Link1 + ',#divVtbChannelCarouselIn' + Link1 + 'Content, \
            #pVtbChannelCarousel' + Link2 + ', #divVtbChannelCarousel' + Link2 + 'Content, #pVtbChannelCarouselIn' + Link2 + ',#divVtbChannelCarouselIn' + Link2 + 'Content, \
            #pVtbChannelCarousel' + Link3 + ', #divVtbChannelCarousel' + Link3 + 'Content, #pVtbChannelCarouselIn' + Link3 + ',#divVtbChannelCarouselIn' + Link3 + 'Content, \
            #pVtbChannelCarousel' + Link4 + ', #divVtbChannelCarousel' + Link4 + 'Content, #pVtbChannelCarouselIn' + Link4 + ',#divVtbChannelCarouselIn' + Link4 + 'Content').removeClass('active show');
        }



    })