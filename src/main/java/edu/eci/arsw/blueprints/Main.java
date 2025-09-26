package edu.eci.arsw.blueprints;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"edu.eci.arsw.blueprints"})
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}