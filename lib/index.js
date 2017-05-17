var csstree = require('css-tree');
var TYPE = csstree.Tokenizer.TYPE;

module.exports = csstree.fork(function(syntax, assign) {
    var defaultSelectorGetNode = syntax.scope.Selector.getNode;
    var defaultValueGetNode = syntax.scope.Value.getNode;

    return assign(syntax, {
        scope: assign(syntax.scope, {
            Selector: assign(syntax.scope.Selector, {
                getNode: function(context) {
                    if (this.scanner.tokenType === TYPE.PercentSign) {
                        return this.SassPlaceholderSelector();
                    }

                    return defaultSelectorGetNode.call(this, context);
                }
            }),
            Value: assign(syntax.scope.Value, {
                getNode: function(context) {
                    // #{ .. }
                    if (this.scanner.tokenType === TYPE.NumberSign &&
                        this.scanner.lookupType(1) === TYPE.LeftCurlyBracket) {
                        return this.SassInterpolation(this.readSequence, context.recognizer);
                    }

                    if (this.scanner.tokenType === TYPE.DollarSign) {
                        return this.SassVariable();
                    }

                    return defaultValueGetNode.call(this, context);
                }
            })
        }),
        atrule: {
            extend: require('./atrule/extend')
        },
        node: assign(syntax.node, {
            SassInterpolation: require('./node/SassInterpolation'),
            SassPlaceholderSelector: require('./node/SassPlaceholderSelector'),
            SassVariable: require('./node/SassVariable')
        })
    });
});
