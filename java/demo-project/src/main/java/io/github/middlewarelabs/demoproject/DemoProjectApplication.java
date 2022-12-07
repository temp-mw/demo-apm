package io.github.middlewarelabs.demoproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.middlewarelabs.agentapmjava.Logger;

@SpringBootApplication
public class DemoProjectApplication {

	public static void main(String[] args) {		
		Logger.info("info message");
		Logger.debug("debug message");
		Logger.debug("debug2 message");
		Logger.debug("debug3 message");
		Logger.debug("debug4 message");
		Logger.debug("debug5 message");
		Logger.debug("debug6 message");
		Logger.debug("debug7 message");
		Logger.debug("debug8 message");
		Logger.debug("debug9 message");
		Logger.debug("debug10 message");
		Logger.debug("debug11 message");
		Logger.debug("debug12 message");
		Logger.warn("warn message");
		Logger.error("error message");
		SpringApplication.run(DemoProjectApplication.class, args);
	}

}
