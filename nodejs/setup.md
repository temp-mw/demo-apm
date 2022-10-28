# Node.js APM Setup


## Step 1 : Install NPM package

Run this in your terminal
```
npm install @middleware.io/node-apm
```

## Step 2 : Prepend APM script

Add these lines given below at the very start of your project.

```
const tracker = require('@middleware.io/node-apm');
tracker.track();
```
---------------------

## Collect Node.js specific metrics

The metrics collection starts automatically as soon as you complete `Step 2`


## Distributed Tracing

All your APIs are auto-instrumented as soon as you complete `Step 2`


## Add custom logs

```

```