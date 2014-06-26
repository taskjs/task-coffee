var fs = require('fs');
var path = require('path');
var Execution = require('execution');
var Record = require('record');

module.exports = Execution.extend({
    // The type of option could be HTML5 input types: file, directory, number, range, select,
    // url, email, tel, color, date, time, month, time, week, datetime(datetime-local),
    // string(text), boolean(checkbox), array, regexp, function and object.
    options: {
        bare: {
            label: 'Without safety wrapper',
            default: false,
            type: 'boolean',
            placeholder: 'Compile the JavaScript without the top-level function safety wrapper.'
        },
        sourceMap: {
            label: 'Generate source maps',
            default: false,
            type: 'boolean'
        }
    },
    run: function (inputs, options, logger, settings) {
        return this._run(inputs, options, logger, settings);
    },
    execute: function (resolve, reject) {
        var options = this.options;
        var inputs = this.inputs;
        var logger = this.logger;

        var coffee = require('coffee-script');
        var records = inputs.map(function(record){

            options.literate = /\.(litcoffee|coffee\.md)$/.test(record.path);

            var source = record.contents.toString();
            var contents = coffee.compile(source, options);

            record = new Record({
                path: record.path.replace(/\.(coffee|litcoffee|coffee\.md)$/, '.js'),
                contents: contents.js || contents
            });
            record.sourceMap =  contents.v3SourceMap;

            return record;
        });

        resolve(records);
    }
})
