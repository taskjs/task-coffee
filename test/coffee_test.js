'use strict';

var assert = require('assert');
var Coffee = require('../lib/coffee');

function errorHandler(err){
    process.nextTick(function rethrow() { throw err; });
}

(new Coffee).run(
    [{
        path: 'foo.coffee',
        contents: 'a=1'
    }], // inputs
    {}, // options
    console // logger
).then(function(inputs){
     assert.equal(inputs.toString(), '(function() {\n  var a;\n\n  a = 1;\n\n}).call(this);\n')
}).catch(errorHandler);

(new Coffee).run(
    [{
        path: 'foo.coffee',
        contents: 'a=1'
    }], // inputs
    {
        bare: true
    }, // options
    console // logger
).then(function(inputs){
        assert.equal(inputs.toString(), 'var a;\n\na = 1;\n')
    }).catch(errorHandler);


(new Coffee).run(
    [{
        path: 'foo.coffee',
        contents: 'a=1'
    }], // inputs
    {
        bare: true,
        sourceMap: true
    }, // options
    console // logger
).then(function(inputs){
        assert.equal(inputs.toString(), 'var a;\n\na = 1;\n');
        assert(inputs[0].sourceMap);
    }).catch(errorHandler)