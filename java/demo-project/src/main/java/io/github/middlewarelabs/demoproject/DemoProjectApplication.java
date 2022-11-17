package io.github.middlewarelabs.demoproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// import io.github.middlewarelabs.agentapmjava.Logger;
import io.github.middlewarelabs.agentapmjava.MwTracer;

@SpringBootApplication
public class DemoProjectApplication {

	public static void main(String[] args) {
		// Logger.info("info message");
		// Logger.debug("debug message");
		// Logger.warn("warn message");
		// Logger.error("error message");
		try {
			MwTracer.track("myservice");
		} catch (Throwable throwable) {
			// parentSpan.setStatus(StatusCode.ERROR, "Something wrong with the parent span");
		} finally {
			/*closing the scope does not end the span, this has to be done manually*/
			// parentSpan.end();
		}
		SpringApplication.run(DemoProjectApplication.class, args);
	}

}
