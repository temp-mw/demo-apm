package io.github.middlewarelabs.demoproject;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoProjectController {
    
    @RequestMapping("/hello")
    public String demo() {
        return "Hello World !";
    }
}
