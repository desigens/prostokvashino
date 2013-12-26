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
var _query;

var textContainers = document.querySelectorAll('.center');

click.onclick = function () {
	var query = serialize(textContainers);
	click.innerHTML = 'Терпение, мой друг...';
	_query = query;

	$.ajax({
		url: '/pic/?' + query,
	}).done(function (data, status, res) {
		var link = window.location.origin + '/amazing/' + res.getResponseHeader('Permanent');
		url.innerHTML = '<a href="' + link + '">' + link + '</a>';
		click.innerHTML = '';
	});
};

textContainer.onkeyup = function () {
	var query = serialize(textContainers);
	if (query !== _query) {
		url.innerHTML = '';
	}
	click.innerHTML = 'Получить ссылку на картинку';
};

function serialize (elements) {
	var texts = [],
		query = '',
		i = 0;

	Array.prototype.forEach.call(elements, function (el) {
		var text = el.innerHTML;
		texts.push(text);
	});

	texts.forEach(function (text) {
		query = query + 'text[' + i + ']=' + texts[i] + '&';
		i++;
	});

	return query;
} 

