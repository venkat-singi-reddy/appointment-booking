package com.healthcare.appointmentbooking.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Configuration
public class SpaConfig {

    /**
     * Forwards all non-API, non-static requests to the React SPA index.html,
     * enabling client-side routing (React Router) to handle the path.
     */
    @Controller
    public static class SpaFallbackController {

        @RequestMapping(value = {
                "/doctors",
                "/book",
                "/book/{doctorId}",
                "/appointments"
        })
        public String forwardToSpa() {
            return "forward:/index.html";
        }
    }
}
