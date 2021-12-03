package br.com.dailytasks.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.server.ResponseStatusException;


import br.com.dailytasks.models.Usuario;
import br.com.dailytasks.models.utilities.UserDTO;
import br.com.dailytasks.repository.UsuarioRepository;
import br.com.dailytasks.service.UsuarioService;

/**
 * Classe que fará a comunicação com a classe(model) Usuario.
 * @author Bruno Luna e Isaías Rodrigues
 * @version 1.0
 */

@CrossOrigin("*")
@RestController
@RequestMapping("/api/users")
public class UsuarioController {

	@Autowired
	private UsuarioRepository userRepository;
	
	@Autowired
	private UsuarioService userService;
	
	/**
	 * Método que lista todos os usuários
	 * 
	 * @return Lista todos os usuários
	 * @since 1.0
	 */
	@GetMapping("/")
	public ResponseEntity<List<Usuario>> getAllUsers(){
		List<Usuario> objectList = userRepository.findAll();
		
		if(objectList.isEmpty()) {
			return ResponseEntity.status(204).build();
		} else {
			return ResponseEntity.status(200).body(objectList);
		}
	}
	
	/**
	 * Método que busca por ID do usuário
	 * 
	 * @param id
	 * @return ID do usuário
	 * @since 1.0
	 */
	@GetMapping("/{id}")
    public ResponseEntity<Usuario> getByIdUser(@PathVariable(value = "id") Long id) {
        Optional<Usuario> objectoUser = userRepository.findById(id);

        if (objectoUser.isPresent()) {
            return ResponseEntity.status(200).body(objectoUser.get());
        } else {
            return ResponseEntity.status(204).build();
        }
    }
	
	/**
	 * Método que consiste em verificar se o usuário existe, caso sim, fará o login
	 * com suas credenciais.
	 * 
	 * @param userLogin
	 * @return Optional 
	 * @since 1.0
	 */
	@PostMapping("/login")
	public ResponseEntity<Object> credentials(@Valid @RequestBody UserDTO userLogin){
		Optional<?> objectOptional = userService.getLogin(userLogin);
		/*
		if (objectOptional.isPresent()) {
			return ResponseEntity.status(200).body(objectOptional.get());
		} else {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Erro na requisição ou usuario não credenciado!", null);

		}*/
		
		if (objectOptional.isEmpty()) {
			return ResponseEntity.status(400).build();
		} else {
			return ResponseEntity.status(200).body(objectOptional.get());
		}
	}
	
	/**
	 * Método que irá cadastrar o usuário, segundo as suas informações inseridas.
	 * Se as crecenciais já existirem não salvará o usuário novamente.
	 * 
	 * @param newUser
	 * @return Optional
	 * @since 1.0
	 */
	@PostMapping("/register")
    public ResponseEntity<Object> newUser(@Valid @RequestBody Usuario newUser) {
        Optional<?> objectOptional = userService.saveUser(newUser);

        if (objectOptional.isEmpty()) { 
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário existente!", null);
        } else {
            return ResponseEntity.status(201).body(objectOptional.get());
        }
    }
	
	/**
	 * Método para atualizar as credenciais do usuário.
	 * 
	 * @param userUpdate
	 * @return Optinal para atualizar
	 * @since 1.0
	 */
	@PutMapping("/update")
	public ResponseEntity<Object> update(@Valid @RequestBody UserDTO userUpdate){
		Optional<?> objetoAlterado = userService.alterarUsuario(userUpdate);

		if (objetoAlterado.isPresent()) {
			return ResponseEntity.status(200).body(objetoAlterado.get());
		} else {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id de usuario invalido!", null);
		}
	
	}
	
	/**
	 * Método para deletar um usuário pelo seu ID.
	 * @param id
	 * @since 1.0
	 */
	@DeleteMapping("/{id}")
    public void deleteUserId(@PathVariable(value = "id") Long id) {
        userRepository.deleteById(id);
    }
}
