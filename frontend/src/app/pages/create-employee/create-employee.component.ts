import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css',
})
export class CreateEmployeeComponent {
  employee: Employee = new Employee(0, '', '', '');

  constructor(
    private employeeService: EmployeeService, 
    private router:Router,
    private toaststr:ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.newEmployee();
  }

  newEmployee(): void {
    this.employeeService.createEmployee(this.employee).subscribe({
      next: (response) => {
        this.toaststr.success('Employee created successfully');
        this.employee.firstName = '';
        this.employee.lastName = '';
        this.employee.email = '';

        this.router.navigate(['/employee/all']);
      },
      error: (error) => {
        this.toaststr.error(error.error || 'Error creating employee');
        console.log(error);
      },
    });
  }
}
