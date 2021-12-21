let postcss = require('postcss');

module.exports = postcss.plugin('prepend-selector-postcss', function (opts) {

    opts = opts || {};
    opts.exclude = opts.exclude ? opts.exclude : null;
    opts.excludePart = opts.excludePart ? opts.excludePart : null;
    opts.excludeTag = opts.excludeTag ? opts.excludeTag : null;
    /*
 * for modernizer scripts html { resets everything} make
 * appendTag:['html','body']
 * to generate html .selector {resets everything}
* */
    opts.appendTo = opts.appendTo ? opts.appendTo : null;
    /** *
     *
     * @type {null|*}
     */
    opts.makeInvalid = opts.makeInvalid ? opts.makeInvalid : null;

    return function (css) {
        css.walkRules(function (rule) {
            rule.selectors = rule.selectors.map(function (selector) {
                if (/^([0-9]*[.])?[0-9]+%$|^from$|^to$/.test(selector)) {
                    // This is part of a keyframe
                    return selector;
                }

                if (selector.startsWith(opts.selector.trim())) {
                    return selector;
                }

                /** FileFabrik change have ignores
                 * 'body{ }', 'i_had_made_invalidbody{ }'
                 **/
                if (opts.makeInvalid &&
                    Array.isArray(opts.makeInvalid.selectors)) {

                    let found = false;
                    opts.makeInvalid.selectors.forEach(
                        function (invalidateSel) {
                            if (selector.startsWith(invalidateSel))
                                found = invalidateSel;
                            return found;
                        });
                    if (found) {
                        return (opts.makeInvalid.invalidPrefix +
                            selector).trimEnd();
                    }
                }

                /** FileFabrik change have ignores    excludePart: ['.grid'] **/
                if (opts.appendTo && Array.isArray(opts.appendTo)) {
                    let found = false;
                    opts.appendTo.forEach(function (appendTo) {
                        if (selector.startsWith(appendTo))
                            found = true;
                        return found;
                    });
                    if (found) {
                        return (selector + ' ' + opts.selector).trimEnd();
                    }
                }

                /**
                 * todo excluding tag (such as html,body)
                 */

                /** FileFabrik change have ignores
                 * exclude: ['#exc '],
                 **/
                if (opts.exclude && Array.isArray(opts.exclude)) {
                    /** append the space after because of full term **/
                    const s = selector.split(' ')[0] + ' ';
                    if (opts.exclude.indexOf(s) !== -1) {
                        return selector;
                    }
                }
                /** FileFabrik change have ignores excludePart: ['.grid'] **/
                if (opts.excludePart && Array.isArray(opts.excludePart)) {
                    let found = false;
                    opts.excludePart.forEach(function (excludePart) {
                        if (selector.startsWith(excludePart))
                            found = true;
                        return found;
                    });
                    if (found)
                        return selector;
                }
                // default return concat
                return opts.selector + selector;
            });
        });
    };
});
