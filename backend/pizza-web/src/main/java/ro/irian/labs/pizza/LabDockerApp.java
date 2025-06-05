package ro.irian.labs.pizza;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@ComponentScan(basePackages = "ro.irian.labs")
//@EntityScan(basePackages = "ro.irian.labs")
public class LabDockerApp {

    public static void main(String[] args) {
        SpringApplication.run(LabDockerApp.class, args);
    }

}
