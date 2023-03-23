
const tracker = require('@middleware.io/node-apm')
tracker.track();

tracker.info('Info sample');
tracker.warn('Warning sample');
tracker.debug('Debugging Sample');
tracker.error('Error Sample');

if (process.env.MW_AUTOGENERATE_LOGGING_DATA) {
    setTimeout(() => {}, 5000);

    for(let i=0; i<300; i++) {    
        tracker.error('Error Loop Sample');
    }
}

tracker.error(new Error('Error sample with stack trace'));