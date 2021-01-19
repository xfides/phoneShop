/**
 START to open/close questions/answer - block ".wrapQuestions"
 =============================================================================
 */
function toInitQuestions() {

  var questionsMain = $(".questions__main");
  questionsMain.on("click", ".qItem__question", function (event) {
    var qItemQuestion = $(this).toggleClass('qItem__question--close');
    var qItemAnswer = $(this).next(".qItem__answer");
    qItemAnswer.slideToggle("fast");
  });

}
/**
 END to open/close questions/answer - block ".wrapQuestions"
 =============================================================================
 */

/**
 START to initialize map
 =============================================================================
 */
function toInitMap() {

  var windowWidth = window.innerWidth;

  //позиция маркера на карте
  var myMarker = new google.maps.LatLng(55.7355585, 37.6736701);
  // позиция центра отображаемой карты
  var myLatlng;

  if (windowWidth <= 768) {
    myLatlng = new google.maps.LatLng(55.847509, 37.655817);
  } else {
    myLatlng = new google.maps.LatLng(55.7494733, 37.35232);
  }

  var mapOptions = {
    center: myLatlng,
    zoom: 10,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.DEFAULT,
    },
    disableDoubleClickZoom: false,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
    },
    scaleControl: true,
    scrollwheel: false,
    panControl: true,
    streetViewControl: true,
    draggable: true,
    overviewMapControl: true,
    overviewMapControlOptions: {
      opened: false
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var mapElement = document.getElementById('mapId');
  var map = new google.maps.Map(mapElement, mapOptions);
  var marker = new google.maps.Marker({
    position: myMarker,
    map: map,
    title: "Мы  - крутая фирма!"
  });
}
/**
 END to initialize map
 =============================================================================
 */

/**
 START to initialize button scrolling up
 =============================================================================
 */
function toInitBtnScrollUp() {
  // сама кнопка с документом
  var html = document.documentElement;
  var body = document.body;
  var btnUp = document.querySelector(".btnUp");

  // функция скролла вверх
  function toScrollTop() {
    $('html, body').animate({scrollTop: 0}, 500);
    return false;
  };

  // показ кнопки прокрутить вверх
  $(window).scroll(function () {
    var scrollTop = html.scrollTop || body && body.scrollTop || 0;
    scrollTop -= html.clientTop;
    if (scrollTop > 700) {
      btnUp.style.display = "block";
    } else {
      btnUp.style.display = "none";
    }
  });

  // выполнить действие проскролить вверх
  $(btnUp).click(toScrollTop);
}
/**
 END to initialize button scrolling up
 =============================================================================
 */

/**
 START to initialize way-point plugin
 =============================================================================
 */
function toInitWayPoints() {
  var waypointMap = new Waypoint({
    element: document.getElementById('mapId'),
    offset: "100%",
    handler: function (direction) {
      toInitMap();
      this.destroy();
    }
  });

  var waypointRadialBar = new Waypoint({
    element: document.getElementById('wayPointTrust'),
    offset: "70%",
    handler: function (direction) {
      toInitRadialBars();
      this.destroy();
    }
  })
}
/**
 END to initialize way-point plugin
 =============================================================================
 */

/**
 START to initialize radial-bar plugin
 =============================================================================
 */
function toInitRadialBars() {

  // функция отрисовки одного кружка
  function toStartCircle(wrapCircle) {
    var wrapCircleClass = wrapCircle.attr('id');
    var circle = wrapCircle.find('.trustMain__circle').eq(0);
    var innerSpanValue = wrapCircle.find('.trustMain__number').eq(0);
    var number = parseInt(innerSpanValue.text());
    if (isNaN(number)) {
      number = 0
    }
    var duration;

    switch (wrapCircleClass) {
      case "circleYears" :
        duration = 1000;
        break;
      case "circleClients" :
        duration = 4000;
        break;
      case "circleGuarantee" :
        duration = 3000;
        break;
      case "circleAdvice" :
        duration = 2000;
        break;
    }

    circle.on('circle-animation-progress', function (e, p, v) {
      innerSpanValue.text((v * number).toFixed());
    });

    circle.circleProgress({
      value: 1,
      size: 180,
      thickness: 25,
      startAngle: -Math.PI / 2,
      emptyFill: "#ffffff",
      animation: {duration: duration},
      fill: {color: "#ffc342"}
    });
  }

  var wrapCircles = $('.trustMain__item');

  if (wrapCircles.length === 0) {
    return
  }

  wrapCircles.each(function (index) {
    toStartCircle($(wrapCircles[index]));
  })

}
/**
 END to initialize radial-bar plugin
 =============================================================================
 */

