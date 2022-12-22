package io.github.middlewarelabs.demoproject;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.github.middlewarelabs.agentapmjava.Logger;

@RestController
public class DemoProjectController {

    @RequestMapping("/hello")
    public String demo() {
        System.out.println("hello GET API called");
        Logger.setAttribute("user.id", "1");
        try {
            int[] myNumbers = {1, 2, 3};
            System.out.println(myNumbers[10]);
        } catch (Throwable  e) {
            Logger.recordError(e);
            System.out.println("Something went wrong.");
        }
        return "Hello World !";
    }
}
