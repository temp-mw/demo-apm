# You will need request from flask to monitor your traces
from flask import Flask, request

# Add these 3 lines as it is
from apmpythonpackage import apmpythonclass
tracker=apmpythonclass()
tracer, trace, extract, collect_request_attributes = tracker.mw_tracer()

app = Flask(__name__)

@app.route('/')
def hello_world():

    # Add this span to every path that you want to monitor
    with tracer.start_as_current_span(
        "hello_world",
        context=extract(request.headers),
        kind=trace.SpanKind.SERVER,
        attributes=collect_request_attributes(request.environ),
    ):
        return 'Hello World!'

if __name__ == '__main__':
    app.run()

