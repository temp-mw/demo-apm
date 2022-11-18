package io.github.middlewarelabs.demoproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.middlewarelabs.agentapmjava.Logger;

@SpringBootApplication
public class DemoProjectApplication {

	public static void main(String[] args) {		
		Logger.info("info message");
		Logger.debug("debug message");
		Logger.warn("warn message");
		Logger.error("error message");
		SpringApplication.run(DemoProjectApplication.class, args);
	}

}
