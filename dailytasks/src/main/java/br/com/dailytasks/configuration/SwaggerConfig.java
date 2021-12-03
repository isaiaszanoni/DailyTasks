package br.com.dailytasks.configuration;

import java.util.ArrayList;
import java.util.List;
import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Response;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

/**
 * Classe para documentação no Swagger
 * @author Bruno Luna e Isaías Rodrigues
 * @version 1.0
 */

@Configuration
public class SwaggerConfig {

	/**
	 * Método responsável por receber dados do método metadata e fornecer o package
	 * para os controladores.
	 * @return Docket - api documentada.
	 * @since 1.0
	 */
	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("br.com.dailytasks.controllers")).paths(PathSelectors.any()).build()
				.apiInfo(metadata()).useDefaultResponseMessages(false)
				.globalResponses(HttpMethod.GET, responseMessageForGET());
	}

	/**
	 * Método responsável por passar dados do projeto e receber dados do método
	 * contact()
	 * 
	 * @return ApiInfo com dados do projeto
	 * @since 1.0
	 */
	public static ApiInfo metadata() {
		return new ApiInfoBuilder().title("API - Daily Tasks").description("Projeto API Spring - Daily Tasks")
				.version("1.0.0").license("Apache License Version 2.0").licenseUrl("http://localhost:8080/swagger-ui/")
				.contact(contact()).build();
	}

	/**
	 * Método estático responsável por passar dados de contato
	 * 
	 * @return Contact com os dados dos autores
	 * @since 1.0
	 */
	private static Contact contact() {
		return new Contact("Bruno Luna e Isaías Rodrigues",
				"https://github.com/Bruno-Luna, https://github.com/isaiaszanoni", "");
	}

	/**
	 * Método estatico reponsável por passar uma Lista com ResponseBuilder informando
	 * status possíveis e seus significados para todos os endpoints
	 * 
	 * @return Lista/Array com o Response
	 * @since 1.0
	 */
	private static List<Response> responseMessageForGET() {

		return new ArrayList<Response>() {
			private static final long serialVersionUID = 1L;
			{
				add(new ResponseBuilder().code("200").description("Sucesso!").build());
				add(new ResponseBuilder().code("201").description("Objeto Criado!").build());
				add(new ResponseBuilder().code("401").description("Não Autorizado!").build());
				add(new ResponseBuilder().code("403").description("Proibido!").build());
				add(new ResponseBuilder().code("404").description("Não Encontrado!").build());
				add(new ResponseBuilder().code("500").description("Erro!").build());
			}
		};
	}

}
