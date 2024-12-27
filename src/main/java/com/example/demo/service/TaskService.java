package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Task;
import com.example.demo.repository.TaskRepository;

@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;
	
	public List<Task> getAllTasks(){
		return taskRepository.findAll();
	}
	
	public Task saveTasks(Task task) {
		return taskRepository.save(task);
	}
	
	public void deleteTasks(Long id) {
		taskRepository.deleteById(id);
	}
	
}
