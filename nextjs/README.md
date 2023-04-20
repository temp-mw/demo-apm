# Next.js APM Setup

## Guide

### Step 1: Install Next.js APM package

Run below command in your terminal to install Middleware's Next.js APM package.
```
npm install @middleware.io/agent-apm-nextjs
```

### Step 2: Changes in `next.config.js` file

This feature is experimental, you need to explicitly opt-in by providing below thing into your **next.config.js** file.
```
const nextConfig = {
     ---
     ---
     experimental: {
         instrumentationHook: true
     }
     ---
     ---
}
module.exports = nextConfig
```

### Step 3: Creation of `Instrumentation` file

Now create a custom `instrumentation.ts` file in your project root directory, and add following code as per your choice:

- If you are using [Middleware's Host-agent](https://docs.middleware.io/docs/installation) on your machine then use below code snippet:
```
// @ts-ignore
import { track } from '@middleware.io/agent-apm-nextjs';

export function register() {
    track({
        projectName: "<PROJECT-NAME>",
        serviceName: "<SERVICE-NAME>",
    });
}
```
- If you want to instrument your project without installing any host then use the below code snippet:
```
// @ts-ignore
import { track } from '@middleware.io/agent-apm-nextjs';

export function register() {
    track({
        projectName: "<PROJECT-NAME>",
        serviceName: "<SERVICE-NAME>",
        accountKey: "{ACCOUNT_KEY}",
        target: "https://{ACCOUNT-UID}.middleware.io"
    });
}
```
---------------------

## Note:

If you are using APM in a Kubernetes cluster, Make sure to pass this ENV variable:

```
MW_AGENT_SERVICE=mw-service.mw-agent-ns-{FIRST-5-LETTERS-OF-API-KEY}.svc.cluster.local
```