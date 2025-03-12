import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Employee } from '../../models/employee';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [HeaderComponent, RouterLink,NgFor],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees: Employee[]=[];
  private employeeService: EmployeeService;
  constructor(employeeService: EmployeeService,private toaststr:ToastrService) {
    this.employeeService = employeeService
  }

  ngOnInit() {
    this.getEmployees();
}

getEmployees(){
  this.employeeService.getEmployees().subscribe({
    next:(data)=>{
      this.employees = data;
    },
    error:(error)=>{
      console.error(error);
    }
  })
  ;
}

deleteEmployee(id: number){
  this.employeeService.deleteEmployee(id).subscribe({
    next: (response) => {
      this.toaststr.success('Employee deleted successfully');
      this.getEmployees();
    },
    error: (error) => {
      console.log(error);
      this.toaststr.error('Something went wrong');
    },
  });
}
}