/**
 START to load siblings videos in iFrame
 =============================================================================
 */
function toInitVideoLinks() {
  var videoProduct = $('.videoProduct');

  videoProduct.on('click', 'a', function (event) {
    var iFrameVideo = $('.videoProduct').find('iframe');
    event.preventDefault();
    var newVideoLink = $(this).attr('href');
    console.log(iFrameVideo);
    iFrameVideo.attr('src', newVideoLink);
  });
}
/**
 END to load siblings videos in iFrame
 =============================================================================
 */

/**
 START to do visible all user comment text in section COMMENTS
 =============================================================================
 */
function toInitReadFurtherLinks() {
  var comments = $('.comments');
  comments.on('click', '.productCmtText__readFurther', function (event) {
    var readFurtherLink = $(this).siblings('.productCmtText__text').eq(0);
    console.log(readFurtherLink);
    readFurtherLink.addClass('productCmtText__text--open');
    $(this).slideUp('fast');
  })
}
/**
 END to do visible all user comment text in section COMMENTS
 =============================================================================
 */

/**
 START to do accessible additional info in section FEATURES
 by clicking Question Mark
 =============================================================================
 */
function toInitQuestionMark() {
  var features = $('.features');
  features.on("click", ".traitsQuestionMark", function (event) {
    $(this).siblings(".traitsTdInfo").slideDown('fast');
  })
}
/**
 END to do accessible additional info in section FEATURES
 by clicking Question Mark
 =============================================================================
 */

/**
 START to Close modals and popovers on the tablet PC and mobiles
 phones, when users don't have mouse and can only click and press
 Escape key on the keyboard
 =============================================================================
 */
function toCloseElements() {

  function toCloseElementsByClick() {
    $("body").click(function (event) {
      //если кликнули по крестику - без разговоров закрываем окно
      if ($(event.target).hasClass("modalItem__closeJS")) {
        $("html").css({"overflow":"auto", "margin-right": "0px"});
        /*$("body").css("padding-right","0px");*/
        $(event.target).parents((".modalItem")).fadeOut("fast");
        return;
      }

      /*
       * если не по крестику взять все "выносные" элементы
       * и посмотреть открыт хотя бы один из них?
       * Если никто не открыт - завершение функции
       * */

      var upElems = $(".upElemJs");
      var flagHidden = false;

      upElems.each(function (index) {
        if ($(this).css('display') === 'none') {
          flagHidden = true;
        }
      });
      if (!flagHidden) {
        return
      }

      /*
       * Если кликнули по "выносному элементу" - ничего не делать.
       * Если кликнули мимо "выносного элемента" -
       * скрыть все "выносные элементы". В исключения добавить надо также
       * кнопки вызовов модальных окон
       *
       * */

      if (($(event.target).hasClass('upElemJs'))
          || ($(event.target).parents('.upElemJs').length !== 0 )
          || ($(event.target).hasClass('traitsQuestionMark'))
            /*ИСКЛЮЧЕНИЯ - КНОПКИ ВЫЗОВОВ МОДАЛОК И ПРОЧИХ ВЕХНИХ ЭЛЕМЕНТОВ*/
          || ($(event.target).is('button'))
          || ($(event.target).is('a'))
      ) {
        return;
      } else {
        $("html").css({"overflow":"auto", "margin-right": "0px"});
        /*$("body").css("padding-right","0px");*/
        upElems.each(function (index) {
          $(this).fadeOut('fast');
        })
      }

    })
  }

  function toCloseElementsByESC() {
    $("body").keydown(function (event) {
      if (event.keyCode == 27) {
        $("html").css({"overflow":"auto", "margin-right": "0px"});
        /*$("body").css("padding-right","0px");*/
        var upElems = $(".upElemJs");
        if (upElems.length === 0) {
          return
        }
        upElems.each(function (index) {
          $(this).fadeOut('fast');
        });
      }
    });
  }

  toCloseElementsByClick();
  toCloseElementsByESC();

}
/**
 END to Close modals and popovers on the tablet PC and mobiles
 phones, when users don't have mouse and can only click and press
 Escape key on the keyboard
 =============================================================================
 */

/**
 START to initialize slider
 =============================================================================
 */
