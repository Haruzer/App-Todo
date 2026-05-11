package com.example.demo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
	
	@Autowired
	private TaskRepository taskRepository;
	
	 // 全件取得
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    // 1件取得
    public Task findById(Long id) {
        return taskRepository.findById(id).orElseThrow();
    }

    // 登録・更新
    public void save(Task task) {
        if (task.getId() == null) {
            task.setCreatedAt(LocalDateTime.now());
        }
        task.setUpdatedAt(LocalDateTime.now());
        taskRepository.save(task);
    }

    // 削除
    public void deleteById(Long id) {
        taskRepository.deleteById(id);
    }
    
    //検索
    public List<Task> search(String keyword){
    	return taskRepository.findByTitleContaining(keyword);
    }

}
