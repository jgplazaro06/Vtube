angular.module('vtCategoryCarouselService', [])

    .factory('loadCategoryCarousel', function () {

        var $ = jQuery;
        var Link1 = 'Link1';
        var Link2 = 'Link2';
        var Link3 = 'Link3';
        var Link4 = 'Link4';
        var Link5 = 'Link5';
        var Link6 = 'Link6';
        var Link7 = 'Link7';

        var CategoriesLink = $('#linVtbCategories');
        var CategoriesShow = $('#linVtbCategoriesShow');
        CategoriesLink.click(function (e) {
            e.preventDefault(); // stops link from making page jump to the top
            e.stopPropagation();
            CategoriesShow.toggle();
        });
        $('#linVtbCategoriesShow').click(function (e) {
            e.stopPropagation(); // when you click within the content area, it stops the page from seeing it as clicking the body too
        });
        $('body').click(function () {
            CategoriesShow.hide();
        });

        return {
            'init': function () {


                function getCategoriesLink1() {
                    $('#pVtbCategory' + Link1 + ', #divVtbCategory' + Link1 + 'Content').addClass('active show');
                    $('#pVtbCategory' + Link2 + ', #divVtbCategory' + Link2 + 'Content, \
                    #pVtbCategory' + Link3 + ', #divVtbCategory' + Link3 + 'Content, \
                    #pVtbCategory' + Link4 + ', #divVtbCategory' + Link4 + 'Content, \
                    #pVtbCategory' + Link5 + ', #divVtbCategory' + Link5 + 'Content, \
                    #pVtbCategory' + Link6 + ', #divVtbCategory' + Link6 + 'Content, \
                    #pVtbCategory'+ Link7 + ', #divVtbCategory' + Link7 + 'Content').removeClass('active show');
                }
                function getCategoriesLink2() {
                    $('#pVtbCategory' + Link2 + ', #divVtbCategory' + Link2 + 'Content').addClass('active show');
                    $('#pVtbCategory' + Link1 + ', #divVtbCategory' + Link1 + 'Content, \
                    #pVtbCategory' + Link3 + ', #divVtbCategory' + Link3 + 'Content, \
                    #pVtbCategory' + Link4 + ', #divVtbCategory' + Link4 + 'Content, \
                    #pVtbCategory' + Link5 + ', #divVtbCategory' + Link5 + 'Content, \
                    #pVtbCategory' + Link6 + ', #divVtbCategory' + Link6 + 'Content, \
                    #pVtbCategory'+ Link7 + ', #divVtbCategory' + Link7 + 'Content').removeClass('active show');
                }
                function getCategoriesLink3() {
                    $('#pVtbCategory' + Link3 + ', #divVtbCategory' + Link3 + 'Content').addClass('active show');
                    $('#pVtbCategory' + Link1 + ', #divVtbCategory' + Link1 + 'Content, \
                    #pVtbCategory' + Link2 + ', #divVtbCategory' + Link2 + 'Content, \
                    #pVtbCategory' + Link4 + ', #divVtbCategory' + Link4 + 'Content, \
                    #pVtbCategory' + Link5 + ', #divVtbCategory' + Link5 + 'Content, \
                    #pVtbCategory' + Link6 + ', #divVtbCategory' + Link6 + 'Content, \
                    #pVtbCategory'+ Link7 + ', #divVtbCategory' + Link7 + 'Content').removeClass('active show');
                }
                function getCategoriesLink4() {
                    $('#pVtbCategory' + Link4 + ', #divVtbCategory' + Link4 + 'Content').addClass('active show');
                    $('#pVtbCategory' + Link1 + ', #divVtbCategory' + Link1 + 'Content, \
                    #pVtbCategory' + Link2 + ', #divVtbCategory' + Link2 + 'Content, \
                    #pVtbCategory' + Link3 + ', #divVtbCategory' + Link3 + 'Content, \
                    #pVtbCategory' + Link5 + ', #divVtbCategory' + Link5 + 'Content, \
                    #pVtbCategory' + Link6 + ', #divVtbCategory' + Link6 + 'Content, \
                    #pVtbCategory'+ Link7 + ', #divVtbCategory' + Link7 + 'Content').removeClass('active show');
                }
                function getCategoriesLink5() {
                    $('#pVtbCategory' + Link5 + ', #divVtbCategory' + Link5 + 'Content').addClass('active show');
                    $('#pVtbCategory' + Link1 + ', #divVtbCategory' + Link1 + 'Content, \
                    #pVtbCategory' + Link2 + ', #divVtbCategory' + Link2 + 'Content, \
                    #pVtbCategory' + Link3 + ', #divVtbCategory' + Link3 + 'Content, \
                    #pVtbCategory' + Link4 + ', #divVtbCategory' + Link4 + 'Content, \
                    #pVtbCategory' + Link6 + ', #divVtbCategory' + Link6 + 'Content, \
                    #pVtbCategory'+ Link7 + ', #divVtbCategory' + Link7 + 'Content').removeClass('active show');
                }
                function getCategoriesLink6() {
                    $('#pVtbCategory' + Link6 + ', #divVtbCategory' + Link6 + 'Content').addClass('active show');
                    $('#pVtbCategory' + Link1 + ', #divVtbCategory' + Link1 + 'Content, \
                    #pVtbCategory' + Link2 + ', #divVtbCategory' + Link2 + 'Content, \
                    #pVtbCategory' + Link3 + ', #divVtbCategory' + Link3 + 'Content, \
                    #pVtbCategory' + Link4 + ', #divVtbCategory' + Link4 + 'Content, \
                    #pVtbCategory' + Link5 + ', #divVtbCategory' + Link5 + 'Content, \
                    #pVtbCategory'+ Link7 + ', #divVtbCategory' + Link7 + 'Content').removeClass('active show');
                }
                function getCategoriesLink7() {
                    $('#pVtbCategory' + Link7 + ', #divVtbCategory' + Link7 + 'Content').addClass('active show');
                    $('#pVtbCategory' + Link1 + ', #divVtbCategory' + Link1 + 'Content, \
                    #pVtbCategory' + Link2 + ', #divVtbCategory' + Link2 + 'Content, \
                    #pVtbCategory' + Link3 + ', #divVtbCategory' + Link3 + 'Content, \
                    #pVtbCategory' + Link4 + ', #divVtbCategory' + Link4 + 'Content, \
                    #pVtbCategory' + Link5 + ', #divVtbCategory' + Link5 + 'Content, \
                    #pVtbCategory'+ Link6 + ', #divVtbCategory' + Link6 + 'Content').removeClass('active show');
                }

                function getCategoryCarouselLink1() {
                    $('#pVtbCategoryCarousel' + Link1 + ', #divVtbCategoryCarousel' + Link1 + 'Content, #pVtbCategoryCarouselIn' + Link1 + ',#divVtbCategoryCarouselIn' + Link1 + 'Content').addClass('active show');
                    $('#pVtbCategoryCarousel' + Link2 + ', #divVtbCategoryCarousel' + Link2 + 'Content, #pVtbCategoryCarouselIn' + Link2 + ',#divVtbCategoryCarouselIn' + Link2 + 'Content, \
                    #pVtbCategoryCarousel' + Link3 + ', #divVtbCategoryCarousel' + Link3 + 'Content, #pVtbCategoryCarouselIn' + Link3 + ',#divVtbCategoryCarouselIn' + Link3 + 'Content, \
                    #pVtbCategoryCarousel' + Link4 + ', #divVtbCategoryCarousel' + Link4 + 'Content, #pVtbCategoryCarouselIn' + Link4 + ',#divVtbCategoryCarouselIn' + Link4 + 'Content, \
                    #pVtbCategoryCarousel' + Link5 + ', #divVtbCategoryCarousel' + Link5 + 'Content, #pVtbCategoryCarouselIn' + Link5 + ',#divVtbCategoryCarouselIn' + Link5 + 'Content, \
                    #pVtbCategoryCarousel' + Link6 + ', #divVtbCategoryCarousel' + Link6 + 'Content, #pVtbCategoryCarouselIn' + Link6 + ',#divVtbCategoryCarouselIn' + Link6 + 'Content, \
                    #pVtbCategoryCarousel'+ Link7 + ', #divVtbCategoryCarousel' + Link7 + 'Content, #pVtbCategoryCarouselIn' + Link7 + ',#divVtbCategoryCarouselIn' + Link7 + 'Content').removeClass('active show');
                }
                function getCategoryCarouselLink2() {
                    $('#pVtbCategoryCarousel' + Link2 + ', #divVtbCategoryCarousel' + Link2 + 'Content, #pVtbCategoryCarouselIn' + Link2 + ',#divVtbCategoryCarouselIn' + Link2 + 'Content').addClass('active show');
                    $('#pVtbCategoryCarousel' + Link1 + ', #divVtbCategoryCarousel' + Link1 + 'Content, #pVtbCategoryCarouselIn' + Link1 + ',#divVtbCategoryCarouselIn' + Link1 + 'Content, \
                    #pVtbCategoryCarousel' + Link3 + ', #divVtbCategoryCarousel' + Link3 + 'Content, #pVtbCategoryCarouselIn' + Link3 + ',#divVtbCategoryCarouselIn' + Link3 + 'Content, \
                    #pVtbCategoryCarousel' + Link4 + ', #divVtbCategoryCarousel' + Link4 + 'Content, #pVtbCategoryCarouselIn' + Link4 + ',#divVtbCategoryCarouselIn' + Link4 + 'Content, \
                    #pVtbCategoryCarousel' + Link5 + ', #divVtbCategoryCarousel' + Link5 + 'Content, #pVtbCategoryCarouselIn' + Link5 + ',#divVtbCategoryCarouselIn' + Link5 + 'Content, \
                    #pVtbCategoryCarousel' + Link6 + ', #divVtbCategoryCarousel' + Link6 + 'Content, #pVtbCategoryCarouselIn' + Link6 + ',#divVtbCategoryCarouselIn' + Link6 + 'Content, \
                    #pVtbCategoryCarousel'+ Link7 + ', #divVtbCategoryCarousel' + Link7 + 'Content, #pVtbCategoryCarouselIn' + Link7 + ',#divVtbCategoryCarouselIn' + Link7 + 'Content').removeClass('active show');
                }
                function getCategoryCarouselLink3() {
                    $('#pVtbCategoryCarousel' + Link3 + ', #divVtbCategoryCarousel' + Link3 + 'Content, #pVtbCategoryCarouselIn' + Link3 + ',#divVtbCategoryCarouselIn' + Link3 + 'Content').addClass('active show');
                    $('#pVtbCategoryCarousel' + Link1 + ', #divVtbCategoryCarousel' + Link1 + 'Content, #pVtbCategoryCarouselIn' + Link1 + ',#divVtbCategoryCarouselIn' + Link1 + 'Content, \
                    #pVtbCategoryCarousel' + Link2 + ', #divVtbCategoryCarousel' + Link2 + 'Content, #pVtbCategoryCarouselIn' + Link2 + ',#divVtbCategoryCarouselIn' + Link2 + 'Content, \
                    #pVtbCategoryCarousel' + Link4 + ', #divVtbCategoryCarousel' + Link4 + 'Content, #pVtbCategoryCarouselIn' + Link4 + ',#divVtbCategoryCarouselIn' + Link4 + 'Content, \
                    #pVtbCategoryCarousel' + Link5 + ', #divVtbCategoryCarousel' + Link5 + 'Content, #pVtbCategoryCarouselIn' + Link5 + ',#divVtbCategoryCarouselIn' + Link5 + 'Content, \
                    #pVtbCategoryCarousel' + Link6 + ', #divVtbCategoryCarousel' + Link6 + 'Content, #pVtbCategoryCarouselIn' + Link6 + ',#divVtbCategoryCarouselIn' + Link6 + 'Content, \
                    #pVtbCategoryCarousel'+ Link7 + ', #divVtbCategoryCarousel' + Link7 + 'Content, #pVtbCategoryCarouselIn' + Link7 + ',#divVtbCategoryCarouselIn' + Link7 + 'Content').removeClass('active show');
                }
                function getCategoryCarouselLink4() {
                    $('#pVtbCategoryCarousel' + Link4 + ', #divVtbCategoryCarousel' + Link4 + 'Content, #pVtbCategoryCarouselIn' + Link4 + ',#divVtbCategoryCarouselIn' + Link4 + 'Content').addClass('active show');
                    $('#pVtbCategoryCarousel' + Link1 + ', #divVtbCategoryCarousel' + Link1 + 'Content, #pVtbCategoryCarouselIn' + Link1 + ',#divVtbCategoryCarouselIn' + Link1 + 'Content, \
                    #pVtbCategoryCarousel' + Link2 + ', #divVtbCategoryCarousel' + Link2 + 'Content, #pVtbCategoryCarouselIn' + Link2 + ',#divVtbCategoryCarouselIn' + Link2 + 'Content, \
                    #pVtbCategoryCarousel' + Link3 + ', #divVtbCategoryCarousel' + Link3 + 'Content, #pVtbCategoryCarouselIn' + Link3 + ',#divVtbCategoryCarouselIn' + Link3 + 'Content, \
                    #pVtbCategoryCarousel' + Link5 + ', #divVtbCategoryCarousel' + Link5 + 'Content, #pVtbCategoryCarouselIn' + Link5 + ',#divVtbCategoryCarouselIn' + Link5 + 'Content, \
                    #pVtbCategoryCarousel' + Link6 + ', #divVtbCategoryCarousel' + Link6 + 'Content, #pVtbCategoryCarouselIn' + Link6 + ',#divVtbCategoryCarouselIn' + Link6 + 'Content, \
                    #pVtbCategoryCarousel'+ Link7 + ', #divVtbCategoryCarousel' + Link7 + 'Content, #pVtbCategoryCarouselIn' + Link7 + ',#divVtbCategoryCarouselIn' + Link7 + 'Content').removeClass('active show');
                }
                function getCategoryCarouselLink5() {
                    $('#pVtbCategoryCarousel' + Link5 + ', #divVtbCategoryCarousel' + Link5 + 'Content, #pVtbCategoryCarouselIn' + Link5 + ',#divVtbCategoryCarouselIn' + Link5 + 'Content').addClass('active show');
                    $('#pVtbCategoryCarousel' + Link1 + ', #divVtbCategoryCarousel' + Link1 + 'Content, #pVtbCategoryCarouselIn' + Link1 + ',#divVtbCategoryCarouselIn' + Link1 + 'Content, \
                    #pVtbCategoryCarousel' + Link2 + ', #divVtbCategoryCarousel' + Link2 + 'Content, #pVtbCategoryCarouselIn' + Link2 + ',#divVtbCategoryCarouselIn' + Link2 + 'Content, \
                    #pVtbCategoryCarousel' + Link3 + ', #divVtbCategoryCarousel' + Link3 + 'Content, #pVtbCategoryCarouselIn' + Link3 + ',#divVtbCategoryCarouselIn' + Link3 + 'Content, \
                    #pVtbCategoryCarousel' + Link4 + ', #divVtbCategoryCarousel' + Link4 + 'Content, #pVtbCategoryCarouselIn' + Link4 + ',#divVtbCategoryCarouselIn' + Link4 + 'Content, \
                    #pVtbCategoryCarousel' + Link6 + ', #divVtbCategoryCarousel' + Link6 + 'Content, #pVtbCategoryCarouselIn' + Link6 + ',#divVtbCategoryCarouselIn' + Link6 + 'Content, \
                    #pVtbCategoryCarousel'+ Link7 + ', #divVtbCategoryCarousel' + Link7 + 'Content, #pVtbCategoryCarouselIn' + Link7 + ',#divVtbCategoryCarouselIn' + Link7 + 'Content').removeClass('active show');
                }
                function getCategoryCarouselLink6() {
                    $('#pVtbCategoryCarousel' + Link6 + ', #divVtbCategoryCarousel' + Link6 + 'Content, #pVtbCategoryCarouselIn' + Link6 + ',#divVtbCategoryCarouselIn' + Link6 + 'Content').addClass('active show');
                    $('#pVtbCategoryCarousel' + Link1 + ', #divVtbCategoryCarousel' + Link1 + 'Content, #pVtbCategoryCarouselIn' + Link1 + ',#divVtbCategoryCarouselIn' + Link1 + 'Content, \
                    #pVtbCategoryCarousel' + Link2 + ', #divVtbCategoryCarousel' + Link2 + 'Content, #pVtbCategoryCarouselIn' + Link2 + ',#divVtbCategoryCarouselIn' + Link2 + 'Content, \
                    #pVtbCategoryCarousel' + Link3 + ', #divVtbCategoryCarousel' + Link3 + 'Content, #pVtbCategoryCarouselIn' + Link3 + ',#divVtbCategoryCarouselIn' + Link3 + 'Content, \
                    #pVtbCategoryCarousel' + Link4 + ', #divVtbCategoryCarousel' + Link4 + 'Content, #pVtbCategoryCarouselIn' + Link4 + ',#divVtbCategoryCarouselIn' + Link4 + 'Content, \
                    #pVtbCategoryCarousel' + Link5 + ', #divVtbCategoryCarousel' + Link5 + 'Content, #pVtbCategoryCarouselIn' + Link5 + ',#divVtbCategoryCarouselIn' + Link5 + 'Content, \
                    #pVtbCategoryCarousel'+ Link7 + ', #divVtbCategoryCarousel' + Link7 + 'Content, #pVtbCategoryCarouselIn' + Link7 + ',#divVtbCategoryCarouselIn' + Link7 + 'Content').removeClass('active show');
                }
                function getCategoryCarouselLink7() {
                    $('#pVtbCategoryCarousel' + Link7 + ', #divVtbCategoryCarousel' + Link7 + 'Content, #pVtbCategoryCarouselIn' + Link7 + ',#divVtbCategoryCarouselIn' + Link7 + 'Content').addClass('active show');
                    $('#pVtbCategoryCarousel' + Link1 + ', #divVtbCategoryCarousel' + Link1 + 'Content, #pVtbCategoryCarouselIn' + Link1 + ',#divVtbCategoryCarouselIn' + Link1 + 'Content, \
                    #pVtbCategoryCarousel' + Link2 + ', #divVtbCategoryCarousel' + Link2 + 'Content, #pVtbCategoryCarouselIn' + Link2 + ',#divVtbCategoryCarouselIn' + Link2 + 'Content, \
                    #pVtbCategoryCarousel' + Link3 + ', #divVtbCategoryCarousel' + Link3 + 'Content, #pVtbCategoryCarouselIn' + Link3 + ',#divVtbCategoryCarouselIn' + Link3 + 'Content, \
                    #pVtbCategoryCarousel' + Link4 + ', #divVtbCategoryCarousel' + Link4 + 'Content, #pVtbCategoryCarouselIn' + Link4 + ',#divVtbCategoryCarouselIn' + Link4 + 'Content, \
                    #pVtbCategoryCarousel' + Link5 + ', #divVtbCategoryCarousel' + Link5 + 'Content, #pVtbCategoryCarouselIn' + Link5 + ',#divVtbCategoryCarouselIn' + Link5 + 'Content, \
                    #pVtbCategoryCarousel'+ Link6 + ', #divVtbCategoryCarousel' + Link6 + 'Content, #pVtbCategoryCarouselIn' + Link6 + ',#divVtbCategoryCarouselIn' + Link6 + 'Content').removeClass('active show');
                }

                $('#pVtbCategory' + Link1).click(function () {
                    getCategoriesLink1();
                });
                $('#pVtbCategory' + Link2).click(function () {
                    getCategoriesLink2();
                });
                $('#pVtbCategory' + Link3).click(function () {
                    getCategoriesLink3();
                });
                $('#pVtbCategory' + Link4).click(function () {
                    getCategoriesLink4();
                });
                $('#pVtbCategory' + Link5).click(function () {
                    getCategoriesLink5();
                });
                $('#pVtbCategory' + Link6).click(function () {
                    getCategoriesLink6();
                });
                $('#pVtbCategory' + Link7).click(function () {
                    getCategoriesLink7();
                });

                $('#pVtbCategoryCarousel' + Link1 + ', #pVtbCategoryCarouselIn' + Link1 + '').click(function () {
                    getCategoryCarouselLink1();
                });
                $('#pVtbCategoryCarousel' + Link2 + ', #pVtbCategoryCarouselIn' + Link2 + '').click(function () {
                    getCategoryCarouselLink2();
                });
                $('#pVtbCategoryCarousel' + Link3 + ', #pVtbCategoryCarouselIn' + Link3 + '').click(function () {
                    getCategoryCarouselLink3();
                });
                $('#pVtbCategoryCarousel' + Link4 + ', #pVtbCategoryCarouselIn' + Link4 + '').click(function () {
                    getCategoryCarouselLink4();
                });
                $('#pVtbCategoryCarousel' + Link5 + ', #pVtbCategoryCarouselIn' + Link5 + '').click(function () {
                    getCategoryCarouselLink5();
                });
                $('#pVtbCategoryCarousel' + Link6 + ', #pVtbCategoryCarouselIn' + Link6 + '').click(function () {
                    getCategoryCarouselLink6();
                });
                $('#pVtbCategoryCarousel' + Link7 + ', #pVtbCategoryCarouselIn' + Link7 + '').click(function () {
                    getCategoryCarouselLink7();
                });



            },

            'initCarousel': function () {

                $('#crslVtbCategories, #crslVtbCategoriesIn').owlCarousel({
                    rtl: false,
                    loop: false,
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

            }

        }

    })