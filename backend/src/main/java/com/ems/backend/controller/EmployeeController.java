package com.ems.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.backend.exception.ResourceNotFoundException;
import com.ems.backend.model.Employee;
import com.ems.backend.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RequestMapping("/api/v1/employee")
@RestController
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // @GetMapping("/all")
    // public List<Employee> getAllEmployees() {
    // return employeeRepository.findAll();
    // }
    @GetMapping("/all")
    public List<Employee> getAllEmployees() {
        return employeeRepository.customfindAll();
    }

    // @GetMapping("/{id}")
    // public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
    // Employee employee = employeeRepository.findById(id)
    // .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id:
    // " + id));

    // return ResponseEntity.ok(employee);
    // }
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.customfindById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        return ResponseEntity.ok(employee);
    }

    @PostMapping("/new")
    public ResponseEntity<?> newEmployee(@RequestBody Employee employee) {
        if (employee == null) {
            return ResponseEntity.badRequest().body("Request body cannot be empty.");
        }

        if (employee.getFirstName() == null || employee.getFirstName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("First name cannot be empty.");
        }

        if (employee.getLastName() == null || employee.getLastName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Last name cannot be empty.");
        }

        if (employee.getEmail() == null || employee.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email cannot be empty.");
        } else if (!employee.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return ResponseEntity.badRequest().body("Invalid email format.");
        }

        employee.setFirstName(employee.getFirstName().trim());
        employee.setLastName(employee.getLastName().trim());
        employee.setEmail(employee.getEmail().trim());

        Employee savedEmployee = employeeRepository.save(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployee(@RequestBody Employee newEmployee, @PathVariable Long id) {

        if (id == null || id <= 0) {
            return ResponseEntity.badRequest().body("Invalid ID provided.");
        }

        if (newEmployee == null) {
            return ResponseEntity.badRequest().body("Request body cannot be empty.");
        }

        if (newEmployee.getFirstName() == null || newEmployee.getFirstName().trim().isEmpty() ||
                newEmployee.getLastName() == null || newEmployee.getLastName().trim().isEmpty() ||
                newEmployee.getEmail() == null || newEmployee.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Please provide valid first name, last name, and email.");
        }

        // Uncommnet this block to validate email format
        if (!newEmployee.getEmail().matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            return ResponseEntity.badRequest().body("Invalid email format. Please provide a valid email.");

        }

        Employee employee = employeeRepository.customfindById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        employee.setFirstName(newEmployee.getFirstName().trim());
        employee.setLastName(newEmployee.getLastName().trim());
        employee.setEmail(newEmployee.getEmail().trim());

        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.customfindById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        employeeRepository.delete(employee);
        return ResponseEntity.ok("Employee deleted successfully.");
    }

}
