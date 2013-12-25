var img = new Image();

var el = document.querySelector('.image'),
	image = el.getAttribute('data-src'); 

img.onload = function () {
	el.className = 'image';
	el.style.backgroundImage = 'url(' + image + ')'
}
img.src = image;

// Показываем картинку при клике
var click = document.querySelector('.b-link__get');
var url = document.querySelector('.b-link__url');
var query = window.location.href.split('?')[1];
click.onclick = function () {
	click.innerHTML = 'Давайте дождемся...';
	
	var test = document.querySelector('#test');
	
	$.ajax({
		url: '/pic/?' + query,
	}).done(function (data, status, res) {
		var link = window.location.origin + '/amazing/' + res.getResponseHeader('Permanent');
		url.innerHTML = '<a href="' + link + '">' + link + '</a>';
		click.parentElement.removeChild(click);
	});
}


