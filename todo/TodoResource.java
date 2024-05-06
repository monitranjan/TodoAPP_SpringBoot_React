package com.monit.myfirstwebapp.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoResource {
    @Autowired
    private TodoService todoService;

    @GetMapping("/basicAuthCheck")
    public String basicAuthCheck() {
        return "success";
    }

    @GetMapping("/users/{username}/todos")
    public List<Todo> getTodos(@PathVariable String username) {
        return todoService.getTodosByUserName(username);
    }

    @GetMapping("/users/{username}/todos/{id}")
    public Todo getTodosById(@PathVariable String username, @PathVariable int id) {
        return todoService.getTodosById(id);
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable int id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}/todos/{id}")
    public Todo updateTodo(@PathVariable String username, @PathVariable int id,@RequestBody Todo todo) {
        todoService.updateTodo(todo);
        return todo;
    }

    @PostMapping("/users/{username}/todos/")
    public Todo createTodo(@PathVariable String username, @RequestBody Todo todo) {
        Todo createdTodo = todoService.addTodo(todo.getDescription(), username, todo.getTargetDate());
        return createdTodo;
    }
}
