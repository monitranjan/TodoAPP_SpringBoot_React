package com.monit.myfirstwebapp.Login;

import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    public boolean authenticate(String username, String password) {
        boolean isValidUserName = username != null && username.equalsIgnoreCase("monit");
        boolean isValidPassword = password != null && password.equalsIgnoreCase("test");
        return isValidUserName && isValidPassword;
    }
}
