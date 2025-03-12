import { Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './pages/employee-details/employee-details.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { EmployeeUpdateComponent } from './pages/employee-update/employee-update.component';

export const routes: Routes = [
    {path:"employee/all", component: EmployeeListComponent},
    {path:"", redirectTo: "/employee/all", pathMatch: "full"},
    {path:"employee/new", component: CreateEmployeeComponent},
    {path:"employee/update/:id", component: EmployeeUpdateComponent},
    {path:"employee/:id", component: EmployeeDetailsComponent},



];
