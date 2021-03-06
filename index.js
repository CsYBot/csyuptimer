'use strict';
const express = require("express");

module.exports = function(app = false, path = "/uptimer", port = 3000) {
    var realapp = null;
    if(app != false) {
        realapp = app;
    } else {
        realapp = express();
        var listener = realapp.listen(port, () => {});
        listener.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.log(`[${require("./package.json").name}] ERROR Already Port`)
                return false;
            }
        });
    }
    realapp.get(path, (req, res, next) => {
        res.status(200).send("Success!");
    });
    return true;
}
