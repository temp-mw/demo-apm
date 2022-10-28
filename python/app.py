# You will need request from flask to monitor your traces
from flask import Flask, request

# Add these 3 lines as it is (for traces)
from apmpythonpackage import apmpythonclass
tracker=apmpythonclass()
tracer, trace, extract, collect_request_attributes = tracker.mw_tracer()

# tracker.logemit('PASS A CUSTOM TAG HERE', PASS A JSON)
tracker.logemit('custom-tag', {'key1': 'value1', 'key2': 'value2'})

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

if __name__ == '__main__':
    app.run()

