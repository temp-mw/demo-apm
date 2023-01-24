const tracker = require('@middleware.io/node-apm');
const axios = require('axios');

tracker.track({
    projectName: "MW",
    serviceName: "service name",
});
const express = require('express');
const app = express();
app.get('/root', function (req, res) {
    tracker.info('root page api called');
    res.send('Welcome to root page!');
});
const server = app.listen(8401, function () {
    const url = "http://"+server.address().address+":8401/root"
    setTimeout(()=>{
        setInterval(()=>{
            axios.get(url)
                .then(response => {
                    console.log(response.data.url);
                })
                .catch(error => {
                    tracker.errorRecord(error)
                });
        },1000)
    },5000)
});
