package com.viosystems;

import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

    private final AtomicLong counter = new AtomicLong();
    private Greeting result= new Greeting(counter.incrementAndGet(), "Properties");

    @RequestMapping("/properties")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        Properties props = System.getProperties();
        System.out.println("Properties length = " + props.entrySet().size());
        for(Map.Entry<Object, Object> entry : props.entrySet()) {
            PropEntry prop = new PropEntry((String)entry.getKey(), (String)entry.getValue());
            result.addList(prop);
        }
        return result;
    }
}