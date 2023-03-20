(defproject hello "0.1.0-SNAPSHOT"
  :description "very basic ring application"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}

  :dependencies [[org.clojure/clojure "1.10.3"]
                   [ring/ring-core "1.2.1"]
                   [ring/ring-jetty-adapter "1.2.1"]    
                  ;;  Add this Middleware clojar in your dependencies               
                   [org.clojars.middleware-dev/clj-otel-api "0.1.12-SNAPSHOT"]                   
                  ]
  :aot [hello.core] 

  :jvm-opts ["-javaagent:middleware-javaagent.jar"
              "-Dotel.resource.attributes=project.name=counter-project"
              "-Dotel.service.name=counter-service"
            ]

   
  :main hello.core)
