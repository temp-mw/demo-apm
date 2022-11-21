# Java APM Setup

## Prequisites :

* To monitor APM data on dashboard, Middleware Host agent needs to be installed.
* You can refer [this demo project](https://github.com/middleware-labs/demo-apm/tree/master/java) to refer use cases of APM.

--------------------

## Distributed Tracing

For recording the traces you will need to download JAR files given below.

[middleware.jar](https://install.middleware.io/jars/middleware.jar)

[middleware-extension](https://install.middleware.io/jars/middleware-extension.jar)

And then run your project with command given below

```
java -javaagent:/PATH/TO/middleware.jar \
    -Dotel.javaagent.extensions=/PATH/TO/middleware-extension.jar \
    -Dotel.service.name=test-service \
    -Dotel.traces.exporter=logging,otlp \
    -Dotel.metrics.exporter=logging,otlp \
    -Dotel.exporter.otlp.protocol=grpc \
    -Dotel.exporter.otlp.endpoint="http://0.0.0.0:9319" \
    -jar <YOUR_APP>.jar
```

## Add custom logs

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

