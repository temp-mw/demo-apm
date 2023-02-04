from apmpythonpackage import apmpythonclass
tracker=apmpythonclass()
tracker.mw_tracer("custom-project", "custom-service")

tracker.error('python error log sample')
tracker.debug('python debug log sample')
tracker.warn('python warning log sample')
tracker.info('python info log sample')


