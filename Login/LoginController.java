package com.monit.myfirstwebapp.Login;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@SessionAttributes("username")
public class LoginController {
    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private AuthenticationService authenticationService;



    @RequestMapping(value= "login",method = RequestMethod.POST)
    public String goToWelcome(@RequestParam String username,@RequestParam String password, ModelMap model) {

        if (authenticationService.authenticate(username, password)) {
            model.put("username", username);
//            model.put("password", password);
            return "welcome";
        }
        model.put("errorMessage", "Invalid username or password");
        return "login";
    }
}
