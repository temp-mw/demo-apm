# ring-demo

Instrument ring app with these steps.

## Step 1
Add depdency in your "project.clj" OR "deps.edn"
```
[org.clojars.middleware-dev/clj-otel-api "0.1.5-SNAPSHOT"]
```

## Step 2
Add middleware-javaagent using jvm-opts
```
:jvm-opts ["-javaagent:middleware-javaagent.jar"
    "-Dotel.resource.attributes=project.name=counter-service"
    "-Dotel.service.name=counter-jaeger"
]
```

## Step 3
Add this elements as required components
```
[steffan-westcott.clj-otel.api.trace.http :as trace-http][steffan-westcott.clj-otel.api.trace.span :as span]
```

## Step 4
Instrument your APIs by adding this middleware
```
    (span/add-span-data! {:attributes {:service.counter/count n}})
    (span/with-span! {:name "Getting counter"}
        (swap! counter inc))
```

