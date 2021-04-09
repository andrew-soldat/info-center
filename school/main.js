const body = document.querySelector('body'),
   header = document.querySelector('header'),
   burgerButton = document.querySelector('.header__burger'),
   menuNav = document.querySelector('.header__nav'),
   links = document.querySelectorAll('.header__link');

window.addEventListener('scroll', function() {
	console.log(window.scrollY);
	if (window.scrollY > 400) {
		header.classList.add("scroll");
	} else {
		header.classList.remove("scroll");
	}
});

const closeMenuNav = () => {
   burgerButton.classList.remove('active');
   menuNav.classList.remove('active');
   body.classList.remove('lock');
};

document.addEventListener('click', function (e) {
   if (!e.target.closest('.header__nav, .header__burger')) {
      closeMenuNav();
   }
});

burgerButton.addEventListener('click', function (e) {
   burgerButton.classList.toggle('active');
   menuNav.classList.toggle('active');
   body.classList.toggle('lock');
});

links.forEach((link) => {
   link.addEventListener('click', function (e) {
      closeMenuNav();
   });
});

$(function () {
   $('a[href^="#"]').click(function (event) {
      var target = $(this).attr('href');
      $('html, body').animate({ scrollTop: $(target).offset().top - 54 }, 800);
      return false;
   });


	$(".certificates__slider").slick({
		dots: false,
		arrows: true,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		adaptiveHeight: true,
		responsive: [
			{
			  breakpoint: 991,
			  settings: {
				 slidesToShow: 2,
				 slidesToScroll: 1
			  }
			},
			{
				breakpoint: 565,
				settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1
				}
			 }
		]
	});
});

const accordions = document.querySelectorAll(".accordion__top");

accordions.forEach(item => {
	item.addEventListener('click', function () {
		item.classList.toggle('active');
		var panel = item.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	})
})