# Python APM Setup

## Prequisites :

* To monitor APM data on dashboard, Middleware Host agent needs to be installed.
* You can refer [this demo project](https://github.com/middleware-labs/demo-apm/tree/master/python) to refer use cases
  of APM.

--------------------

## Step 1 : Install Python package

Run this in your terminal

```
pip install middleware-apm
```

## Step 2 : Import Tracker

Add these line at the very start of your project

```
from apmpythonpackage import apmpythonclass
tracker=apmpythonclass()
```

---------------------

## Add custom logs

```
tracker.logemit('custom-tag', {'key1': 'value1', 'key2': 'value2'})
```

## Distributed Tracing

Add this line

```
tracer, trace, extract, collect_request_attributes = tracker.mw_tracer()
```

You can also pass project name & service name to mw_tracer Ex.

```
tracer, trace, extract, collect_request_attributes = tracker.mw_tracer('demo-project', 'demo-service')
```

Add this span to all the APIs that you want to instrument. (using `with`)

```
with tracer.start_as_current_span(
    "your-api-name",
    context=extract(request.headers),
    kind=trace.SpanKind.SERVER,
    attributes=collect_request_attributes(request.environ),
):
```

---------------

## Note :

If you are using APM in a Kubernetes cluster, Make sure to pass this ENV variable:

```
MW_AGENT_SERVICE=mw-service.mw-agent-ns-{FIRST-5-LETTERS-OF-API-KEY}.svc.cluster.local
```

## Error Handling :

If you want to record exception in traces then you can use tracker.record_error(e) method.

```
randomList = ['a', 0, 2]

for entry in randomList:
    try:
         r = 1/int(entry)
         break
    except Exception as e:
         tracker.record_error(e)
 
