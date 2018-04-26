import config from './config.global.mjs';

/**
 * CONFIGURATION
 */
config.exportPath = 'export/data/';
config.ignoreFolders = ['img'];
config.port = 8000;
config.getIPFS = 'http://49053.s.time4vps.cloud:9405/api/dapps/918577358511643863/api/data';
config.getIPFSFile = config.getIPFS + '/get';
config.createIPFS = config.getIPFS + '/add';
config.emptyFolderHash = 'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn';

// http://49053.s.time4vps.cloud:9405/api/dapps/918577358511643863/api/data/list?hash=QmWrbqRPd7Dnesw7aU41nrbg5u9csx75bobxE1Qc3v7dpf&path=donations

export default config;
