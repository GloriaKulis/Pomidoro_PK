package ztpai.gloriakulis.pomidoro;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;




@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Pomidoro",version = "1.0",description = "ZTPAI project",
termsOfService = " ",
		contact = @io.swagger.v3.oas.annotations.info.Contact(name = "Gloria Kulis",email = "gloria.kulis@student.pk.edu.pl")))



public class PomidoroApplication {

	public static void main(String[] args) {
		SpringApplication.run(PomidoroApplication.class, args);
	}

//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/*").allowedOrigins("*");
//			}
//		};
//	}





}
