"use strict";
// TODO remove this file once grammar is finalised
const buildParser = require('../server/parser').buildParser,
    fs = require('fs');

const classificationGrammar = fs.readFileSync('./classification_grammar.txt').toString(),
    classificationParser = buildParser(classificationGrammar);

let total=0, ok=0;
const list = fs.readFileSync('./types.txt').toString().split("\n");

list.forEach(c => {
    total++;
    const result = classificationParser.parse(c)
    if (result && result.remainder === ''){
        ok++;
        //console.log(c)
    } else {
        console.log(c)
    }
})
console.log(`${ok}/${total}`)
