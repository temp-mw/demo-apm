# Agent APM for Cloudflare Workers

In order to track http requests in your cloudflare worker , You need to ..

### Step 1 :  Install Middleware Worker Package

```
npm i @middleware.io/agent-apm-worker
```

### Step 2 : Import Tracker
```javascript
import * as tracker from "@middleware.io/agent-apm-worker";
```

### Step 3 : Initialize Tracker with your Middleare API key  

Add this snippet given below and replace the required details.
```typescript
tracker.init({
    projectName:"{APM-PROJECT-NAME}",
    serviceName:"{APM-SERVICE-NAME}",
    accountKey:"{ACCOUNT_KEY}",
    target:"https://{ACCOUNT-UID}.middleware.io"
})
```

### Step 4 : Track all the requests with middleware SDK

```typescript		
const sdk = tracker.track(request, ctx);
return sdk.sendResponse(response);
```

### Step 5 : Add Logging

If you want to add logs to your application (which will be accessible from Middleware UI), use these functions ...

```typescript		
sdk.log.info("info test")
sdk.log.debug("debug test")
sdk.log.error("error test")
sdk.log.warn("warn test")
```
