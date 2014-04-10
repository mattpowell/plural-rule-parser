var Peg = require('pegjs'),
    Fs = require('fs'),
    Escodegen = require('escodegen'),
    grammar = Fs.readFileSync(__dirname + '/parser.peg').toString(),
    PegParser = Peg.buildParser(grammar),
    Parser;

module.exports = Parser = {

  /**
   * Generate an AST and javascript function from the passed in plural rule.
   * @param rule
   * @returns {{toAst: Function, toJsSource: Function, test: Function}}
   */
  parse: function(rule) {
    var ast = PegParser.parse(rule),
        source = Escodegen.generate(ast);

    return {

      /**
       * Returns the raw AST as parsed by PEG.js (for the passed in plural rule)
       * @returns {*}
       */
      toAst: function() {
        return ast;
      },

      /**
       * Returns the javascript code (as a string) that was generated from the AST.
       * @returns string
       */
      toJsSource: function() {
        return source;
      },

      /**
       * Check if a number (`n`) is plural or not according to the previously passed in plural rule.
       * @param n
       * @returns boolean
       */
      check: function(n) {
        return !(new Function('n', 'return ' + source))(n);
      }
    }

  },

  /**
   * Raw PEG.js grammar for parsing plural form
   */
  grammar: grammar,

  /**
   * PEG.js parser built from grammar
   */
  parser: PegParser
};