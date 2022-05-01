import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

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
    loadChildren: () => import('./features/students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: "Courses",
    loadChildren: () => import('./features/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: "Enrollment",
    loadChildren: () => import('./features/enrollment/enrollment.module').then((m) => m.EnrollmentModule),
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
