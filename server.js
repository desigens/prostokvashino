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

// Главная страница (сгенерирована из jade)
app.get('/', function(req, res){
  res.render('main', {
  	title: req.query.title || 'У вас что-то сломалось',
  	text: req.query.text || []
  })
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

// URL картинки
app.get('/pic/', function(req, res){

	// GET-часть адреса
	var query = req.url.split('?')[1] || "";

	// Хэш для имени картинки 
	var hash = crypto.createHash('md5').update(query).digest('hex') + 'sd';

	// Уникальное имя картинки
	var pic = 'generated-images/' + hash + '.png';

	fs.exists(pic, function (exists) {

		res.set('Permanent', hash);

		if (exists) {
			// Если картинка уже существует на диске, используем ее
			res.sendfile(pic);
		} else {

			// Если картинки нет, создам ее и отдаем клиенту
			console.log('make file');
			webshot('http://localhost:' + port + '/?' + query, pic, {
				windowSize: {
					width: 605, height: 230
				},
				shotOffset: {
					top: 100
				}
			}, function () {
			  	res.sendfile(pic);
			  	console.log('file done');
			});

		}
	});
});

app.listen(port);