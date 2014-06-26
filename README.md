# task-coffee
> Compile CoffeeScript files to JavaScript.

## The "coffee" task

### Usage Examples

```js
var coffee = new (require('task-coffee'))
coffee.run(inputs, options, logger)
```

### Options

#### options.bare
Type: `boolean`
Default: false

Compile the JavaScript without the top-level function safety wrapper.

#### options.sourceMap
Type: `boolean`
Default: false

Generate source maps.

## Release History
* 2014-06-27        0.1.0        Initial release.

## License
Copyright (c) 2014 Yuanyan Cao. Licensed under the MIT license.