function toInitSlider() {

  var slider = $('.slider');
  var sliderNav = $('.slider-nav');
  var sliderFor = $('.slider-for');
  var zoomBtn = $('.slider-for__zoomBtn');

  // отображение слайдера проиходит только после его инициализации
  // чтобы пользователь не видел на экране как он собирается
  sliderNav.on('init', function () {
    slider.removeClass('sliderJSPreInit');
  });

  sliderFor.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.slider-nav',
    lazyLoad: 'progressive',
    mobileFirst: true,
    zIndex: 25,
    slide: '.slideTop'
  });
  sliderNav.slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    autoplay: false,
    autoplaySpeed: 5000,
    centerPadding: '0px',
    lazyLoad: 'progressive',
    mobileFirst: true,
    zIndex: 25,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4
        }
      }
    ]
  });

  zoomBtn.click(function (event) {

    var currentSlide = $('.slider-for .slick-current');

    sliderIsBig = sliderFor.hasClass('bigSlider');

    if (!sliderIsBig) {
      sliderFor.fadeOut("fast", function () {

        //свернуть текущий слайд
        currentSlide.slideUp(50);

        //расширить слайдер на весь экран
        sliderFor.addClass("bigSlider");

        // показать расширенный слайдер
        sliderFor.fadeIn("fast", function () {

          sliderFor.slick('setPosition');
          currentSlide.slideDown();

        });

      });
    } else {
      sliderFor.fadeOut("fast", function () {

        //свернуть текущий слайд
        currentSlide.slideUp(50);

        //удалить слайдер на весь экран
        sliderFor.removeClass("bigSlider");

        // показать ужатый первоначальный слайдер
        sliderFor.fadeIn("fast", function () {

          sliderFor.slick('setPosition');
          currentSlide.slideDown();

        });

      });
    }

  })

}
/**
 END to initialize slider
 =============================================================================
 */

/**
 START to init promo countDown in section product
 =============================================================================
 */
function toInitCountDown() {

  var promoTitle1 = $('.promoTitle1');
  var countDown = $('.countDown');
  var clockDiv = $('.clock');

  var time = clockDiv.text().trim();

  var timerCountDown = clockDiv.countdown(time);
  timerCountDown.on('update.countdown', function (event) {
    var $this = $(this).html(event.strftime(''
        + '<span class="clock__block"><span>%-D</span><br/>'
        + '<span class="countDown__word">%!D:день,дней;</span></span>:'
        + '<span class="clock__block"><span>%H</span><br/>'
        + '<span class="countDown__word">%!H:час,часов;</span></span>:'
        + '<span class="clock__block"><span>%M</span><br/>'
        + '<span class="countDown__word">%!M:минута,минут;</span></span>:'
        + '<span class="clock__block"><span>%S</span><br/>'
        + '<span class="countDown__word">%!S:секунда,секунд;</span></span>'));
  });

  timerCountDown.on('finish.countdown', function (event) {
    promoTitle1.hide(100);
    countDown.hide(100);
  });

  clockDiv.removeClass('clock--hideFont');

}

var flagStartCountDownPromo = false;
function toInitCountDownPromo() {

  if(flagStartCountDownPromo) {
    return;
  }

  flagStartCountDownPromo = false;
  var clockDiv = $('.mPromoMainCounter__div');
  var time = clockDiv.attr("data-count").trim();



  var timerCountDown = clockDiv.countdown(time);

  timerCountDown.on('update.countdown', function(event) {
        var format = '%H:%M:%S';
        $(this).html(event.strftime(format));
      })
      .on('finish.countdown', function(event) {
        $(this).html('акция закончилась')
      });

  flagStartCountDownPromo = true;


}
/**
 END to init promo countDown in section product
 =============================================================================
 */

/**
 START to draw/paint user's scores/stars
 =============================================================================
 */
function toPaintStars(wrapElem) {
  var radioLabels = wrapElem.find('.icon-star--modal');

  wrapElem.on("click", ".icon-star--modal", function (event) {

    //получили индекс выбранной пользователем звездочки
    var indexLabel = $(event.target).next().val();
    indexLabel = +indexLabel;

    //подчищаем все хвосты оставленных звездочек
    radioLabels.each(function (indexElem) {
      $(this).removeClass('icon-star--orange');
      $(this).removeClass('icon-star--gray');
      $(this).addClass('icon-star--gray');
    });

    //рисуем/закрашиваем звездочки
    for (var i = 1; i <= indexLabel; i++) {
      var colorSelector = ':nth-of-type(' + i + ')';
      radioLabels.filter(colorSelector).removeClass('icon-star--gray');
      radioLabels.filter(colorSelector).addClass('icon-star--orange');
    }

  })

}
/**
 END to draw/paint user's scores/stars
 =============================================================================
 */

/**
 START переделать верх модального окна в таблицу
 =============================================================================
 */
