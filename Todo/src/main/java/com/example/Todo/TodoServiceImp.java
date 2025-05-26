package com.example.Todo;


import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoServiceImp implements TodoService  {

    private final TodoRepo todoRepo;

    public TodoServiceImp(TodoRepo todoRepo) {
        this.todoRepo = todoRepo;
    }

    @Override
    public TodoEntity createTodo(TodoEntity todo){
     return  todoRepo.save(todo);
    }

    @Override
    public void deleteTodo(Long id){
        todoRepo.deleteById(id);
    }

    @Override
    public  TodoEntity updateTodo(Long id, TodoEntity todo){
        TodoEntity todoItem = todoRepo.findById(id).orElseThrow(()-> new RuntimeException("Todo not find with id:" + id));

       todoItem.setTitle(todo.getTitle());
       todoItem.setDate(todo.getDate());
       todoItem.setDescription(todo.getDescription());
       todoItem.setResource(todo.getResource());
       todoItem.setStatus(todo.getStatus());
     return todoRepo.save(todoItem);

    }

    @Override
    public List<TodoEntity>  getAllTodos(){
        return todoRepo.findAll();
    }
}