const fs = require('fs');

const { symbols, ENCODING } = require('../constants');

exports.createFile = (path, content) => {
  const pathList = path.split(symbols.SLASH);
  pathList.pop();
  const dir = pathList.join(symbols.SLASH);

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path, content);
};

exports.fileExists = path => fs.existsSync(path);

exports.readFile = path =>
  // TODO: Read extension
  // It's only for json objects for now
  JSON.parse(fs.readFileSync(path, ENCODING));

exports.readDir = path => fs.readdirSync(path);

exports.isDirectory = path => fs.lstatSync(path).isDirectory();
