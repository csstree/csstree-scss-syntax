module.exports = {
    parse: {
        expression: function() {
            // SelectorList is used due to warning about wrong structure
            // since Atrule doesn't specify a Selector as valid value for expression
            // TODO: change for this.Selector()
            return this.SelectorList();
        },
        block: false
    }
};
