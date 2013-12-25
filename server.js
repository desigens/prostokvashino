var express = require('express'); // Сервер
var app = express();

var fs = require('fs'); // Файлы
var webshot = require('webshot'); // Скриншоты

var port = 8000;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// Существующая статика
app.use(express.static(__dirname + '/public'));

// Главная страница (сгенерирована из jade)
app.get('/', function(req, res){
  res.render('main', {
  	title: req.query.title || 'У вас что-то сломалось',
  	text: req.query.text || 'У вас что-то сломалось...'
  })
});

// URL картинки
app.get('/pic/', function(req, res){

	// Уникальное имя картинки
	var pic = 'webshot' + Math.floor((Math.random()*10)+1) + '.png';

	fs.exists(pic, function (exists) {
		if (exists) {
			// Если картинка уже существует на диске, используем ее
			res.sendfile(pic);
		} else {
			// Если картинки нет, создам ее и отдаем клиенту
			console.log('make file');
			webshot('http://localhost:' + port + '/', pic, function () {
			  	res.sendfile(pic);
			  	console.log('file done');
			});
		}
	});
});

app.listen(port);