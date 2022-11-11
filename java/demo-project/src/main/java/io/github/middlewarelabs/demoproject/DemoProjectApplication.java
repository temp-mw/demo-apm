package io.github.middlewarelabs.demoproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.middlewarelabs.agentapmjava.Logger;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class DemoProjectApplication {

	public static void main(String[] args) {
		Map<String, Object> data = new HashMap<String, Object>();
        data.put("key1", "value1");
        data.put("key2", "value2");
		Logger.log("test", data);
		SpringApplication.run(DemoProjectApplication.class, args);
	}

}
