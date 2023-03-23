import * as tracker from "@middleware.io/agent-apm-worker";

export interface Env {
	OTLP_ENDPOINT: string;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {

		tracker.init({
			projectName:"demo-cloudflare-project",
			serviceName:"demo-cloudflare-service",
			 accountKey:"{ACCOUNT_KEY}",
                        target:"https://{ACCOUNT-UID}.middleware.io"
		
		})
		
		const sdk = tracker.track(request, ctx);
		
		sdk.logger.error("demo error log")
		sdk.logger.info("demo info log")
		sdk.logger.warn("demo warn log")
		sdk.logger.debug("demo debug log")

		const url = new URL(request.url);
    	        console.log("123----" + `${url.pathname}`);
		const response = await sdk.fetch(`https://httpbin.org${url.pathname}`);
		return sdk.sendResponse(response);
	},
};
