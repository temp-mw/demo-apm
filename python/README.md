# Python APM Guide

## Prequisites

If you are expecting python demo data on your dashboard, make sure you have our Host Agent installed.

---------------------

## Log Collection
```
export PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python
python3 features/log.py
```

## Distributed Tracing
```
export PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python
python3 features/trace.py
```

## Python Specific Metrics
```
Coming soon ...
```

## Complete Example
```
export PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python
python3 app.py
```

---------------------------------

## Troubleshooting Demo
If you face any protoc specific errors, Try setting ...
```
PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION=python
```
