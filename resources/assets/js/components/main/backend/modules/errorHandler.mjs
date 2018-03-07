/**
 * Checks if there is an error and if so return it
 * @param error given error
 * @param res response object
 */
export function checkFileError(error, res) {
    if (!error) return;
    res.status(500).send(error);
    throw error;
}