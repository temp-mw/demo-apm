
const tracker = require('@middleware.io/node-apm')
tracker.track();

tracker.info('Info sample');
tracker.warn('Warning sample');
tracker.debug('Debugging Sample');
tracker.error('Error Sample');

tracker.error(new Error('Error sample with stack trace'));