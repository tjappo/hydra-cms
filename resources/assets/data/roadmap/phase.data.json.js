window['phaseData'] = [
	{
		"id": 1,
		"startRoadmap_id": 0,
		"endRoadmap_id": 0,
		"title": "Phase I. The Foundation",
		"description": "Building a stable main chain based on Lisk’s delegated Proof-of-Stake consensus algorithm."
	},
	{
		"id": 2,
		"startRoadmap_id": 0,
		"endRoadmap_id": 0,
		"title": "Phase II. The Framework",
		"description": "Building the connection between Shift’s core and the InterPlanetary FileSystem."
	},
	{
		"id": 3,
		"startRoadmap_id": 1,
		"endRoadmap_id": 21,
		"title": "Phase III. Public Testing",
		"description": "Building a working prototype of Phantom, the first official “killer dApp” for the Shift platform. Starting a marketing campaign. Introducing a revenue model for the storage nodes. Phantom includes a user interface for file management over the InterPlanetary FileSystem, and will have its own running sidechain plus its own cluster of IPFS storage nodes."
	},
	{
		"id": 4,
		"startRoadmap_id": 0,
		"endRoadmap_id": 0,
		"title": "Phase IV. Public Release",
		"description": "The mainnet release of Phantom. A working platform with real digital assets. Anyone will be able to create a dApp or host their website on the Shift platform. Scaling the marketing campaign."
	}
];

// IMPORTANT:
//  title has to be the same as the name of the data variable
//  Url to this file relatively to the root folder
window['phaseSchema'] = {
	"title": "phaseData",
	"url": "./data/roadmap/phase.data.json.js",
	"type": "object",
	"properties": {
		"startRoadmap_id": {
			"type": "integer",
			"minimum": 1,
			"required": true
		},
		"endRoadmap_id": {
			"type": "integer",
			"minimum": 1,
			"required": true
		},
		"title": {
			"type": "object",
			"properties": {
				"en": {
					"type": "string",
					"description": "Title of phase in English",
					"default": "Phase {phase}",
					"required": true
				}
			}
		},
		"description": {
			"type": "object",
			"properties": {
				"en": {
					"type": "string",
					"description": "Description of phase in English",
					"default": "Lorum ipsum dolor est",
					"required": true
				}
			}
		},
		"hidden": {
			"type": "boolean",
			"format": "checkbox"
		}
	}
};