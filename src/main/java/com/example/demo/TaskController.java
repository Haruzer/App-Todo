package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/tasks")
public class TaskController {
	
	@Autowired
	private TaskService taskService;
	
	 // 一覧表示
    @GetMapping
    public String list(Model model) {
        List<Task> tasks = taskService.findAll();
        model.addAttribute("tasks", tasks);
        return "task/list";
    }

    // 登録画面表示
    @GetMapping("/new")
    public String newTask(Model model) {
        model.addAttribute("task", new Task());
        return "task/form";
    }

    // 登録・更新処理
    @PostMapping("/save")
    public String save(@ModelAttribute Task task) {
        taskService.save(task);
        return "redirect:/tasks";
    }

    // 編集画面表示
    @GetMapping("/edit/{id}")
    public String edit(@PathVariable Long id, Model model) {
        Task task = taskService.findById(id);
        model.addAttribute("task", task);
        return "task/form";
    }

    // 削除処理
    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        taskService.deleteById(id);
        return "redirect:/tasks";
    }

}