function toRebuildTopIntoTable() {
  var table = $('.mToOrder').find('table');
  var divInsteadTable = $('.mToOrderGoods');
  var innerParts = [];
  innerParts.push(divInsteadTable.find('.mToOrderGoodsOne'));
  innerParts.push(divInsteadTable.find('.mToOrderGoodsOne__infoOne').clone());
  innerParts.push(divInsteadTable.find('.mToOrderGoodsLot'));
  innerParts.push(divInsteadTable.find('.mToOrderGoodsPrice'));
  innerParts.push(divInsteadTable.find('.mToOrderGoodsTotal'));

  for (var i = 1; i <= 5; i++) {
    var selector = 'td:nth-of-type(' + i + ')';
    var tdEmpty = table.find(selector);
    tdEmpty.append(innerParts[i - 1]);
  }

}
/**
 END переделать верх модального окна в таблицу
 =============================================================================
 */

/**
 START to hook on button for modals THEME - FEEDBACK
 =============================================================================
 */
function toInitModals() {

  //  находим кнопки вызова модалок
  var shopFeedBackBtn = $('.feedback').find('.addComment__btn');
  var goodsFeedBackBtn = $('.comments').find('.addComment__btn');
  var toOrderBtn = $('.promoItem').find('.toOrder__btn');
  var navLink1 = $('.header').find('.nav__link--1');
  var navLink2 = $('.header').find('.nav__link--2');
  var navLink3 = $('.header').find('.nav__link--3');

  /*
   * на каждую кнопку вызова модалки вешаем показ / открытие
   * самой модалки
   * */

  // модалка отзыва о МАГАЗИНЕ
  shopFeedBackBtn.click(function () {
    $("html").css({"overflow":"hidden", "margin-right": "17px"});
    var modalShopComment = $('.mShopComment');
    modalShopComment.fadeIn("fast");
    toPaintStars(modalShopComment);
  });

  // модалка отзыва о ТОВАРЕ
  goodsFeedBackBtn.click(function () {
    $("html").css({"overflow":"hidden", "margin-right": "17px"});
    var modalGoodsComment = $('.mGoodsComment');
    modalGoodsComment.fadeIn("fast");
    toPaintStars(modalGoodsComment);
  });

  // модалка окна ЗАКАЗА ТОВАРА
  toOrderBtn.click(function () {
    $("html").css({"overflow":"hidden", "margin-right": "17px"});
    var modalGoodsComment = $('.mToOrder');

    // если ширина экрана больше мобилки, перестроить верх модалки
    // в таблицу
    if ($(window).outerWidth() >= 768) {
      toRebuildTopIntoTable();
    }

    modalGoodsComment.fadeIn("fast");

    // рассчет значений ХАРАКТЕРИСТИК ЗАКАЗА
    toCalcOrderParameters();
  });

  // модалка ИНСТРУКЦИЯ ОПЛАТЫ СЧЕТА
  navLink1.click(function () {
    $("html").css({"overflow":"hidden", "margin-right": "17px"});
    var modalInstructions = $('.mInstructions');
    modalInstructions.fadeIn('fast');
  });

  // модалка успешного (мб неуспешной) СОЗДАНИЯ ЗАКАЗА
  navLink2.click(function () {
    $("html").css({"overflow":"hidden", "margin-right": "17px"});
    var modalResultOrder = $('.mResultOrder');
    modalResultOrder.fadeIn('fast');
  });

  navLink3.click(function () {
    $("html").css({"overflow":"hidden", "margin-right": "17px"});
    var modalPromo = $('.mPromo');

    modalPromo.fadeIn('fast', function () {
      toInitCountDownPromo();
    });
  })

}
/**
 END to hook on button for modals THEME - FEEDBACK
 =============================================================================
 */

/**
 START to increase and decrease counter for goods
 =============================================================================
 */
