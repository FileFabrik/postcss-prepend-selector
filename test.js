const test = require('ava');
const postcss = require('postcss');

const plugin = require('./index');

function runTest(t, input, output, opts = {}) {
    return postcss([plugin(opts)]).process(input)
        .then(result => {
            t.is(result.css, output);
            t.is(result.warnings().length, 0);
        });
}

const selector = '.selector ';

test('Prepend selector', t =>
    runTest(t, 'a{ }', '.selector a{ }', { selector })
);

test('Prepend selectors', t =>
    runTest(t, 'a, .example{ }', '.selector a, .selector .example{ }'
        , { selector })
);

test('Should not prepend if class is already there', t =>
    runTest(t, '.selector.example{ }', '.selector.example{ }'
        , { selector })
);

test('Skip keyframe rules', t =>
    runTest(t, '0%, from {} 100%, to {}', '0%, from {} 100%, to {}'
        , { selector })
);

test('Skip numerical values with decimal in keyframes', t =>
    runTest(t, '@keyframes name{0%{}.5%{}0.9%{}10.10%{}20.1%{}100%{}}',
        '@keyframes name{0%{}.5%{}0.9%{}10.10%{}20.1%{}100%{}}'
        , { selector })
);

test('appendTo Tag', t =>
    runTest(t, 'body{ }', 'body .selector{ }',
        { appendTo: ['body'], selector: selector }
    )
);
test('appendTo Tag with excludePart first Find appendTo', t =>
    runTest(t, 'body{ }', 'body .selector{ }',
        { excludePart: ['body'], appendTo: ['body'], selector: selector }
    )
);
test('make Invalid', t =>
    runTest(t, 'body{ }', 'i_had_made_invalidbody{ }',
        {
            makeInvalid: {
                selectors:     ['body'],
                invalidPrefix: 'i_had_made_invalid'
            },
            selector: selector
        }
    )
);
