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
var _data;

var textContainers = document.querySelectorAll('.center');

click.onclick = function () {
	var data = serialize(textContainers);;
	click.innerHTML = 'Терпение, мой друг...';
	_data = data;

	

	$.ajax({
		type: 'post',
		url: '/',
		data: data,
		contentType: "application/json"
	}).done(function (data) {
		var link = window.location.origin + '/amazing/' + data;
		url.innerHTML = '<a href="' + link + '">' + link + '</a>';
		click.innerHTML = '';
	});
};

textContainer.onkeyup = function () {
	var data = serialize(textContainers);
	if (data !== _data) {
		url.innerHTML = '';
	}
	click.innerHTML = 'Получить ссылку на картинку';
};

function serialize (elements) {
	var bubbles = [];

	Array.prototype.forEach.call(elements, function (el) {
		var text = el.innerHTML;
		bubbles.push({
			text: text
		});
	});

	return JSON.stringify(bubbles);
} 

