# You will need request from flask to monitor your traces
from flask import Flask, request

# Add these 3 lines as it is (for traces)
from apmpythonpackage import apmpythonclass
tracker=apmpythonclass()
tracer, trace, extract, collect_request_attributes = tracker.mw_tracer("custom-project", "custom-service")

tracker.error('python error log sample')
tracker.debug('python debug log sample')
tracker.warn('python warning log sample')
tracker.info('python info log sample')


app = Flask(__name__)

@app.route('/')
def hello_world():

    # Add this span to every path that you want to monitor (for traces)
    with tracer.start_as_current_span(
        "hello_world",
        context=extract(request.headers),
        kind=trace.SpanKind.SERVER,
        attributes=collect_request_attributes(request.environ),
    ):
        return 'Hello World!'

@app.route('/exception')
def generate_exception():

    # Add this span to every path that you want to monitor
    with tracer.start_as_current_span(
        "generate_exception",
        context=extract(request.headers),
        kind=trace.SpanKind.SERVER,
        attributes=collect_request_attributes(request.environ),
    ):
        randomList = ['a', 0, 2]

        for entry in randomList:
            try:
                print("The entry is", entry)
                r = 1/int(entry)
                break
            except Exception as e:
               tracker.record_error(e)
        print("The reciprocal of", entry, "is", r)
        return 'Exception Generated!'

if __name__ == '__main__':
    app.run()

