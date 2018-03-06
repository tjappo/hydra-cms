export function checkFileError(error) {
    if (!error) return;
    throw error;
}