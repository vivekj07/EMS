import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [HeaderComponent,RouterLink],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {

  id : number | null=null
  employee: Employee = new Employee(0, "", "", "");

  constructor(private employeeService : EmployeeService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.fetchEmployeeDetails(Number(this.id));
  }

  fetchEmployeeDetails(id: number): void {
    this.employeeService.getEmployeeDetails(id).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
