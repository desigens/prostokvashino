var textIt = function () {
	var str = window.location.hash.split('#')[1];
	var text = (str) ? decodeURIComponent(str) : 'У вас что-то сломалось...';
	document.querySelector('.center').innerHTML = text;
}

var img = new Image();

var el = document.querySelector('.image'),
	image = el.getAttribute('data-src'); 

img.onload = function () {
	el.className = 'image';
	el.style.backgroundImage = 'url(' + image + ')'
}
img.src = image;

textIt();
window.onhashchange = textIt;

// Показываем картинку при клике
var click = document.querySelector('.click');
click.onclick = function () {
	click.innerHTML = 'Давайте дождемся...';
	var test = document.querySelector('#test');
	test.onload = function () {
		click.innerHTML = 'Вау!'
	};
	test.src = test.getAttribute('data-src');		
}