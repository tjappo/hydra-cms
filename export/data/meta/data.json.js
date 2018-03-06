window['metaData'] = [
	{
		"page": "Index",
		"title": "Shift - Decentralize the web",
		"description": "Description of Index page",
		"hidden": false
	},
	{
		"page": "Faq",
		"title": "Shift - Decentralize the web",
		"description": "Description of Faq page",
		"hidden": false
	},
	{
		"page": "Countdown",
		"title": "Shift - Decentralize the web",
		"description": "Description of Countdown page",
		"hidden": false
	},
	{
		"page": "News",
		"title": "Shift - Decentralize the web",
		"description": "Description of News page",
		"hidden": false
	},
	{
		"page": "NewsItem",
		"title": "Shift - Decentralize the web",
		"description": "Description of News Item page",
		"hidden": false
	},
	{
		"page": "Roadmap",
		"title": "Shift - Decentralize the web",
		"description": "Description of Roadmap page",
		"hidden": false
	},
	{
		"page": "Team",
		"title": "Shift - Decentralize the web",
		"description": "Description of Team page",
		"hidden": false
	},
	{
		"page": "AdminIndex",
		"title": "Shift - Decentralize the web",
		"description": "Description of AdminIndex page",
		"hidden": false
	},
	{
		"page": "AdminCreate",
		"title": "Shift - Decentralize the web",
		"description": "Description of AdminCreate page",
		"hidden": false
	},
	{
		"page": "AdminEdit",
		"title": "Shift - Decentralize the web",
		"description": "Description of AdminEdit page",
		"hidden": false
	}
];

// IMPORTANT:
//  title has to be the same as the name of the data variable
//  Url to this file relatively to the root folder
// Image upload:
// "media": {
// 	"binaryEncoding": "base64",
// 	"type": "image/png"
// }
window['metaSchema'] = {
	"title": "metaData",
	"url": "meta/data.json.js",
	"type": "object",
	"properties": {
		"page": {
			"type": "string",
			"enum": [
				"Index",
				"Faq",
				"Countdown",
				"News",
				"NewsItem",
				"Roadmap",
				"Team"
			],
			"default": "Index",
			"required": true
		},
		"title": {
			"type": "string",
			"description": "Title of the page",
			"default": "Shift - Decentralize the web",
			"required": true
		},
		"description": {
			"type": "string",
			"description": "Meta description of page",
			"required": true
		},
		"hidden": {
			"type": "boolean",
			"format": "checkbox",
			"default": false
		}
	}
};