import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {StudentTableComponent} from "./components/content/student-table/student-table.component";
import {CoursesListComponent} from "./components/content/courses-list/courses-list.component";

const routes: Routes = [
  { path: 'students', component: StudentTableComponent},
  {path: 'courses', component: CoursesListComponent},
  {path: '**', component:StudentTableComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
