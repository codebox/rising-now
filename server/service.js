"use strict";
const log = require('./util').log,
    fs = require('fs'),
    parseClass = require('stellar-classification-parser').parse,
    DATA_FILE = '../data/data.csv';

let data, dataCount;


function processRow(row) {
    const parts = row.split(',');

    return [
        Number(parts[0]),   // Hipparcos Number
        parts[1],           // Name
        Number(parts[2]) * 3.26156,   // Distance in Light Years
        Number(parts[3]),   // Apparent Magnitude
        Number(parts[4]),   // Absolute Magnitude
        parseClass(parts[5] || ''),           // Spectral Class
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

const MILLISECONDS_PER_SECOND = 1000,
    SECONDS_PER_MINUTE = 60,
    MINUTES_PER_HOUR = 60,
    SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR,
    HOURS_PER_DAY = 24,
    MINUTES_PER_DAY = MINUTES_PER_HOUR * HOURS_PER_DAY,
    SECONDS_PER_DAY = SECONDS_PER_MINUTE * MINUTES_PER_DAY,
    MILLISECONDS_PER_DAY = SECONDS_PER_DAY * MILLISECONDS_PER_SECOND,
    EPOCH_MILLIS_AT_2000_01_01_12_00_00 = 946728000000;

function unmod(r, a, b, m, x_0, x_1) {
    // find all 'n' such that x_0 <= (n * m + r - a) / b <= x_1
    const from_n = Math.ceil((x_0 * b + a - r) / m),
        to_n = Math.floor((x_1 * b + a - r) / m);
    const x_values = []
    for (let n = from_n; n <= to_n; n++) {
        x_values.push((n * m + r - a) / b);
    }
    return x_values;
}
function zeroPad(num, len) {
    return num.toString().padStart(len, '0');
}
function hoursToClockTime(timeInHours) {
    const hours = Math.floor(timeInHours),
        minutes = Math.floor((timeInHours - hours) * MINUTES_PER_HOUR),
        seconds = Math.floor((timeInHours - hours - minutes / MINUTES_PER_HOUR) * SECONDS_PER_HOUR);

    return `${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}`;
}

function radiansToUtcTime(radians, now, lngRadians) {
    const daysSince_2000_01_01_12 = (now - EPOCH_MILLIS_AT_2000_01_01_12_00_00) / MILLISECONDS_PER_DAY,
        prevMidDay = Math.floor(daysSince_2000_01_01_12),
        // https://aa.usno.navy.mil/faq/docs/GAST.php
        days = unmod(radians, 4.894961212735792 + lngRadians, 6.30038809898489, 2 * Math.PI,
            prevMidDay, prevMidDay + 1)[0],
        millisSinceEpoch = days * MILLISECONDS_PER_DAY + EPOCH_MILLIS_AT_2000_01_01_12_00_00;

    return Math.floor(millisSinceEpoch);
}

function process(latRadians, lngRadians, row){
    const ra = getRightAscension(row),
        dec = getDeclination(row),
        x = Math.acos(-Math.tan(dec) * Math.tan(latRadians)),
        riseTime = ra - x,
        setTime = ra + x,
        now = Date.now();

    row.push(radiansToUtcTime(riseTime, now, lngRadians));
    row.push(radiansToUtcTime(setTime, now, lngRadians));
    return row;
}

exports.calc = (latDegrees, lngDegrees) => {
    const latRadians = toRadians(latDegrees),
        lngRadians = toRadians(lngDegrees),
        risingObjects = data.filter(row => rises(latRadians, row)).map(row => process(latRadians, lngRadians, row));//.filter((o,i) => i<100);

    risingObjects.sort((r1, r2) => r1[9] - r2[9]);

    log(`Returning ${risingObjects.length} objects [${Math.round(100 * risingObjects.length/dataCount)}% of total]`);

    return risingObjects;
};
