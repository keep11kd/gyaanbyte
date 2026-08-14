package com.gyaanbyte.backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI gyaanByteOpenAPI() {
        Server developmentServer = new Server();
        developmentServer.setUrl("http://localhost:8080/api");
        developmentServer.setDescription("Development Environment");

        Server productionServer = new Server();
        productionServer.setUrl("https://api.gyaanbyte.com/api");
        productionServer.setDescription("Production Environment");

        Contact contact = new Contact();
        contact.setName("GyaanByte Engineering Team");
        contact.setEmail("support@gyaanbyte.com");
        contact.setUrl("https://gyaanbyte.com");

        License license = new License();
        license.setName("Proprietary License");
        license.setUrl("https://gyaanbyte.com");

        Info info = new Info()
                .title("GyaanByte Platform API")
                .version("v1")
                .description("""
                        REST API documentation for the GyaanByte Platform.

                        This API powers:
                        • Authentication
                        • User Management
                        • CRM
                        • Projects
                        • Training
                        • Payments
                        • Notifications
                        • Analytics
                        """)
                .contact(contact)
                .license(license);

        ExternalDocumentation documentation = new ExternalDocumentation()
                .description("GyaanByte Engineering Documentation")
                .url("https://gyaanbyte.com");

        String securitySchemeName = "Bearer Authentication";

        return new OpenAPI()
                .info(info)
                .servers(List.of(
                        developmentServer,
                        productionServer
                ))
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName, new SecurityScheme()
                                .name(securitySchemeName)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("Enter JWT token")))
                .externalDocs(documentation);
    }
}
