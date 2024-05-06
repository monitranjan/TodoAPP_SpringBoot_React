package com.monit.myfirstwebapp.todo;

import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {
    private static List<Todo> todos = new ArrayList<>();
    private static int todoCounter = 0;
    static {
        todos.add(new Todo(++todoCounter,"monit","Learn Java",false, LocalDate.now().plusDays(5)));
        todos.add(new Todo(++todoCounter,"monit1","Learn Spring boot",false, LocalDate.now().plusDays(30)));
        todos.add(new Todo(++todoCounter,"monit2","Learn system Design",false, LocalDate.now().plusDays(60)));
    }

    public List<Todo> getTodos() {
        return todos;
    }
    public List<Todo> getTodosByUserName(String name) {
        System.out.println(todos);
        return todos.stream().filter((todo)->todo.getUserName().equalsIgnoreCase(name)).toList();
    }

    public Todo addTodo(String description, String userName, LocalDate targetDate) {
        Todo todo = new Todo(++todoCounter,userName,description,false,targetDate);
        todos.add(todo);
        return todo;
    }

    public void deleteTodo(int id) {
        todos.removeIf((todo)->todo.getId() == id);
    }

    public void updateTodo(@Valid Todo todo) {
        Todo todoToUpdate = getTodosById(todo.getId());
        todoToUpdate.setDescription(todo.getDescription());
        deleteTodo(todo.getId());
        todos.add(todo);
    }

    public Todo getTodosById(int id) {
        return todos.stream().filter((todo)->todo.getId()==id).findFirst().get();
    }
}
