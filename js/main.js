let i = 1;

$(document).ready(function () {
    let height = $(window).height(),
        header = $('.header__top'),
        top = $(".footer").offset().top;   


    $(".menu__list, .footer__menu-list, .header__content, .coronavirus__content").on("click","a", function (event) {
        event.preventDefault();
        let id  = $(this).attr('href'),
            top = $(id).offset().top - header.height();
        $('body,html, .header__content-link, .coronavirus__content-link').animate({scrollTop: top}, 1500);
    });

    $(window).scroll(function() {
        let scrolled = $(window).scrollTop();
        if ( scrolled > top - height) {
            header.addClass('header__top--out');
        } else {
            header.removeClass('header__top--out');
        }
    });
});

function activation(arr) {
    if (i === arr.length) {
        i = 0;
    }
    if (i === 0) {
        j = arr.length - 1;
    } else {
        j = i - 1;
    }
    arr[j].classList.remove("contagion__item--active");
    arr[i].classList.add("contagion__item--active");
    i++;
}

function contagionActivation() {
    let contagionItems = document.querySelector(".contagion__items");
    let contagionItemsList = contagionItems.children;
    let arrHeight = [];
    for (let i = 0; i < contagionItemsList.length; i++){
        arrHeight[i] = contagionItemsList[i].clientHeight;
    }
    const maxHeight = Math.max.apply(null, arrHeight);
    for (let i = 0; i < contagionItemsList.length; i++){
        contagionItemsList[i].style.height = maxHeight + "px";
    }

    setInterval(activation, 4000, contagionItemsList);
}

contagionActivation();

jQuery('#vmap').vectorMap({
    map: 'world_en',
    backgroundColor: 'transparent',
    borderColor: '#167C51',
    borderOpacity: 1,
    borderWidth: 1,
    color: '#167C51',
    enableZoom: true,
    hoverColor: '#F44A45',
    hoverOpacity: null,
    normalizeFunction: 'linear',
    scaleColors: ['#b6d6ff', '#005ace'],
    selectedColor: '#c9dfaf',
    selectedRegions: null,
    showTooltip: true,
    onRegionClick: function (element, code, region) {
        var message = 'You clicked "'
            + region
            + '" which has the code: '
            + code.toUpperCase();

        alert(message);
    }
});

function checkContent() {
    let size = document.querySelectorAll(".control__country").length;
    if (size === 0 || size === 1) {
        document.querySelector(".control__arrows").style.display = "none";
    }
}
checkContent();

document.getElementById("control__arrow-prev").addEventListener("click", function (e) {
    let arrow = this;

    if (!arrow.classList.contains("arrow-finish")) {
        let countriesList = document.querySelector(".control__content").children;
        let index = searchControlActive(countriesList);

        countriesList[index].classList.remove("control__countries--active");
        countriesList[--index].classList.add("control__countries--active");

        if (index == 0) {
            arrow.classList.add("arrow-finish");
        }
        let next = document.querySelector("#control__arrow-next");
        next.classList.remove("arrow-finish");
    }
});

document.getElementById("control__arrow-next").addEventListener("click", function () {
    let arrow = this;

    if (!arrow.classList.contains("arrow-finish")) {
        let countriesList = document.querySelector(".control__content").children;
        let index = searchControlActive(countriesList);

        countriesList[index].classList.remove("control__countries--active");
        countriesList[++index].classList.add("control__countries--active");
        if (index == countriesList.length - 1) {
            arrow.classList.add("arrow-finish");
        }
        let prev = document.querySelector("#control__arrow-prev");
        prev.classList.remove("arrow-finish");
    }
});

function searchControlActive(countriesList) {
    for (let i = 0; i < countriesList.length; i++) {
        if (countriesList[i].classList.contains("control__countries--active")) {
            return i;
        }
    }
}

document.querySelector(".map__form-search-btn").addEventListener("click", function(){
    let input = document.querySelector(".map__form-search-input");
    if (input.classList.contains("map__form-search-input--active") && input.value === "") {
        input.classList.remove("map__form-search-input--active");
    } else {
        input.classList.add("map__form-search-input--active");
    }
});

function buttonHover(){
    let isTouch = !!("ontouchstart" in window)
     || window.navigator.msMaxTouchPoins > 0;
    if (isTouch){
        document.querySelector(".menu__list-btn").classList.add("menu__list-btn-hover--none");
        document.querySelector(".header__content-link").classList.add("header__content-link-hover--none");
        document.querySelectorAll(".footer__list-link").forEach((el)=>{
            el.classList.add("footer__list-link-hover--none");
        });
    }
}
buttonHover();

function getCoords(elem){
    let box = elem.getBoundingClientRect(),
    body = document.body, docEl = document.documentElement,
    scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
    scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft,
    clientTop = docEl.clientTop || body.clientTop || 0,
    clientLeft = docEl.clientLeft || body.clientLeft || 0,
    top = box.top + scrollTop - clientTop,
    left = box.top + scrollLeft - clientLeft;
    return {
        top: top,
        left: left
    };
}

window.addEventListener("scroll", ()=>{
    let windowScrollTop = document.documentElement.scrollTop,
        windowHeight = window.innerHeight,
        listMenu = document.querySelector(".header__top .menu__list").children,
        listSections = document.querySelectorAll(".section-menu-scroll");

    listSections.forEach((elem, i) => {
        let elemTop = getCoords(elem).top,
            elemHeight = elem.clientHeight;

        if (elemTop <= windowScrollTop + windowHeight && elemTop + elemHeight >= windowScrollTop) {
            for (j = 0; j < listMenu.length; j++){
                if (j != i){
                    if (listMenu[j].children[0].classList.contains("menu__list-link--active")){
                        listMenu[j].children[0].classList.remove("menu__list-link--active");
                    }
                    if (listMenu[j].children[0].classList.contains("menu__list-btn--active") || listMenu[j].children[0].classList.contains("menu__list-btn--none")){
                        listMenu[j].children[0].classList.remove("menu__list-btn--none");
                        listMenu[j].children[0].classList.remove("menu__list-btn--active");
                    }
                }
            }
            if (i === listSections.length - 1) {
                listMenu[i].children[0].classList.add("menu__list-btn--active");
                setTimeout(()=>{
                    listMenu[i].children[0].classList.add("menu__list-btn--none");
                }, 400);
            } else {
                listMenu[i].children[0].classList.add("menu__list-link--active");
            }
        }
    });
});