new WOW({
    animateClass: 'animate__animated',
}).init();


$('.carousel__main-slick').slick({
    centerMode: true,
    variableWidth: true,
    adaptiveHeight: true,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    responsive: [
        {
            breakpoint: 1129,
            settings: {
                arrows: false,
                centerMode: true,
                slidesToShow: 2,
                adaptiveHeight: true
            }
        },
        {
            breakpoint: 650,
            settings: {
                arrows: false,
                centerMode: true,
                slidesToShow: 1,
                adaptiveHeight: true
            }
        }
    ]
});


//•	При нажатии на кнопки «Заказать звонок», «Узнать подробнее», «Получить консультацию» страница должна прокручиваться к блоку «Получите индивидуальную консультацию»


$('.main__content-btn').on('click', function () {
    $('#consultScroll')[0].scrollIntoView({behavior: "smooth"});
});

$('.btnYellow').click(() => {
    $('#consultScroll')[0].scrollIntoView({behavior: "smooth"});
})

// •	При нажатии на фотографию в блоке «Наши проекты» она должна открываться на весь экран (можно использовать библиотеку magnific popup)

$('.projects__projectOne-pics').magnificPopup({
    delegate: 'a', // child items selector, by clicking on it popup will open
    type: 'image'

});

//New 3 projects


$('.projects__moreProjects-text').click(() => {
    $('.projects__moreProjects-modal').show();
    $('.projects__moreProjects-text').hide();
    $('.projects__moreProjects-textHide').css('display', 'flex');
})

$('.projects__moreProjects-textHide').click(() => {
    $('.projects__moreProjects-modal').hide(500);
    $('.projects__moreProjects-text').show();
    $('.projects__moreProjects-textHide').hide();
})

//Header-popup

$('.header__menu-popup').click(() => {
    $('.popup__header').show(500).css('display', 'flex');
})

$('#popup-close').click(() => {
    $('.popup__header').hide(500);
})

//Form-validation


let name = $('#inputName');
let tel = $('#inputTel');
let inputChecked = $('#input-checked');
let textChecked = $('.text, #input__checked-a');
let loader = $('.loader');
let hasError = false;

tel.inputmask({"mask": "+9 (999) 999-9999"});
const styleSuccess = {
    element: 'border',
    style: '2px solid green'
}
const styleFail = {
    element: 'border',
    style: '2px solid red'
}

//For inputChecked

const styleFailChecked = {
    element: 'color',
    style: 'red'
}
const styleSuccessChecked = {
    element: 'color',
    style: 'green'
}


function returnTextError(fieldName) {
    return `<div class="error">Необходимо ввести ${fieldName}</div>`
}

$('[name=quantity]').bind('change keyup input click', function () {
    if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9]/g, '');
    }
});

$('#consultBtn').click(function () {
    $('.error').remove();
    $('.errorChecked').remove();
    hasError = false;

    if (!name.val().trim()) {
        name.after(returnTextError('Имя'));
        name.css(styleFail.element, styleFail.style);
        hasError = true;
    } else {
        $('#inputName').css(styleSuccess.element, styleSuccess.style);
    }

    if (!tel.val().trim()) {
        tel.after(returnTextError('Телефон'));
        tel.css(styleFail.element, styleFail.style);
        hasError = true;
    } else {
        $('#inputTel').css(styleSuccess.element, styleSuccess.style);
    }

    if (!inputChecked.is(':checked')) {
        textChecked.css(styleFailChecked.element, styleFailChecked.style);
        hasError = true;
    } else {
        textChecked.css(styleSuccessChecked.element, styleSuccessChecked.style);
    }

    if (!hasError) {
        loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {name: name.val(), tel: tel.val(), inputChecked: inputChecked.val()}
        })
            .done(function (msg) {
                loader.hide();
                if (msg.success) {
                    $('#block1').hide();
                    $('#block2').show();
                    console.log(msg);
                } else {
                    alert('Возникла ошибка при оформлении консультации, попробуйте еще раз')
                }

            });

    }

});

// tourEntry

$('#buttonTour').click(() => {
    $('.tour__popup-fade').show(650);
})
$('.tour__popupClose').click(() => {
    $('.tour__popup-fade').hide(650);
})


let tourName = $('#tourNameInput');
let tourTel = $('#tourTelInput');
let tourChecked = $('#tourChecked');
let textCheckedTwo = $('.text2, #tourChecked-a');

$('#tourBtn').click(function () {
    $('.error').remove();
    $('.errorChecked').remove();
    hasError = false;

    if (!tourName.val().trim()) {
        tourName.after(returnTextError('Имя'));
        tourName.css(styleFail.element, styleFail.style);
        hasError = true;
    } else {
        $('#tourNameInput').css(styleSuccess.element, styleSuccess.style);
    }

    if (!tourTel.val().trim()) {
        tourTel.after(returnTextError('Телефон'));
        tourTel.css(styleFail.element, styleFail.style);
        hasError = true;
    } else {
        $('#tourTelInput').css(styleSuccess.element, styleSuccess.style);
    }

    if (!tourChecked.is(':checked')) {
        textCheckedTwo.css(styleFailChecked.element, styleFailChecked.style);
        hasError = true;
    } else {
        textCheckedTwo.css(styleSuccessChecked.element, styleSuccessChecked.style);
    }

    if (!hasError) {
        loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {name: tourName.val(), tourTel: tourTel.val(), tourChecked: tourChecked.val()}
        })
            .done(function (msg) {
                loader.hide();
                if (msg.success) {
                    $('#block11').hide();
                    $('#block22').show();
                    console.log(msg);
                } else {
                    alert('Возникла ошибка при оформлении консультации, попробуйте еще раз')
                }

            });

    }

});

$('.pointOneAdaptive').hover(function () {
    $('.technologies__hideBlock').fadeIn('1000');
    $('h3').text('Неразрывний каркас ');
    $('p').text('Монтаж стен этажей внутри дома и по всему периметру выполняется единым массивом.')
}, function () {
    $('.technologies__hideBlock').fadeOut('1000');
});

$('.pointTwoAdaptive').hover(function () {
    $('.technologies__hideBlock').fadeIn('1000');
    $('h3').text('Диагональный раскос');
    $('p').text('Система диагональных раскосов позволяет создать оптимальный вентиляционный зазор для капитальных стен и наружной отделки')
}, function () {
    $('.technologies__hideBlock').fadeOut('1000');
});
$('.pointThreeAdaptive').hover(function () {
    $('.technologies__hideBlock').fadeIn('1000');
    $('h3').text('Сборка силовых узлов');
    $('p').text('Основные силовые узлы наших домов оцинкованы, что позволяет быть уверенными в исключительной прочности и долговечности конструкции')
}, function () {
    $('.technologies__hideBlock').fadeOut('1000');
});
$('.pointFourAdaptive').hover(function () {
    $('.technologies__hideBlock').fadeIn('1000');
    $('h3').text('5 камерные окна');
    $('p').text('Обеспечивает исключительную сохранность тепла в доме')
}, function () {
    $('.technologies__hideBlock').fadeOut('1000');
});
$('.pointFiveAdaptive').hover(function () {
    $('.technologies__hideBlock').fadeIn('1000');
    $('h3').text('Плитная ветрозащита');
    $('p').text('Используемая влагостойкая ветрозащитная плита обеспечивает дополнительную шумоизоляцию стен')
}, function () {
    $('.technologies__hideBlock').fadeOut('1000');
});

// $('.pointOneAdaptive').hover(function () {
//     $('.technologies__hideBlock').fadeIn('1000').toggleClass("technologies__hideBlockHide")
// })


