package com.monit.myfirstwebapp.todo;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Entity
public class Todo {
    @Id
    @GeneratedValue
    private int id;
    private String userName;

    @Size(min = 2, max = 50,message = "Max allowed char is 50")
    private String description;
    private boolean completed;
    private LocalDate targetDate;

    public Todo() {

    }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", description='" + description + '\'' +
                ", completed=" + completed +
                ", targetDate=" + targetDate +
                '}';
    }

    public Todo(int id, String userName, String description, boolean completed, LocalDate targetDate) {
        super();
        this.id = id;
        this.userName = userName;
        this.description = description;
        this.completed = completed;
        this.targetDate = targetDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(LocalDate targetDate) {
        this.targetDate = targetDate;
    }
}
