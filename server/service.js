"use strict";
const log = require('./util').log,
    fs = require('fs'),
    DATA_FILE = '../data/data.csv';

let data, dataCount;

function processRow(row) {
    const parts = row.split(',');

    return [
        Number(parts[0]),   // Hipparcos Number
        parts[1],           // Name
        Number(parts[2]),   // Distance in Parsecs
        Number(parts[3]),   // Apparent Magnitude
        Number(parts[4]),   // Absolute Magnitude
        parts[5],           // Spectral Class
        Number(parts[6]),   // RA Radians
        Number(parts[7]),   // DEC Radians
        parts[8]            // Constellation
    ];
}

exports.init = () => {
    log('Initialising service');

    data = fs.readFileSync(DATA_FILE).toString().split("\n").map(processRow);
    dataCount = data.length;

    log(`Service initialisation complete, read ${dataCount} objects from ${DATA_FILE}`);
};

function toRadians(degrees) {
    return Math.PI * degrees / 180;
}

function getRightAscension(row) {
    return row[6];
}

function getDeclination(row) {
    return row[7];
}

function rises(latRadians, row) {
    const declination = getDeclination(row);

    return (Math.abs(declination - latRadians) <= Math.PI / 2) && (Math.abs(declination + latRadians) <= Math.PI / 2);
}

function process(latRadians, lngRadians, row){
    const ra = getRightAscension(row),
        dec = getDeclination(row),
        x = Math.acos(-Math.tan(dec) * Math.tan(latRadians)),
        riseTime = ra - x,
        setTime = ra + x;
    row.push(riseTime);
    row.push(setTime);
    return row;
}

exports.calc = (latDegrees, lngDegrees) => {
    const latRadians = toRadians(latDegrees),
        lngRadians = toRadians(lngDegrees),
        risingObjects = data.filter(row => rises(latRadians, row)).map(row => process(latRadians, lngRadians, row));

    log(`Returning ${risingObjects.length} objects [${Math.round(100 * risingObjects.length/dataCount)}% of total]`);

    return risingObjects;
};
