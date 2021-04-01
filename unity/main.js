
const imgItems = document.querySelectorAll(".main__bg");

function parallax (e) {
	imgItems.forEach(item => {
		let speed = item.getAttribute("data-speed");
		item.style.transform = `translate(${e.clientX*speed/2000}px, ${e.clientY*speed/2000}px)`;
	})
	
}

document.addEventListener('mousemove', parallax);