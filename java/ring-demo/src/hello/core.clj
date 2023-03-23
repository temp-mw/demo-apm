(ns hello.core
  "Instrumented version of tutorial counter-service application."
  (:require [ring.adapter.jetty :as jetty]
            [ring.middleware.params :as params]
            [ring.util.response :as response]
            ;; Add these 2 Middleware libraries as required
            [middleware-dev.clj-otel.api.trace.http :as mw-trace-http]
            [middleware-dev.clj-otel.api.trace.span :as mw-span]
            ))



(defonce ^{:doc "Counter state"} counter (atom 0))


(defn wrap-exception
  "Ring middleware for wrapping an exception as an HTTP 500 response."
  [handler]
  (fn [request]
    (try
      (handler request)
      (catch Throwable e
        (mw-span/add-exception! e {:escaping? false})
        (let [resp (response/response (ex-message e))]
          (response/status resp 500))))))


(defn reset-count-handler
  "Ring handler for 'PUT /reset' request. Resets counter, returns HTTP 204."
  [{:keys [query-params]}]
  (let [n (Integer/parseInt (get query-params "n"))]
    (reset! counter n)
    (response/status 204)))


(defn get-count-handler
  "Ring handler for 'GET /count' request. Returns an HTTP response with counter
  value."
  []
  (let [n @counter]
    (response/response (str n))))


(defn inc-count-handler
  "Ring handler for 'POST /inc' request. Increments counter, returns HTTP 204."
  []
  (response/status 204))


;; Add Middleware elements "mw-span/add-span-data", "mw-span/with-span!" into your handler
(defn handler
  "Ring handler for all requests."
  [{:keys [request-method uri]
    :as   request}]
  (let [response (case [request-method uri]
                   [:put "/reset"] (reset-count-handler request)
                   [:get "/count"] (get-count-handler)
                   [:post "/inc"]  (inc-count-handler)
                    (response/not-found "Not found"))
                    request-name (str uri)]
    (mw-span/add-span-data! {:attributes {:service.counter/count @counter}})
    (mw-span/with-span! {:name request-name}
      response)))


(def service
  "Ring handler with middleware applied."
  (-> handler
      params/wrap-params
      wrap-exception
      ;; Add "mw-trace-http/wrap-server-span" to your service
      (mw-trace-http/wrap-server-span)))




(defn -main []
  (jetty/run-jetty service {:port 8889}))
