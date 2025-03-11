package com.ems.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ems.backend.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("select e from Employee e order by e.firstName asc, e.lastName ASC") // use class variables
    List<Employee> customfindAll();

    @Query("select e from Employee e where e.id=?1")
    Optional<Employee> customfindById(Long id);
}
