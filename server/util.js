"use strict";

exports.log = (msg) => {
    const ts = new Date().toISOString().replace('T', ' ').slice(0,19);
    console.log(`${ts} ${msg}`);
};