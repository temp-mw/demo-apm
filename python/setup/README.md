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
tracker.mw_tracer({APM-PROJECT-NAME}, {APM-SERVICE-NAME})
```

---------------------

## Add custom logs

```
tracker.error('python error log sample')
tracker.debug('ipython debug log sample')
tracker.warn('python warning log sample')
tracker.info('python info log sample')
```

## Distributed Tracing
Run the below command for Distributed Tracing:
```
middleware-instrument --resource_attributes=project.name={APM-PROJECT-NAME} --metrics_exporter none --exporter_otlp_endpoint http://localhost:9319  --traces_exporter otlp --service_name {APM-SERVICE-NAME} python3 <your-file-name>.py
```


## Note :

If you are using APM in a Kubernetes cluster, Make sure to pass this ENV variable:

```
MW_AGENT_SERVICE=mw-service.mw-agent-ns-{FIRST-5-LETTERS-OF-API-KEY}.svc.cluster.local

middleware-instrument --resource_attributes=project.name={APM-PROJECT-NAME} --metrics_exporter none --exporter_otlp_endpoint MW_AGENT_SERVICE  --traces_exporter otlp --service_name {APM-SERVICE-NAME} python3 <your-file-name>.py
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
 
