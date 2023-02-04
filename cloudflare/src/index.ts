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
			projectName:"test-cloudflare-project",
			serviceName:"test-cloudflare-service",
			accountKey:"xusuusalpvush63ud7zcg8bi3mauuptds528",
			target:"https://p2i13hg.middleware.io:443"
		
		})
		
		const sdk = tracker.track(request, ctx);
		


		const url = new URL(request.url);
    	console.log("123----" + `${url.pathname}`);
		const response = await sdk.fetch(`https://httpbin.org${url.pathname}`);
		return sdk.sendResponse(response);
	},
};
