package com.viosystems;

import org.springframework.boot.actuate.health.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class HealthCheck implements HealthIndicator {
    private static final long timer = new Date().getTime();

    @Override
    public Health health() {
        int errorCode = check(); // perform some specific health check
        if (errorCode != 0) {
            return Health.down()
                    .withDetail("Error Code", errorCode).build();
        }
        return Health.up().build();
    }

    private int check() {
        // Our logic to check health
        long timeNow = new Date().getTime();
        if(timeNow > (timer + 300000L)){
            return -1;
        } else {
            return 0;
        }
    }
}
