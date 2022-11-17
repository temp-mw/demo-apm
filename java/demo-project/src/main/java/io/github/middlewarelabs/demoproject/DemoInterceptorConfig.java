package io.github.middlewarelabs.demoproject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import io.github.middlewarelabs.agentapmjava.MwInterceptor;

@Configuration
public class DemoInterceptorConfig implements WebMvcConfigurer {

    @Autowired
    private MwInterceptor mwInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // TODO Auto-generated method stub
        registry.addInterceptor(mwInterceptor);
    }

}
