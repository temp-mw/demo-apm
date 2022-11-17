# Java APM Setup

## Prequisites :

* To monitor APM data on dashboard, Middleware Host agent needs to be installed.
* You can refer [this demo project](https://github.com/middleware-labs/demo-apm/tree/master/nodejs) to refer use cases of APM.

--------------------

## Step 1 : Add Maven Package

Add this dependency in pom.xml
```
<dependency>
  <groupId>io.github.middleware-labs</groupId>
  <artifactId>agent-apm-java</artifactId>
  <version>0.0.7</version>
</dependency>
```
Then run ...
```
mvn install
```
---------------------

## Distributed Tracing

Add the follwing lines to record traces
```
import io.github.middlewarelabs.agentapmjava.MwTracer;
MwTracer.track();
```

## Add custom logs

Import logger package
```
import io.github.middlewarelabs.agentapmjava.Logger;
```

Use these functions for logging with different severity levels

```
Logger.info("info message");
Logger.debug("debug message");
Logger.warn("warn message");
Logger.error("error message");
```

