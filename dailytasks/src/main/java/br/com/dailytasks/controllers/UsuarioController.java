package br.com.dailytasks.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.dailytasks.models.Usuario;
import br.com.dailytasks.repository.UsuarioRepository;
import br.com.dailytasks.service.UsuarioService;

@RestController
@RequestMapping("/user")
public class UsuarioController {

	@Autowired
	private UsuarioRepository userRepository;
	
	@Autowired
	private UsuarioService userService;
	
	@GetMapping("/all")
	public ResponseEntity<List<Usuario>> getAllUsers(){
		List<Usuario> objectList = userRepository.findAll();
		
		if(objectList.isEmpty()) {
			return ResponseEntity.status(204).build();
		} else {
			return ResponseEntity.status(200).body(objectList);
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<Object> credentials(@Valid @RequestBody Usuario userLogin){
		Optional<?> objectOptional = userService.getLogin(userLogin);
		
		if (objectOptional.isEmpty()) {
			return ResponseEntity.status(400).build();
		} else {
			return ResponseEntity.status(200).body(objectOptional.get());
		}
	}
	
	@PostMapping("/newuser")
    public ResponseEntity<Object> newUser(@Valid @RequestBody Usuario newUser) {
        Optional<Object> objectOptional = userService.saveUser(newUser);

        if (objectOptional.isEmpty()) {
            return ResponseEntity.status(400).build();
        } else {
            return ResponseEntity.status(201).body(objectOptional.get());
        }
    }
	
	
	@PutMapping("/update")
	public ResponseEntity<Usuario> update(@Valid @RequestBody Usuario userUpdate){
		return ResponseEntity.status(202).body(userRepository.save(userUpdate)); 
	}
	
	
	@DeleteMapping("/delete/{id_user}")
    public void deleteUserId(@PathVariable(value = "id_user") Long id) {
        userRepository.deleteById(id);
    }
}
