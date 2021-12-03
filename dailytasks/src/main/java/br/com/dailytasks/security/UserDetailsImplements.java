package br.com.dailytasks.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.dailytasks.models.Usuario;

/**
 * Classe que faz a leitura do email/senha do usuario.
 * @author Bruno Luna e Isaías Rodrigues
 * @version 1.0
 */

public class UserDetailsImplements  implements UserDetails{

	 private static final long serialVersionUID = 1L;

	    private String email;
	    private String senha;
	    private List<GrantedAuthority> autorizacoes;

	    public UserDetailsImplements(Usuario usuario) {
	        this.email = usuario.getEmail();
	        this.senha = usuario.getSenha();
	    }

	    @Override
	    public Collection<? extends GrantedAuthority> getAuthorities(){
	        return autorizacoes;
	    }

	    @Override
	    public String getPassword(){
	        return senha;
	    }

	    @Override
	    public String getUsername(){
	        return email;
	    }

	    @Override
	    public boolean isAccountNonExpired(){
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked(){
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired(){
	        return true;
	    }

	    @Override
	    public boolean isEnabled(){
	        return true;
	    }
}
