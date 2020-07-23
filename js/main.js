$(document).ready(function () {
    let header = $('.header__top'),
        top = $(".footer").offset().top;

    $(window).scroll(function() {
        let scrolled = $(window).scrollTop(),
            height = $(window).height();   

        if ( scrolled > top - height) {
            header.addClass('out');
        } else {
            header.removeClass('out');
        }
    });
});

let i = 1;

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

$(window).on("load", function() {
    let height = $(".header__top").height();
    $("a[rel='m_PageScroll2id']").mPageScroll2id({
        offset: height
    });
});

function buttonHover(){
    let isTouch = !!("ontouchstart" in window)
     || window.navigator.msMaxTouchPoins > 0;
    if (isTouch){
        document.querySelector(".menu__list-btn").classList.add("menu__list-btn-hover-none");
        document.querySelector(".header__content-link").classList.add("header__content-link-hover-none");
    }
}
buttonHover();