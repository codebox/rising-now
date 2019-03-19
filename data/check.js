"use strict";
// TODO remove this file once grammar is finalised
const parse = require('./index').parse,
    fs = require('fs');

let total=0, ok=0;
const list = fs.readFileSync('./types.txt').toString().split("\n");

list.forEach(c => {
    total++;
    const result = parse(c)
    if (result && result.remainder === ''){
        ok++;
        //console.log(c)
    } else {
        console.log(c)
    }
})
console.log(`${ok}/${total}`)
