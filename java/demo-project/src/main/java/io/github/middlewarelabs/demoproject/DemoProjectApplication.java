package io.github.middlewarelabs.demoproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
// import io.github.middlewarelabs.agentapmjava.Logger;
import io.github.middlewarelabs.agentapmjava.MwTracer;


@SpringBootApplication
@ComponentScan(basePackages = {"io.github.middlewarelabs.agentapmjava, io.github.middlewarelabs.demoproject"})
public class DemoProjectApplication {

	public static void main(String[] args) {
		try {
			MwTracer.track("project1", "myservice");
		} catch (Throwable throwable) {} 

		
		SpringApplication.run(DemoProjectApplication.class, args);
	}

}
