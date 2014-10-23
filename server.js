console.log('server running....');

var messages = [{hello: "Hello Sean"}];

var onRequest = function (req, res) {

	if (req.method == 'POST') {
		console.log('POST request ....');
		var postData = '';
		req.on('data', function(chunk) {
			console.log('on request ....');
			postData += chunk.toString();
		});    
		req.on('end', function() {
			console.log('end request ....');
			res.writeHead(201, {
				'Connection': 'close',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			});
			console.log("here is the POST data:");
			console.log(JSON.parse(postData));
			messages.push(JSON.parse(postData));
			res.end(JSON.stringify(messages));
		});
	} else if (req.method == 'GET') {
			res.writeHead(200, {
			'Connection': 'close',
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		});
		res.end(JSON.stringify(messages));
	}
};

http = require('http');
http.createServer(onRequest).listen(3000);