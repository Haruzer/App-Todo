package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository <Task, Long>{
	//タイトルに部分一致するタスクを検索
	List<Task> findByTitleContaining(String keyword);
	
}
