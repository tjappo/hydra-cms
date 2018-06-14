const config = {};
config.exportPath = '';
config.ignoreFolders = [];
config.port = 8000;
config.getIPFS = '';
config.getIPFSFile = config.getIPFS + '/get';
config.getIPFSFolder = config.getIPFS + '/list';
config.createIPFSFile = config.getIPFS + '/add';
config.deleteIPFSFile = config.getIPFS + '/del';

export default config;
