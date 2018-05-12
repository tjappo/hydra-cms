import express from 'express';

const router = express.Router();
import config from "../../../../../../../config.mjs";
import * as functions from "../functions.mjs";

/**
 * Routes for adding items
 */
const routes = functions.getDirectories(config.exportPath)
    .filter((source) => !config.ignoreFolders.includes(source));

/**
 * Function to update the routes
 * @param route given route to add
 */
export function updateRoutes(route) {
    routes.push(route);
}

/**
 * Checks whether the given route is in the routes array
 * @param route given route to check
 * @param res response object
 * @returns {boolean} whether the given route is in the routes array
 */
function checkRoutes(route, res) {
    if (!routes.includes(route)) {
        res.status(500).send("Invalid route: " + route);
        return false;
    }
    return true;
}

router.post('/data/:route/add', (req, res) => {
    if (!checkRoutes(req.params.route, res)) return;
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

// noinspection JSCheckFunctionSignatures, gets warning of the .put function of axios
router.put('/data/:route/update', (req, res) => {
    if (!checkRoutes(req.params.route, res)) return;
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

router.post('/data/:route/delete', (req, res) => {
    if (!checkRoutes(req.params.route, res)) return;
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

router.post('/sync', (req, res) => {
    const syncInfo = {
        hash: req.body.hash,
        path: req.body.path
    };
    try {
        functions.syncFolders(syncInfo, res);
    } catch (err) {
        console.log(err.stack);
        res.status(500).send('An unexpected error has occurred');
    }
});

router.post('/local/pushFolder', (req, res) => {
    const item = req.body.item,
        syncInfo = req.body.syncInfo;
    try {
        functions.pushFolder(syncInfo, item, res);
    } catch (err) {
        console.log(err.stack);
        res.status(500).send('An unexpected error has occurred');
    }
});

router.post('/remote/pullFolder', (req, res) => {
    const item = req.body.item,
        syncInfo = req.body.syncInfo;
    try {
        functions.pullFolder(syncInfo, item, res);
    } catch (err) {
        console.log(err.stack);
        res.status(500).send('An unexpected error has occurred');
    }
});

router.post('/remote/pullFile', (req, res) => {
    const item = req.body.item,
        syncInfo = req.body.syncInfo;
    try {
        functions.pullFile(syncInfo, item, res);
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