var flagOpenCompleteModalOrder = false;
function toCalcOrderParameters() {

  /**
   START to init modal ORDER quantities (это не открытие самой модалки
   это расчет значений заказанного товара / товаров)
   =============================================================================
   */
  function toInitModalOrder() {

    // переменные верхнего блока
    var tdTotal = $('.mToOrderGoodsTotal strong');
    var tdQuantity = $('.mToOrderGoodsLot__input--count');
    var tdPrice = $('.mToOrderGoodsPrice strong');
    var tdQuantityVal = tdQuantity.val();
    var tdPriceVal = tdPrice.text().trim().slice(1);
    var tdPriceCurrency = tdPrice.text().trim().slice(0, 1);
    var tdTotalSum = Number(tdQuantityVal) * Number(tdPriceVal);

    // переменные 2 блока сверху
    var spanSum = $('.mToOrderSumInfo--money strong');
    var spanDeliveryCost = $('.mToOrderSumInfo--delivery strong');
    var spanDeliveryCostVal = Number(spanDeliveryCost.text().trim().slice(1));
    var spanTotalCost = $('.mToOrderSumInfo--total strong');
    var totalCost = 0;

    if ((  (isNaN(tdQuantityVal))  ) || (tdQuantityVal <= 0)) {
      tdQuantity.val(0);
      tdTotal.text(0);

      // стоимость без учета доставки
      tdTotalSum = 0;
    }

    // стоимость с учетом дотавки
    totalCost = tdTotalSum + spanDeliveryCostVal;
    if (tdTotalSum === 0) {
      totalCost = 0;
    }

    tdTotal.text(tdPriceCurrency + tdTotalSum);
    spanSum.text(tdPriceCurrency + tdTotalSum);
    spanTotalCost.text(tdPriceCurrency + totalCost);
  }

  /**
   END to init modal ORDER quantities (это не открытие самой модалки
   это расчет значений заказанного товара / товаров)
   =============================================================================
   */


  var mToOrderForm__blockGoods = $('.mToOrderForm__block--goods');
  var mToOrderGoodsLot = $('.mToOrderGoodsLot');
  var counterInput = mToOrderGoodsLot.find('.mToOrderGoodsLot__input--count');
  var minus = mToOrderGoodsLot.find('.mToOrderGoodsLot__span--minus');
  var plus = mToOrderGoodsLot.find('.mToOrderGoodsLot__span--plus');

  // первоначальная инициализация
  mToOrderForm__blockGoods.click(toInitModalOrder);
  toInitModalOrder();

  //обработка + -
  if(!flagOpenCompleteModalOrder){
    minus.click(function (event) {

      var counterInputVal = +(counterInput.val());

      if ((  (isNaN(counterInputVal))  ) || (counterInputVal <= 0)) {
        counterInput.val(0);
      } else {
        counterInput.val(counterInputVal - 1);
      }

      toInitModalOrder();
    });
    plus.click(function (event) {
      var counterInputVal = +(counterInput.val());

      if ((  (isNaN(counterInputVal))  ) || (counterInputVal < 0)) {
        counterInput.val(0);
      } else {
        counterInput.val(counterInputVal + 1);
      }

      toInitModalOrder();
    });
    flagOpenCompleteModalOrder = true;
  }

  //скопировать radioButton
  var checkedIndexId = null;
  var radioMain = $('.product__block .chooseColor');
  var radioMainInputs = radioMain.find('input');
  var radioModalInputs = $('.chooseColor--modal input');

  radioMainInputs.each(function (indexElem) {
    if ($(this).prop('checked') === true) {
      checkedIndexId = $(this).prop('id');
    }
  });
  radioModalInputs.each(function (indexElem) {
    var inputModalId = $(this).prop('id');
    if (inputModalId.indexOf(checkedIndexId) !== -1) {
      $(this).prop('checked', true);
    }
  })

}
/**
 END to increase and decrease counter for goods
 =============================================================================
 */

/**
  START to cut block with Characteristics
=============================================================================
*/
function toCutProductInfo () {
  /*блоки*/
  var featuresInner = $('.featuresInner');
  var featureBlockFirst = $('.features__block:first-of-type');
  /*их высота*/
  var featuresInnerHeight = featuresInner.height();
  var featureBlockFirstHeight = featureBlockFirst.height();

  /*подрезка по первый блок*/
  var cutHeight = Number (featureBlockFirstHeight) + 55 + "px";
  featureBlockFirst.css("padding-bottom", "60px");
  featuresInner.css("height", cutHeight);

  /*обрабатываем раскрыие блока и прячем клавишу по его завершению*/
  var showMoreBtn = $('.showMore--features button');
  showMoreBtn.click(function () {
    featuresInner.css("height", featuresInnerHeight);
    featureBlockFirst.css("padding-bottom", "0px");
    $(this).parent().slideUp("fast");
    /*featuresInner.css("height", "auto");*/
  })

}
/**
  END to cut block with Characteristics
=============================================================================
*/


$(document).ready(function () {
  toInitSlider();
  toInitCountDown();
  toInitWayPoints();
  toInitReadFurtherLinks();
  toInitQuestionMark();
  toInitQuestions();
  toInitVideoLinks();
  toInitBtnScrollUp();
  toCloseElements();
  toInitModals();
  toCutProductInfo();
});
