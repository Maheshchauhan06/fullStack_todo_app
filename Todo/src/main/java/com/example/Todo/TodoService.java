package com.example.Todo;

import java.util.List;

public interface TodoService {
    List<TodoEntity> getAllTodos();
//    TodoEntity getTodoById(Long id);
    TodoEntity createTodo(TodoEntity todo);
    TodoEntity updateTodo(Long id , TodoEntity todo);
    void deleteTodo(Long id);

}
