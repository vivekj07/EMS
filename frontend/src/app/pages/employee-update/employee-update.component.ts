import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css',
})
export class EmployeeUpdateComponent {
  id: number | null = null;
  employee: Employee = new Employee(0, '', '', '');

  constructor(
    private employeeService: EmployeeService,
    private router: ActivatedRoute,
    private route: Router,
    private toaststr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.getEmployee(Number(this.id));
  }

  onSubmit() {
    this.updateEmployee();
  }

  getEmployee(id: number) {
    this.employeeService.getEmployeeDetails(id).subscribe({
      next: (response) => {
        this.employee = response;
      },
      error: (error) => {
        console.log(error);
        this.toaststr.error('Employee not found');
      },
    });
  }

  updateEmployee(): void {
    this.employeeService
      .updateEmployee(Number(this.id), this.employee)
      .subscribe({
        next: (response) => {
          this.toaststr.success('Employee updated successfully');
          this.route.navigate(['/employee/all']);
        },
        error: (error) => {
          console.log(error);
          this.toaststr.error('Error updating employee');
        },
      });
  }
}
