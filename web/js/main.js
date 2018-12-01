"use strict";

document.onload=(() => {
    navigator.geolocation.getCurrentPosition(pos => {
        fetch(`/api/${pos.coords.latitude}/${pos.coords.longitude}`)
            .then(rsp => {
                return rsp.json();
            })
            .then(obj => {
                data.load(obj);

                setInterval(() => {
                    data.get().forEach(view.display);
                }, 1000);
            });

    }, err => {
        alert(err)
    });

})();