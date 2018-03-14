import assert from 'assert';
import fs from 'fs';
import mock from 'mock-fs';
import config from '../config.mjs';
import {
    addContent, deleteContent,
    editContent
} from '../resources/assets/js/components/main/backend/modules/data/processData.mjs';
import {data, schema} from './schema/testDataSchema.mjs';

describe('Data', () => {
    const initializeDataObject = (_string, _number, _date, _boolean, _media, _html) => {
        return {
            "string": {
                "en": _string
            },
            "number": _number,
            "date": _date,
            "boolean": _boolean,
            "media upload": _media,
            "html": {
                "en": _html
            }
        }
    };

    const mockWriteFs = () => {
        fs.mkdir = function (pathName, cb) {
            cb(null, {});
        };
        fs.writeFile = function (filename, content, cb) {
            cb(null);
        };
    };

    before(() => {
        mockWriteFs();
    });

    beforeEach(() => {
        const dataPath = config.exportPath + 'test',
            imgPath = config.exportPath + 'img';
        mock({
            exportPath: {},
            imgPath: {},
            dataPath: {
                'data.json.js': data + schema,
            }
        });
    });

    afterEach(() => {
        mock.restore();
    });

    describe('Add Content', () => {
        it('should add new data to the current data', (done) => {
            const newData = ["string", 0, "date", true, Buffer.from("media").toString('base64'), "html"],
                dataObject = initializeDataObject(newData[0], newData[1], newData[2], newData[3], newData[4], newData[5]);
            addContent([], dataObject, "testData", schema, (result) => {
                assert.equal(result[0].string.en, newData[0]);
                assert.equal(result[0].number, newData[1]);
                assert.equal(result[0].date, newData[2]);
                assert.equal(result[0].boolean, newData[3]);
                assert.ok(result[0]["media upload"].indexOf(newData[4]) !== -1);
                assert.equal(result[0].html.en, newData[5]);
                assert.equal(result.length, 1);
                done();
            });
        });
    });

    describe('Edit Content', () => {
        it('should edit data of the current data', (done) => {
            const dataObject = initializeDataObject("string", 0, "date", true, Buffer.from("media").toString('base64'), "html"),
                newData = ["string2", 1, "date2", false, Buffer.from("media2").toString('base64'), "html2"],
                newObject = initializeDataObject(newData[0], newData[1], newData[2], newData[3], newData[4], newData[5]);
            editContent(dataObject, [dataObject], newObject, "testData", schema, (result) => {
                assert.equal(result[0].string.en, newData[0]);
                assert.equal(result[0].number, newData[1]);
                assert.equal(result[0].date, newData[2]);
                assert.equal(result[0].boolean, newData[3]);
                assert.ok(result[0]["media upload"].indexOf(newData[4]) !== -1);
                assert.equal(result[0].html.en, newData[5]);
                assert.equal(result.length, 1);
                done();
            })
        });
    });

    describe('Delete Content', () => {
        it('should delete the data with a given id of the current data', (done) => {
            const newData = ["string", 0, "date", true, Buffer.from("media").toString('base64'), "html"],
                dataObject = initializeDataObject(newData[0], newData[1], newData[2], newData[3], newData[4], newData[5]);
            addContent([], dataObject, "testData", schema, (result) => {
                deleteContent("1", result, (result2) => {
                    assert.equal(result2.length, 0);
                    done();
                });
            });
        });
    });
});