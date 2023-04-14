# Nextjs-Vercel APM Setup

## Prerequisites

* To monitor APM data on dashboard, [Middleware Host-agent](https://docs.middleware.io/docs/getting-started) needs to be installed.

--------------------

## Guide

### Step 1: Install Nextjs-Vercel package

Run below command in your terminal to install Middleware's Nextjs-Vercel package.
```
npm install @middleware.io/nextjs-vercel
```

### Step 2: Changes in `next.config.js` file

According to [Vercel](https://vercel.com/), this feature is experimental, you need to explicitly opt-in by providing below thing into your **next.config.js** file.
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

Now create a custom `instrumentation.ts` file in your project root directory, and add below code snippet:
```
// @ts-ignore
import { track } from '@middleware.io/nextjs-vercel';

export function register() {
    track({
        projectName: "<PROJECT-NAME>",
        serviceName: "<SERVICE-NAME>",
    });
}
```

---------------------

## Note:

If you are using APM in a Kubernetes cluster, Make sure to pass this ENV variable:

```
MW_AGENT_SERVICE=mw-service.mw-agent-ns-{FIRST-5-LETTERS-OF-API-KEY}.svc.cluster.local
```