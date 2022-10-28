# Node.js APM Guide

## Prequisites

If you are expecting python demo data on your dashboard, make sure you have our Host Agent installed.

---------------------

## Log Collection
```
node features/log.js
```

## Distributed Tracing
```
node features/trace.js
```

## Python Specific Metrics
```
node features/metric.js
```

## Complete Example
```
node app.js
```

---------------------------------

## Troubleshooting Demo
If your infrastructure is missing dependencies like g++, make, etc.

OR your node-gyp build fails, try ...
```
sudo apt-get build-dep build-essential
sudo apt-get install gcc
sudo apt-get install g++
sudo apt-get install make
```
