import express from 'express';
import bodyParser from 'body-parser';
import router from './resources/assets/js/components/main/backend/controllers/routes.mjs';
const app = express();

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

app.use(express.static(process.env.PWD));
app.use('/', router);

const server = app.listen(port, function () {
	console.log('Listening on port ' + port);
});

