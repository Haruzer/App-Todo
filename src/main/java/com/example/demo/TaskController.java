package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
	
	@Autowired
	private TaskService taskService;
	
	 // 一覧取得・検索
    @GetMapping
    public List<Task> list(@RequestParam (required = false)String keyword) {
        if(keyword != null && !keyword.isEmpty()) {
        return taskService.search(keyword);
        }
        return taskService.findAll();
    }

    // 1件取得
    @GetMapping("/{id}")
    public Task findBy(@PathVariable Long id) {
        return taskService.findById(id);
    }

    // 登録・更新処理
    @PostMapping
    public Task create(@RequestBody Task task) {
    	taskService.save(task);
        return task;
    }
    
    

    // 更新処理
    @PutMapping("{id}")
    public Task update(@PathVariable Long id, @RequestBody Task task) {
        task.setId(id);
        taskService.save(task);
        return taskService.findById(id);
    }

    // 削除処理
    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
