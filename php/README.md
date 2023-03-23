# PHP APM Setup

## Prequisites :

* To monitor APM data on dashboard, [Middleware Host-agent](https://docs.middleware.io/docs/getting-started) needs to be installed.
* You can refer [this demo project](https://github.com/middleware-labs/demo-apm/tree/master/php) to refer use cases of APM.

--------------------

## Step 1 : Install Composer

Run this in your terminal
```
composer init
```

## Step 2 : Install Middleware APM package

Then after, Run below command in your terminal
```
composer require middleware/agent-apm-php
```

## Step 3 : Prepend APM script

Add these lines given below at the very start of your project.

```
require 'vendor/autoload.php';
use Middleware\AgentApmPhp\MwApmCollector;
```

## Step 4 : Use APM Collector in your function of any class

```
$mwCollector = new MwApmCollector('DemoProject', 'PrintService');
$mwCollector->tracingCall(get_called_class(), __FUNCTION__, __FILE__, [
    'code.lineno' => '10',
    'code.column' => '12',
    'net.host.name' => 'localhost',
    'db.name' => 'users',
    'custom.attr1' => 'value1',
]);
```

---------------------

## Note :

If you are using APM in a Kubernetes cluster, Make sure to pass this ENV variable:

```
MW_AGENT_SERVICE=mw-service.mw-agent-ns-{FIRST-5-LETTERS-OF-API-KEY}.svc.cluster.local
```