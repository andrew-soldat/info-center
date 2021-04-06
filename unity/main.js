
const imgItems = document.querySelectorAll(".main__bg");

function parallax (e) {
	imgItems.forEach(item => {
		let speed = item.getAttribute("data-speed");
		item.style.transform = `translate(${e.clientX*speed/2000}px, ${e.clientY*speed/2000}px)`;
	})
	
}

document.addEventListener('mousemove', parallax);


var a = 0;
   $(window).scroll(function () {
      var oTop = $(".number__item").offset().top - window.innerHeight;
      if (a == 0 && $(window).scrollTop() > oTop) {
         $(".number__count").each(function () {
            var $this = $(this),
               countTo = $this.attr("data-count");
            $({
               countNum: $this.text(),
            }).animate(
               {
                  countNum: countTo,
               },
               {
                  duration: 800,
                  easing: "swing",
                  step: function () {
                     $this.text(Math.floor(this.countNum));
                  },
                  complete: function () {
                     $this.text(this.countNum);
                  },
               }
            );
         });
         a = 1;
      }
	});