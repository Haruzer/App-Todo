package com.example.demo;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class AppTodoApplicationTests {

	@Autowired
	private TaskService taskService;

	@Autowired
	private TaskRepository taskRepository;

	@BeforeEach
	void setUp() {
		taskRepository.deleteAll();
	}

	// 保存機能：正常系
	@Test
	void タスクが正しく保存される() {
		Task task = new Task();
		task.setTitle("テストタスク");
		task.setPriority(2);
		task.setStatus(1);
		task.setDueDate(LocalDate.of(2026, 12, 31));

		taskService.save(task);

		assertThat(taskRepository.count()).isEqualTo(1);
		Task saved = taskRepository.findAll().get(0);
		assertThat(saved.getTitle()).isEqualTo("テストタスク");
		assertThat(saved.getPriority()).isEqualTo(2);
		assertThat(saved.getCreatedAt()).isNotNull();
	}

	//保存機能；異常系
	@Test
	void タイトル空白時エラー発生() {
		assertThrows(jakarta.validation.ConstraintViolationException.class, () -> {
			Task task = new Task();
			task.setTitle("");
			task.setPriority(2);
			task.setStatus(1);
			taskService.save(task);
		});
	}

	// 検索機能：正常系（キーワードに一致するタスクが返る）
	@Test
	void キーワードに一致するタスクが返る() {
		Task task1 = new Task();
		task1.setTitle("アプリ開発");
		task1.setPriority(2);
		task1.setStatus(1);
		taskService.save(task1);

		Task task2 = new Task();
		task2.setTitle("買い物");
		task2.setPriority(1);
		task2.setStatus(1);
		taskService.save(task2);

		List<Task> result = taskService.search("アプリ");

		assertThat(result).hasSize(1);
		assertThat(result.get(0).getTitle()).isEqualTo("アプリ開発");
	}

	// 検索機能：正常系（タスクが0件のとき空リストが返る）
	@Test
	void タスクが0件のとき空リストが返る() {
		List<Task> result = taskService.search("存在しないキーワード");
		assertThat(result).isEmpty();
	}

	// 検索機能：正常系（キーワードが空のとき全件返る）
	@Test
	void キーワードが空のとき全件返る() {
		Task task1 = new Task();
		task1.setTitle("タスク1");
		task1.setPriority(2);
		task1.setStatus(1);
		taskService.save(task1);

		Task task2 = new Task();
		task2.setTitle("タスク2");
		task2.setPriority(1);
		task2.setStatus(1);
		taskService.save(task2);

		List<Task> result = taskService.findAll();

		assertThat(result).hasSize(2);
	}

}