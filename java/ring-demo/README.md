# Clojure/ring demo

Refer "project.clj" & "src/hello/core.clj" to understand the instrumentation process. 

Run example with  ...
```
lein run
```
----


## Instrument Your own Clojure/Ring application

### Step 0 - Prequisites
In order to visualize trace data in Middleware UI, make sure that Middleware Host agent is already monitoring your infrastructure.


### Step 1
Add dependency in your "project.clj" OR "deps.edn"
```
[org.clojars.middleware-dev/clj-otel-api "0.1.12-SNAPSHOT"]
```

### Step 2
Add middleware-javaagent using jvm-opts
```
:jvm-opts ["-javaagent:middleware-javaagent.jar"
    "-Dotel.resource.attributes=project.name=counter-project"
    "-Dotel.service.name=counter-service"
]
```
If you do not have middleware-javaagent.jar, you can download it from [here](https://install.middleware.io/jars/middleware-javaagent.jar)

### Step 3
Add these elements as required components
```
[middleware-dev.clj-otel.api.trace.http :as mw-trace-http]
[middleware-dev.clj-otel.api.trace.span :as mw-span]
```

### Step 4
Update your handler to include these middlewares
```
(mw-span/add-span-data! {:attributes {:service.counter/count @counter}})
(mw-span/with-span! {:name request-name}
    response)
```

### Step 5
Add this to your service definition
```
(mw-trace-http/wrap-server-span)
```

