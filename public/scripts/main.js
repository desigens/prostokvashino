var img = new Image();

var el = document.querySelector('.image'),
	image = el.getAttribute('data-src'); 

img.onload = function () {
	el.className = 'image';
	el.style.backgroundImage = 'url(' + image + ')'
}
img.src = image;


// Показываем ссылку на картинку при клике
var click = document.querySelector('.b-link__get'); 
var url = document.querySelector('.b-link__url');
var textContainer = document.querySelector('.center');
var query = window.location.href.split('?')[1];
var _text;

click.onclick = function () {
	var text = textContainer.innerHTML;
	_text = text;
	query = 'text=' + text;
	$.ajax({
		url: '/pic/?' + query,
	}).done(function (data, status, res) {
		var link = window.location.origin + '/amazing/' + res.getResponseHeader('Permanent');
		url.innerHTML = '<a href="' + link + '">' + link + '</a>';
		click.innerHTML = '';
	});
	click.innerHTML = 'Терпение, мой друг...';
};

textContainer.onkeyup = function () {
	var text = textContainer.innerHTML;
	if (text !== _text) {
		url.innerHTML = '';
	}
	click.innerHTML = 'Получить ссылку на картинку';
};

