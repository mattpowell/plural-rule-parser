Plural Rule Parser
==================

This is a [PEG.js](https://github.com/dmajda/pegjs) grammar for parsing plural rules as defined by [CLDR](http://unicode.org/cldr/trac/browser/trunk/common/supplemental/plurals.xml). In addition to providing the grammar, a very lightweight js interface is available for parsing the grammar via PEG.js, running the parsed grammar over a passed in plural rule, and generating javascript code from the resulting AST.

The AST, which is the direct output of the grammar, is compatible with [Mozilla's Spidermonkey Abstract Syntax Tree definition](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API). It should be possible to consume the AST in other languages and/or generate code for other languages. However, I've only tested generation to javascript via [Escodegen](https://github.com/Constellation/escodegen).

Installation
-----------
```
$> npm install plural-rule-parser --save
```

Example usage
-------------

```js
var parser = require('plural-rule-parser'),
    rule = 'n is 1',
    result =  parser.parse(rule); // will throw if rule is invalid

console.log(result.toAst()); // {
                             //    "type": "Program",
                             //    "body": [
                             //      {
                             //        "type": "ExpressionStatement",
                             //        "expression": {
                             //          "type": "BinaryExpression",
                             //          "operator": "===",
                             //          "left": {
                             //            "type": "Identifier",
                             //            "name": "n"
                             //          },
                             //          "right": {
                             //            "type": "Literal",
                             //            "value": 1,
                             //            "raw": "1"
                             //          }
                             //        }
                             //      }
                             //    ]
                             //  }
console.log(result.toJsSource()); // 'n === 1;'
console.log(result.check(1)); // false
console.log(result.check(2)); // true
```

Test
-------

`npm test` or `node test/test.js`


To consume the grammar directly
-------------------------------

The recommended approach is to create a git submodule via this:
`git submodule add git@github.com:mattpowell/plural-rule-parser.git`

Please open an issue if you need an alternate way to consume the grammar (e.g., a .tar.gz).


License
-------
MIT
