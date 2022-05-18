import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthorizationGuard} from "./core/auth/services/authorization.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'Home',
    loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: "Students",
    canActivate: [AuthorizationGuard],
    loadChildren: () => import('./features/students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: "Courses",
    canActivate: [AuthorizationGuard],
    loadChildren: () => import('./features/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: "Enrollment",
    canActivate: [AuthorizationGuard],
    loadChildren: () => import('./features/enrollment/enrollment.module').then((m) => m.EnrollmentModule),
  },
  {
    path: "Users",
    canActivate: [AuthorizationGuard],
    loadChildren: () => import('./features/users/users.module').then((m) => m.UsersModule),
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
