var express = require('express'); // Сервер
var app = express();

var fs = require('fs'); // Файлы
var webshot = require('webshot'); // Скриншоты

var crypto = require('crypto');

var port = 8000;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Существующая статика
app.use(express.static(__dirname + '/public'));

// Обработка запросов и получение json в req.body
app.use(express.json());

var obj;

var defaults = 	function () {
	return [
		{"text": "У вас что-то сломалось", "x": "16px", "y": "16px"},
		{"text": "Учить он меня будет, пиздюк шерстяной", "x": "457px", "y": "83px"}
	]
}

// Главная страница (сгенерирована из jade)
app.get('/', function(req, res){

	obj = defaults();

	if (req.query.json) {
		obj = JSON.parse(req.query.json);
	}

	res.render('main', {
		bubbles: obj
	})
});

// Передача JSON-данных для скриншота
app.post('/', function (req, res) {

	obj = defaults();

	if (req.body.length) {
		obj = req.body;
	}

	// Cтрока для передачи JSON через GET
	var jsonString = encodeURI(JSON.stringify(obj));

	// Хэш для имени картинки 
	var hash = crypto.createHash('md5')
				.update(jsonString).digest('hex');

	// Уникальное имя картинки
	var pic = 'generated-images/' + hash + '.png';

	fs.exists(pic, function (exists) {

		if (exists) {
			// Если картинка уже существует на диске, используем ее
			res.send(hash);
		} else {

			console.log('make file');
			webshot('http://localhost:' + port + '/?json=' + jsonString, pic, {
				windowSize: {
					width: 600, height: 240
				},
				shotOffset: {
					top: 100
				}
			}, function () {
			  	res.send(hash);
			  	console.log('file done');
			});
		
		}
	});
});

app.get('/amazing/:hash?', function(req, res) {
	var pic = 'generated-images/' + req.params.hash + '.png';


	fs.exists(pic, function (exists) {
		if (exists) {
			res.sendfile(pic);
		} else {
			res.status(404).send('Тут пусто, ребятушки.');
		}
	});
});

app.listen(port);