package ro.irian.labs.pizza;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@ComponentScan(basePackages = "ro.irian.labs")
//@EntityScan(basePackages = "ro.irian.labs")
public class LabDockerApp {

    @Value("${spring.datasource.url}")
    private String jdbcUrl;

    public static void main(String[] args) {
        SpringApplication.run(LabDockerApp.class, args);
    }

    @PostConstruct
    public void logJdbcUrl() {
        System.out.println("▶ spring.datasource.url = " + jdbcUrl);
    }
}
