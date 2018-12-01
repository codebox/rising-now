const express = require('express'),
    service = require('./service'),
    log = require('./util').log,
    app = express(),
    PORT = 3000;

app.use((req, res, next) => {
    log(req.originalUrl);
    next()
});

app.use(express.static('../web'));

app.get('/api/:lat/:lng', (req, res) => {
    const lat = Number(req.params.lat),
        lng = Number(req.params.lng),
        results = service.calc(lat, lng);

    res.send(results);
});

service.init();

app.listen(PORT, () => log(`Listening on port ${PORT}...`))