"use strict";

const fs = require('fs'),
    buildParser = require('./parser').buildParser,
    classificationGrammar = fs.readFileSync('../data/classification_grammar.txt').toString(),
    classificationParser = buildParser(classificationGrammar),
    cache = {},
    EMPTY_DETAILS = {};

function extractValuesFromParseTree(tree) {
    const values = {};

    function search(o, path) {
        Object.keys(o).forEach(k => {
            o[k].forEach(v => {
                const newPath = `${path}.${k}`;
                if (typeof v === 'object') {
                    search(v, path + '.' + k)
                } else if (v !== 'ε') {
                    if (!values[newPath]){
                        values[newPath] = [];
                    }
                    values[newPath].push(v);
                }
            })
        });
    }
    search(tree, '');

    return values;
}

function processClassification(text) {
    if (!text) {
        return EMPTY_DETAILS;
    }
    if (!cache[text]) {
        const parseResult = classificationParser.parse(text);
        if (parseResult) {
            cache[text] = extractValuesFromParseTree(parseResult.tree);
        } else {
            cache[text] = EMPTY_DETAILS;
        }
    }
    return cache[text];
}

exports.process = processClassification;