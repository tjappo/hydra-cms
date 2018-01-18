const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const functions = require('./resources/assets/js/components/admin/backend/functions.js');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

const port = process.env.PORT || 8000;

// Add headers
app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Origin', 'http://shift-2.0.dev');

	// Request methods you wish to allow
	// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	// res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.use(express.static(__dirname));
app.get('/', (req, res) => res.sendfile('index.html'));
//app.get('/', (req, res) => res.send('Hello World!'));

/**
 * Routes for adding items
 */
const routes = ['news', 'roadmap', 'team', 'faq'];

for (let route of routes) {
	// noinspection JSCheckFunctionSignatures, gets warning of the .put function of axios
	app.post('/' + route + '/add', (req, res) => {
		const data = req.body.data,
			varName = req.body.varName,
			url = req.body.url;

		try {
			functions.create(url, varName, data, res);
			// res.status(201).send('Object created');

		} catch (err) {
			console.log(err.stack);
			res.status(500).send('An unexpected error has occurred');
		}
	});
	app.put('/' + route + '/update', (req, res) => {
		const oldData = req.body.oldData,
			data = req.body.data,
			varName = req.body.varName,
			url = req.body.url;
		try {
			functions.update(oldData, url, varName, data, res);
			// res.status(200).send('Object updated');
		} catch (err) {
			console.log(err.stack);
			res.status(500).send('An unexpected error has occurred');
		}
	});
	app.post('/' + route + '/delete', (req, res) => {
		const varName = req.body.varName,
			id = req.body.id,
			url = req.body.url;
		try {
			functions.delete(url, varName, id, res);
			// res.status(200).send('Object deleted');
		} catch (err) {
			console.log(err.stack);
			res.status(500).send('An unexpected error has occurred');
		}
	});
}

const server = app.listen(port, function () {
	console.log('Listening on port ' + port);
});

