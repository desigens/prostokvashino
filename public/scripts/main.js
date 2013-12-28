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

var textContainers = document.querySelectorAll('.text');

$('.image').on('dblclick', function (e) {
	$el = $('<div draggable="true" class="text"><span contenteditable="true" class="center"></span></div>');
	$el.css({
		left: e.offsetX - 30 + 'px',
		top: e.offsetY - 30 + 'px'
	})
	$(this).append($el);
	bubbleInit($el);
	textContainers = document.querySelectorAll('.text');
	console.log(textContainers);
})

click.onclick = function () {
	var data = serialize(textContainers);
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
		bubbles.push({
			text: el.querySelector('.center').innerHTML,
			x: el.style.left,
			y: el.style.top,
			w: el.style.width,
			h: el.style.height
		});
	});

	return JSON.stringify(bubbles);
} 

function bubbleInit($el) {

	// $(this)

	$close = $('<div class="close">x</div>');
	$close.on('click', function () {
		$(this).closest('.text').remove();
	});

	$el.resizable({
		resize: function () {
			$(this).css({
				lineHeight: $(this).css('height')
			});
		}
	})
	.draggable({ cancel: "[contenteditable]" })
	.on('dblclick', function (e) {
		return false;
	})
	.append($close)
	.find('[contenteditable]')
	.on('click', function () {$(this).focus()})
}

bubbleInit($('[draggable]'));


	

