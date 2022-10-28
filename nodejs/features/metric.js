const tracker = require('@middleware.io/node-apm')
tracker.track()

setInterval(()=>{
    console.log("metric sample running ....")
}, 5000)