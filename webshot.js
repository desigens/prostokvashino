// Use
// node webshot.js

var webshot = require('webshot');
var hash = '#' + encodeURIComponent('привет, авоська');
var url = 'http://desigens.com/prostokvashino/' + hash;

webshot('http://desigens.com/prostokvashino/' + hash, 'webshot.png', {
	renderDelay: 2000,
	windowSize: {
		width: 620, height: 450
	}
}, function(err) {
  // screenshot now saved to google.png
});