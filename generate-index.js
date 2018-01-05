var dir = require('node-dir');
var fs = require('fs');

var stream = fs.createWriteStream('index.d.ts');

dir.promiseFiles('./engine')
.then(files => {
    files.filter(file => /(\.d\.ts)$/.test(file))
    .map(file => file.replace(/\\/g,"/"))
    .forEach(file => {        
        stream.write(`/// <reference path="./${file}" />\n`);
    });
    stream.end();
    
})
.catch(e => console.error(e));
