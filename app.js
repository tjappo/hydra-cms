const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const functions = require('./resources/assets/js/components/admin/backend/functions.js');
const config = require('./config');

app.use(bodyParser.json({limit: '5mb'}));       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true,
	limit: '5mb'
}));
app.set('view engine', 'ejs');

const port = process.env.PORT || 8000;

// Add headers
app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Pass to next layer of middleware
	next();
});

/**
 * Routes for adding items
 */
const routes = functions.getDirectories(config.dataPath)
	.filter((source) => !config.ignoreFolders.includes(source));

app.use(express.static(__dirname));
app.get('/', (req, res) => {

	res.render('index', {
		exportPath: config.exportPath,
		routes: routes
	});
});

for (let route of routes) {
	// noinspection JSCheckFunctionSignatures, gets warning of the .put function of axios
	app.post('/' + route + '/add', (req, res) => {
		const data = req.body.data,
			varName = req.body.varName,
			url = req.body.url;

		try {
			functions.createData(url, varName, data, res);
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
			functions.updateData(oldData, url, varName, data, res);
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
			functions.deleteData(url, varName, id, res);
			// res.status(200).send('Object deleted');
		} catch (err) {
			console.log(err.stack);
			res.status(500).send('An unexpected error has occurred');
		}
	});
}

app.post('/schema/create', (req, res) => {
    const title = req.body.title,
        items = req.body.items
    try {
        functions.createSchema(title, items, res);

    } catch (err) {
        console.log(err.stack);
        res.status(500).send('An unexpected error has occurred');
    }
});

app.put('/schema/update', (req, res) => {
    try {
    	console.log(req.body);
        // functions.createSchema(title, items, res);
        // functions.updateData(oldData, url, varName, data, res);
        // res.status(200).send('Object updated');
    } catch (err) {
        console.log(err.stack);
        res.status(500).send('An unexpected error has occurred');
    }
});


const server = app.listen(port, function () {
	console.log('Listening on port ' + port);
});

