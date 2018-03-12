import express from 'express';
const router = express.Router();
import config from "../../../../../../../config.mjs";
import * as functions from "../functions.mjs";

/**
 * Routes for adding items
 */
const routes = functions.getDirectories(config.exportPath)
    .filter((source) => !config.ignoreFolders.includes(source));

export function updateRoutes(route) {
    routes.push(route);
}

for (let route of routes) {

    // noinspection JSCheckFunctionSignatures, gets warning of the .put function of axios
    router.post('/data/' + route + '/add', (req, res) => {
        const data = req.body.data,
            varName = req.body.varName,
            url = req.body.url;

        try {
            functions.createData(url, varName, data, res);

        } catch (err) {
            console.log(err.stack);
            res.status(500).send('An unexpected error has occurred');
        }
    });
    router.put('/data/' + route + '/update', (req, res) => {
        const oldData = req.body.oldData,
            data = req.body.data,
            varName = req.body.varName,
            url = req.body.url;
        try {
            functions.updateData(oldData, url, varName, data, res);
        } catch (err) {
            console.log(err.stack);
            res.status(500).send('An unexpected error has occurred');
        }
    });
    router.post('/data/' + route + '/delete', (req, res) => {
        const varName = req.body.varName,
            id = req.body.id,
            url = req.body.url;
        try {
            functions.deleteData(url, varName, id, res);
        } catch (err) {
            console.log(err.stack);
            res.status(500).send('An unexpected error has occurred');
        }
    });
}

router.post('/schema/create', (req, res) => {
    const title = req.body.title,
        items = req.body.items;
    try {
        functions.createSchema(title, items, res);

    } catch (err) {
        console.log(err.stack);
        res.status(500).send('An unexpected error has occurred');
    }
});

router.put('/schema/update', (req, res) => {
    const title = req.body.title,
        items = req.body.items,
        oldData = req.body.oldData;
    try {
        functions.updateSchema(title, items, oldData, res);
    } catch (err) {
        console.log(err.stack);
        res.status(500).send('An unexpected error has occurred');
    }
});

router.post('/schema/delete', (req, res) => {
    const title = req.body.title;
    try {
        functions.removeSchema(title, res);
    } catch (err) {
        console.log(err.stack);
        res.status(500).send('An unexpected error has occurred');
    }
});

router.get('/', (req, res) => {
    res.render('index', {
        exportPath: config.exportPath,
        routes: routes
    });
});

export default router;