var express = require('express'); // Сервер
var app = express();
var fs = require('fs'); // Файлы
var webshot = require('webshot'); // Скриншоты


// Существующая статика
app.use(express.static(__dirname));

// Главная страница
app.get('/', function(req, res){
  res.sendfile('public/index.html');
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
			webshot('http://localhost:8080/', pic, function () {
			  	res.sendfile(pic);
			  	console.log('file done');
			});
		}
	});
});

app.listen(80);