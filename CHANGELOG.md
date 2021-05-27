# 0.4.4 (2021-05-27) revert dependency to postcss 7.0.35 to get it running with tailwind and build in vue 2
# 0.4.5 (2021-05-27) config-parameter
Prefixing special selectors with a string that not exists in html tags to prevent using "body" - selector

`body{some unwanted global reset stuff}`  -> `i_had_made_invalid_body{some unwanted global reset stuff}`
```json
makeInvalid: {
    selectors:     ['body'],
    invalidPrefix: 'i_had_made_invalid_'
}
```


# 0.4.5 (2021-05-27) config-parameter
`appendTo:['body']`

`body{some unwanted global reset stuff}` -> `body .selector{some unwanted global reset stuff}
`
# 0.4.4 (2021-05-25) update dependency to postcss 8.2.13 version bump
# 0.4.3 (2021-05-20) update dependency to postcss 7.0.35
# 0.4.3 (2021-05-20) reactivating the old ava-test, but without new tests
# 0.4.2 (2021-05-19) docu extended with tailwind postcss example
# 0.4.1 (2021-05-19) renamed to prepend-selector-postcss without npm scope
# 0.4.0 (2021-05-19)

Added: exclude .classnames and #id's
Added: excludePart for .classnames and #id's start with

# 0.2.0 (2016-01-03)

Added: support for multiple selectors (fix [#1](https://github.com/ledniy/postcss-prepend-selector/issues/1))

# 0.1.0 (2015-12-24)

This is first release

## Features
- Prepend selector for each rule
