package com.monit.myfirstwebapp.todo;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.time.LocalDate;

//@Controller
@SessionAttributes("username")
public class TodoController {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private TodoService todoService;

    @RequestMapping(value = "list-todos")
    public String listTodos(ModelMap model) {
        model.put("todos",todoService.getTodosByUserName(model.getAttribute("username").toString()));
        return "listTodos";
    }

    @RequestMapping(value = "add-todo", method = RequestMethod.GET)
    public String showNewTodoPage(ModelMap model) {
        String username = (String) model.get("username");
        Todo todo = new Todo(0,username,"",false, LocalDate.now().plusDays(1));
        model.put("todo",todo);
        return "todo";
    }

    @RequestMapping(value = "add-todo", method = RequestMethod.POST)
    public String addNewTodo(ModelMap model, @Valid Todo todo, BindingResult bindingResult) {
//        logger.debug("Adding new todo: " + description);
        if (bindingResult.hasErrors()) {
            return "todo";
        }
        todoService.addTodo(todo.getDescription(),model.get("username").toString(),todo.getTargetDate());
        model.addAttribute("todos",todoService.getTodosByUserName(model.get("username").toString()));
        return "redirect:list-todos";
    }

    @RequestMapping(value = "delete-todo",method = RequestMethod.GET)
    public String deleteTodo(@RequestParam int id, ModelMap model) {
        todoService.deleteTodo(id);
        model.put("todos",todoService.getTodosByUserName(model.get("username").toString()));
        return "redirect:list-todos";
    }

    @RequestMapping(value = "update-todo", method = RequestMethod.GET)
    public String updateTodoPage(@RequestParam int id, ModelMap model) {
        String username = (String) model.get("username");
        Todo todoToUpdate = todoService.getTodosById(id);
        Todo todo = new Todo(0,username,todoToUpdate.getDescription(),false, LocalDate.now().plusDays(1));
        model.put("todo",todo);
        return "todo";
    }


    @RequestMapping(value = "update-todo",method = RequestMethod.POST)
    public String updateTodo(@RequestParam int id,@Valid Todo todo, BindingResult bindingResult, ModelMap model) {
        if (bindingResult.hasErrors()) {
            return "todo";
        }
        todo.setUserName(model.get("username").toString());
        todoService.updateTodo(todo);
        model.put("todos",todoService.getTodosByUserName(model.get("username").toString()));
        return "redirect:list-todos";
    }


}
