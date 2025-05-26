package com.example.Todo;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/todos")
public class TodoController {

    private final TodoServiceImp todoService;

    public TodoController(TodoServiceImp todoService) {
        this.todoService = todoService;
    }

    @PostMapping("/create")
    public ResponseEntity<TodoEntity> createTodo(@RequestBody TodoEntity todo) {
        TodoEntity created = todoService.createTodo(todo);
        return ResponseEntity.status(201).body(created); // 201 Created
    }

    @GetMapping("/get-all-todos")
    public ResponseEntity<List<TodoEntity>> getAllTodos() {
        List<TodoEntity> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos); // 200 OK
    }

    @DeleteMapping("/delete-todo/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok("Deleted Successfully"); // 200 OK with message
    }

    @PutMapping("/update-todo")
    public ResponseEntity<?> updateTodo(@RequestBody TodoEntity todo) {
        try {
            TodoEntity updated = todoService.updateTodo(todo.getId(), todo);
            return ResponseEntity.ok(updated); // 200 OK
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Todo not found with id: " + todo.getId()); // 404 Not Found
        }
    }


}
