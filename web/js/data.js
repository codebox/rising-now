"use strict";

const data = (() => {
    let data, index=0;
    return {
        load(serverData) {
            data = serverData;
            index = (data||[]).findIndex(row => row[9] > Date.now());
        },
        get() {
            const matches = [], now = Date.now();

            while(data[index][9] < now) {
                matches.push(data[index++]);
            }

            return matches;
        }
    };
})();