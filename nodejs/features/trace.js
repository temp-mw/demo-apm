const tracker = require('@middleware.io/node-apm');
let express = require('express');

tracker.track({
    projectName: "pro-node-2.1.2-rc.3",
    serviceName: "ser-node-2.1.2-rc.3",
    accessToken: "mgqjtlgshkyhlykoaermkzbjpmgprkrzmbsb",
    target: "https://sbncr.stage.env.middleware.io",
});

let app = express();

app.get('/root', function (req, res) {
    tracker.info('root page api called');
    // tracker.setAttribute("user.id","1")
    res.send('Welcome to root page!');
});

app.get('/error', function (req, res) {
    try{
        throw new Error('oh error!');
    }catch (e) {
        tracker.errorRecord(e)
    }
    tracker.error('error page');
    res.status(500).send("wrong");
});

let server = app.listen(8401, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});