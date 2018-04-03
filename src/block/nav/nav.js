(function(){


// Активная ссылка
let navLink= document.getElementsByClassName('nav__link');
let btnBurgerHeader= document.getElementById('btn-burger_header');
for(let i= 0; navLink.length > i; i++){
	navLink[i].addEventListener('click', (e)=>{
		btnBurgerHeader.checked = false;
		for(let j= 0; navLink.length > j; j++){
			navLink[j].classList.remove('active');
		}
		e.target.classList.add('active');
	});
}



// Прокрутка
function currentYPosition() {
	// Firefox, Chrome, Opera, Safari
	if (self.pageYOffset) return self.pageYOffset;
	// Internet Explorer 6 - standards mode
	if (document.documentElement && document.documentElement.scrollTop)
			return document.documentElement.scrollTop;
	// Internet Explorer 6, 7 and 8
	if (document.body.scrollTop) return document.body.scrollTop;
	return 0;
}


function elmYPosition(eID) {
	var elm = document.getElementById(eID);
	var y = elm.offsetTop;
	var node = elm;
	while (node.offsetParent && node.offsetParent != document.body) {
			node = node.offsetParent;
			y += node.offsetTop;
	} return y;
}


function smoothScroll(eID) {
	var startY = currentYPosition();
	var stopY = elmYPosition(eID);
	var distance = stopY > startY ? stopY - startY : startY - stopY;
	if (distance < 100) {
			scrollTo(0, stopY); return;
	}
	var speed = Math.round(distance / 100);
	if (speed >= 20) speed = 20;
	var step = Math.round(distance / 25);
	var leapY = stopY > startY ? startY + step : startY - step;
	var timer = 0;
	if (stopY > startY) {
			for ( var i=startY; i<stopY; i+=step ) {
					setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
					leapY += step; if (leapY > stopY) leapY = stopY; timer++;
			} return;
	}
	for ( var i=startY; i>stopY; i-=step ) {
			setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
			leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
	}
}

let itemsNav= document.getElementById('nav-list_header').getElementsByClassName('nav__link');

for(let i= 0; itemsNav.length > i; i++){
	itemsNav[i].addEventListener( 'click', (e) => {
		let eID= e.target
							.getAttribute("href")
							.replace(/^#/, "");
		smoothScroll( eID );
	});
}

document.getElementById('btn_bye').addEventListener('click', (e)=>{
	smoothScroll('buy');
})

}).call();