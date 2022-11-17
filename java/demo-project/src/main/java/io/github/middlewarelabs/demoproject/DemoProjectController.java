package io.github.middlewarelabs.demoproject;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoProjectController {
    
    @RequestMapping("/hello")
    public String demo() {
        System.out.println("hello GET API called");
        return "Hello World !";
    }
}
