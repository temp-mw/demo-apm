# Browser traces Setup

To monitor Browser data on a dashboard, add these lines given below at the head section of your project.

```
<script src="https://cdnjs.middleware.io/browser/libs/0.0.1/middleware-rum.min.js" type="text/javascript"></script>
<script  type="text/javascript">
   window.Middleware &&
    window.Middleware.track({
         projectName:"Your project name",
         accountKey:"{ACCOUNT_KEY}",
         target:"https://{ACCOUNT-UID}.middleware.io"
    });
</script>
