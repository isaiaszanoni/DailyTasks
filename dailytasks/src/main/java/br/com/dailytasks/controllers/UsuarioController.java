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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.dailytasks.models.Usuario;
import br.com.dailytasks.repository.UsuarioRepository;

@RestController
@RequestMapping("/user")
public class UsuarioController {

	@Autowired
	private UsuarioRepository userRepository;
	
	@GetMapping("/all")
	public ResponseEntity<List<Usuario>> getAllUsers(){
		List<Usuario> objectList = userRepository.findAll();
		
		if(objectList.isEmpty()) {
			return ResponseEntity.status(204).build();
		} else {
			return ResponseEntity.status(200).body(objectList);
		}
	}
	
	//@GetMapping("/")
	
	//@PostMapping("/save")
	//public ResponseEntity<Object> save(@Valid @RequestBody Usuario newUser){
	//	Optional<Object> objectOptional = service.
	//}
	
	@PutMapping("/update")
	public ResponseEntity<Object> credentials(@Valid ResponseBody )
	
	
	
	@DeleteMapping("/delete/{id_user}")
    public void deleteUserId(@PathVariable(value = "id_user") Long id) {
        userRepository.deleteById(id);
    }
}
