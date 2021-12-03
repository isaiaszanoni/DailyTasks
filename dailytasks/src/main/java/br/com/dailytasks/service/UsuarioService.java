package br.com.dailytasks.service;

import java.nio.charset.Charset;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.apache.commons.codec.binary.Base64;

import br.com.dailytasks.models.Usuario;
import br.com.dailytasks.models.utilities.UserDTO;
import br.com.dailytasks.repository.UsuarioRepository;

/**
 * Classe que fará a verificação se o usuario, email existem e se a senha está correta.
 * @author Bruno Luna e Isaías Rodrigues
 * @version 1.0
 */

@Service
public class UsuarioService {

	private @Autowired
	UsuarioRepository repository;
	
	/**
	 * Método que permite salvar um usuário com suas credenciais com a camada de segurança.
	 * 
	 * @param newUser
	 * @return Optional
	 * @since 1.0
	 */
	public Optional<Object> saveUser(Usuario newUser){
		return repository.findByEmail(newUser.getEmail()).map(usuarioExists -> {
			return Optional.empty();
		}).orElseGet(() -> {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String result = encoder.encode(newUser.getSenha());
			newUser.setSenha(result);
			return Optional.ofNullable(repository.save(newUser));
		});
	
	}

	/**
	 * Método que validará as credenciais do usuário, bem como manter os dados sob
	 * criptografia
	 * 
	 * @param userLogin
	 * @return Optional
	 * @since 1.0
	 */
	public Optional<?> getLogin(UserDTO userLogin) {
	    return repository.findByEmail(userLogin.getEmail()).map(usuarioExists -> {
	        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	        if(encoder.matches(userLogin.getSenha(), usuarioExists.getSenha())) {
	            String estruturaBasic = userLogin.getEmail() + ":" + userLogin.getSenha(); // email : senha
	            byte[] autorizacaoBase64 = Base64.encodeBase64(estruturaBasic.getBytes(Charset.forName("US-ASCII"))); // criptografia da senha
	            String autorizacaoHeader = "Basic " + new String(autorizacaoBase64); // basic criptografia da senha
	
	            userLogin.setToken(autorizacaoHeader);
	            userLogin.setId(usuarioExists.getId());
	            userLogin.setNome(usuarioExists.getNome());
	            userLogin.setSenha(usuarioExists.getSenha());
	            return Optional.ofNullable(userLogin); // Usuario Credenciado
	
	        }else{
	            return Optional.ofNullable(userLogin); // Senha esteja incorreta
	        }
	
	    }).orElseGet(() -> {
	        return Optional.empty();
	    });
	    
	}
	
	/**
	 * Método para alterar usuário e verifica se tal cadastro é existente.
	 * 
	 * @param usuarioParaAlterar
	 * @return Optional 
	 * @since 1.0
	 */
	public Optional<?> alterarUsuario(UserDTO usuarioParaAlterar) {
		return repository.findById(usuarioParaAlterar.getId()).map(usuarioExistente -> {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			String result = encoder.encode(usuarioParaAlterar.getSenha());

			usuarioExistente.setNome(usuarioParaAlterar.getNome());
			usuarioExistente.setSenha(result);
			return Optional.ofNullable(repository.save(usuarioExistente));
		}).orElseGet(() -> {
			return Optional.empty();
		});
	}
	
}