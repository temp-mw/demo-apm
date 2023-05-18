// @ts-ignore
import { track } from '@middleware.io/agent-apm-nextjs';

export function register() {
    track({
        projectName: "Project 01",
        serviceName: "Test-Service",
        target: "vercel",
    });
}