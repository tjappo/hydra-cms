window['newsData'] = [
	{
		"id": 1,
		"category": "Newsletter",
		"title": {
			"en": "Phantom Prototype Release"
		},
		"date": "2018-01-05",
		"author": "RalfS",
		"image": "/img/news/phantom-ui.jpg",
		"preview": {
			"en": "<p>December was an amazing month for Shift, and the team has a lot of news to share with you. The biggest news, of course, is that our dev team nailed the prototype release of Phantom and released a beautiful new website, co-created with our marketing staff, to introduce the decentralized web to the world and function as a starting point toward building more of a following for Shift. The website (shiftnrg.org) is fully hosted, replicated, and monitored through Shift’s IPFS cluster.</p>"
		},
		"content": {
			"en": "<p>Dear Shift Community, </p><p>December was an amazing month for Shift, and the team has a lot of news to share with you. The biggest news, of course, is that our dev team nailed the prototype release of Phantom and released a beautiful new website, co-created with our marketing staff, to introduce the decentralized web to the world and function as a starting point toward building more of a following for Shift. The website (shiftnrg.org) is fully hosted, replicated, and monitored through Shift’s IPFS cluster. If you're reading this newsletter on our website, you're already experiencing it now: it is served with the performance of heavy servers, but in fact is running on our Phantom dApp. </p><p> This is a historic achievement for internet freedom, and we are very proud of our dev team. They worked nonstop during the holidays to deliver on their promise of an end-of-year 2017 release.</p><p><h4>The Shift Team has grown tremendously</h4><br/>Among our recent staffing additions, we are especially excited to announce that Isabella Dell has joined Shift as our System Architect. Isabella was one of the earliest core members of the Lisk Team and as their System Architect, she helped to grow the project from a market cap of approximately thirty million dollars to a cap over two-and-a-half billion dollars, at time of writing. </p><p> Isabella brings vast experience and talent to our team, and we are honored to have her. She is currently helping Shift design our revolutionary new dPOS algorithm, and is also working on our Technical White Paper which is due for release at the end of this month. </p><p> We saw the departure of an old-timer in our dev team, GoldenEye. He explained that for personal family reasons, he no longer has time to devote to Shift, but that he hopes to return to the project when possible. We are all very grateful for all of his hard work and support over the past two years, and we wish him well.</p><p>At the same time, a new developer has joined the Shift Team, Jasper. He is very talented and has greatly contributed to the project, especially to the new website and our unique Hydra CMS for IPFS. If you want to support Jasper’s work, please vote for his delegate Tjappo.</p><p>In December, we also formally welcomed two new members of our marketing staff: Birk and Will. Birk will be helping the marketing team with PR and community management. Will has joined to head our marketing program and assist with business development in the coming year. Will and the team are hard at work creating our six month marketing plan, which will be implemented in stages and revealed in parts at strategic moments over the course of Q1.</p><p>You can read more about our new team members by viewing their bios on our <a href=\"/#/team\">team page</a>.</p><p><h4>Animation video update</h4><br/>Before delving into deeper discussion about Phantom and product development progress, which will be covered in an upcoming newsletter, we want to update the community about our animated video project: because we are committed to producing the best possible video for explaining Shift to a broader audience, we have decided to switch this project over to a more professional production agency. We want the community to know that the video is still being produced and the new agency will, in our belief, prove to be a great move for Shift’s long term success when the result is in hand. </p><p><h4>Cluster public release</h4><br/>Regarding the state of the network, we’re pleased to share that we already have 20+ nodes running Phantom’s storage software, and we’re very happy with the feedback provided by our testers. The tests have been very helpful and we’re currently adding many of the suggested refinements. We also conducted an internal audit and are now adding an extra security layer to the storage cluster before we release the code at Github. We anticipate this to take approximately one week.</p><p>To conclude, as always we want to thank you, our community, for your continued support of the Shift project. As we prepare to push Shift toward readiness for mass adoption in the year to come, we are very excited to enter this new year with a team that is stronger than ever: with the addition of more dedicated marketing staff, a new developer Jasper, and Isabella from Lisk. We’ve come so far as a project and as a community, and we believe the coming months are only going to get more exciting as we advance into 2018. </p><p> Best wishes,<br/> The Shift Team</p>"
		},
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
window['newsSchema'] = {
	"title": "newsData",
	"url": "/news/data.json.js",
	"type": "object",
	"properties": {
		"category": {
			"type": "string",
			"enum": [
				"Newsletter"
			],
			"default": "Newsletter",
			"required": true
		},
		"title": {
			"type": "object",
			"properties": {
				"en": {
					"type": "string",
					"description": "Title of the newsletter in English",
					"default": "Newsletter {Month} {Year}",
					"required": true
				}
			}
		},
		"date": {
			"type": "string",
			"format": "date",
			"description": "Date of item in YYYY-MM-DD format",
			"required": true
		},
		"author": {
			"type": "string",
			"description": "Author of the newsletter",
			"default": "Shift Team",
			"required": true
		},
		"image": {
			"type": "string",
			"description": "Url of the image",
			"default": "http://via.placeholder.com/650x450",
			"required": true,
		},
		"preview": {
			"type": "object",
			"properties": {
				"en": {
					"type": "string",
					"format": "html",
					"options": {
						"wysiwyg": true
					},
					"description": "Preview text in English",
					"default": "<p>Lorum ipsum dolor est</p>",
					"required": true
				}
			}
		},
		"content": {
			"type": "object",
			"properties": {
				"en": {
					"type": "string",
					"format": "html",
					"options": {
						"wysiwyg": true
					},
					"description": "Content in English",
					"default": "<p>Lorum ipsum dolor est</p>",
					"required": true
				}
			}
		},
		"hidden": {
			"type": "boolean",
			"format": "checkbox",
			"default": false
		}
	}
};